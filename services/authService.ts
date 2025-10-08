import type { RegisterDto, LoginDto, ApiResponse, User, Wallet, Tokens, ZeroTrustContext, ZeroTrustResult } from '../types';
import { MOCK_USER_DB_TYPE } from './db';
import { WalletService } from './walletService';
import { CacheService } from './cacheService';

// Simple JWT simulation
const createToken = (payload: any): string => `mock-jwt-token.${btoa(JSON.stringify(payload))}`;
export const decodeToken = (token: string): any => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}

/**
 * @class AuthService
 * Simulates the backend authentication microservice.
 */
export class AuthService {
    private db: MOCK_USER_DB_TYPE;
    private walletService: WalletService;
    private cache: CacheService;
    private authToken: string | null = null;

    constructor(db: MOCK_USER_DB_TYPE, cache: CacheService) {
        this.db = db;
        this.cache = cache;
        this.walletService = new WalletService(db, cache);
    }

    setAuthToken(token: string | null) {
        this.authToken = token;
    }

    private async verifyKYC(dto: RegisterDto): Promise<boolean> {
        console.log(`AUTH_SERVICE: Verifying KYC for ${dto.name}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return dto.nationalId.length === 16 && dto.name.trim().length > 3;
    }

    private generateTokens(user: User): Tokens {
        const payload = { sub: user.id, phone: user.phone, permissions: user.permissions };
        const accessToken = createToken({ ...payload, exp: Date.now() + 15 * 60 * 1000 });
        const refreshToken = createToken({ sub: user.id, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 });
        return { accessToken, refreshToken };
    }
    
    // Simulates Zero-Trust security model
    private async verifyRequest(context: ZeroTrustContext): Promise<ZeroTrustResult> {
        console.log(`AUTH_SERVICE: [Zero-Trust] Verifying request for user ${context.userId} from device ${context.deviceId}`);
        let riskScore = 0;
        // Mock logic: new devices or IPs increase risk
        if (context.deviceId === 'new-device-id') riskScore += 0.3;
        if (context.ipAddress.startsWith('8.8.8')) riskScore += 0.2;
        
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate analysis
        
        return {
            allowed: riskScore < 0.8,
            riskScore,
            requiresStepUp: riskScore > 0.5,
        };
    }

    async register(dto: RegisterDto): Promise<ApiResponse<{ user: User, wallet: Wallet, tokens: Tokens }>> {
        console.log("AUTH_SERVICE: Registration attempt for", dto.phone);

        if (this.db.users.find(u => u.phone === dto.phone)) {
            throw new Error('User with this phone number already exists.');
        }

        const isKycVerified = await this.verifyKYC(dto);
        if (!isKycVerified) {
            throw new Error('KYC verification failed.');
        }

        const newUser: User = {
            id: `user_${Date.now()}`, phone: dto.phone, name: dto.name, pin: dto.pin,
            nationalId: dto.nationalId, kycStatus: 'VERIFIED', role: 'USER',
            permissions: ['read:self', 'write:self'], createdAt: new Date().toISOString(),
        };
        this.db.users.push(newUser);

        const wallet = await this.walletService.createWallet(newUser.id, 'RWF');
        const tokens = this.generateTokens(newUser);
        
        // FIX: The `set` method in CacheService is public and async.
        await this.cache.set(`user:${newUser.id}`, newUser, 3600);
        
        console.log("AUTH_SERVICE: Registration successful for", newUser.name);
        return { success: true, data: { user: newUser, wallet, tokens } };
    }

    async login(dto: LoginDto): Promise<ApiResponse<{ user: User, wallet: Wallet, tokens: Tokens }>> {
        console.log("AUTH_SERVICE: Login attempt for", dto.phone);
        await new Promise(resolve => setTimeout(resolve, 500));

        const user = this.db.users.find(u => u.phone === dto.phone);
        if (!user || user.pin !== dto.pin) {
            throw new Error('Invalid phone number or PIN.');
        }
        
        const ztResult = await this.verifyRequest({ userId: user.id, deviceId: 'known-device', ipAddress: '127.0.0.1', operation: 'LOGIN' });
        if (!ztResult.allowed) {
            throw new Error(`Login blocked due to high risk score (${ztResult.riskScore.toFixed(2)}).`);
        }
        if (ztResult.requiresStepUp) {
            console.warn("AUTH_SERVICE: [Zero-Trust] Step-up authentication would be required here.");
        }

        // FIX: Explicitly type getOrSet and make fetcher async to return a Promise.
        const wallet = await this.cache.getOrSet<Wallet | undefined>(`wallet:user:${user.id}`, async () => {
            return this.db.wallets.find(w => w.userId === user.id && w.currency === 'RWF');
        }, 300);

        if (!wallet) {
            throw new Error('User wallet not found.');
        }

        const tokens = this.generateTokens(user);
        
        console.log("AUTH_SERVICE: Login successful for", user.name);
        return { success: true, data: { user, wallet, tokens } };
    }
}