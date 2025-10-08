
import type { ApiResponse, User, LoginDto, RegisterDto, Wallet } from '../types';
import { MOCK_USER_DB_TYPE } from './db';
import { CacheService } from './cacheService';
import { WalletService } from './walletService';

// In a real app, use a proper JWT library like 'jsonwebtoken' or 'jose'
const SECRET_KEY = 'your-super-secret-key-that-is-not-so-secret';

// Simple base64 encoding/decoding to simulate JWT
const encodeToken = (payload: any): string => btoa(JSON.stringify(payload));
export const decodeToken = (token: string): any => JSON.parse(atob(token));

export class AuthService {
    private db: MOCK_USER_DB_TYPE;
    private cache: CacheService;
    private walletService: WalletService;
    private authToken: string | null = null;
    
    constructor(db: MOCK_USER_DB_TYPE, cache: CacheService) {
        this.db = db;
        this.cache = cache;
        this.walletService = new WalletService(db, cache);
    }
    
    setAuthToken(token: string | null) {
        this.authToken = token;
    }

    async register(dto: RegisterDto): Promise<ApiResponse<{ user: User }>> {
        console.log(`AUTH_SERVICE: Registering user ${dto.phone}`);
        if (this.db.users.some(u => u.phone === dto.phone)) {
            throw new Error("User with this phone number already exists.");
        }

        const newUser: User = {
            id: `user_${Date.now()}`,
            ...dto,
            createdAt: new Date().toISOString(),
        };
        this.db.users.push(newUser);

        // Create a wallet for the new user
        await this.walletService.createWallet(newUser.id, 'RWF');
        
        return { success: true, data: { user: newUser } };
    }

    async login(dto: LoginDto): Promise<ApiResponse<{ user: User; token: string, wallet: Wallet }>> {
        console.log(`AUTH_SERVICE: Logging in user ${dto.phone}`);
        const user = this.db.users.find(u => u.phone === dto.phone);
        if (!user || user.pin !== dto.pin) {
            throw new Error("Invalid phone number or PIN.");
        }

        const walletRes = await this.walletService.getWalletByUserId(user.id);
        if(!walletRes.success || !walletRes.data) {
             throw new Error("Could not find wallet for user.");
        }

        const tokenPayload = { sub: user.id, phone: user.phone, iat: Date.now() };
        const token = encodeToken(tokenPayload);

        return { success: true, data: { user, token, wallet: walletRes.data } };
    }

    async getProfile(): Promise<ApiResponse<User>> {
        if (!this.authToken) {
            throw new Error("Unauthorized");
        }
        try {
            const payload = decodeToken(this.authToken);
            const user = this.db.users.find(u => u.id === payload.sub);
            if (!user) {
                throw new Error("User not found");
            }
            return { success: true, data: user };
        } catch (e) {
            throw new Error("Invalid token");
        }
    }
}
