import type { ApiResponse, User, RegisterDto, LoginDto } from '../types.ts';
import { MOCK_DB } from './db.ts';

// In a real app, this would be a secret key from env variables.
const JWT_SECRET = 'your-super-secret-key-for-smart-pay-rwanda';

// --- JWT Simulation ---
// These are simple base64 stubs and not real JWTs.
export const createToken = (payload: { sub: string, name: string, isAdmin?: boolean }): string => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const pl = btoa(JSON.stringify(payload));
    // No signature for this mock
    return `${header}.${pl}.signature`;
};

export const decodeToken = (token: string): { sub: string, name: string, isAdmin?: boolean } => {
    try {
        const parts = token.split('.');
        return JSON.parse(atob(parts[1]));
    } catch (e) {
        throw new Error('Invalid token');
    }
};

/**
 * @class AuthService
 * Simulates the backend authentication microservice.
 */
export class AuthService {
    async register(data: RegisterDto): Promise<ApiResponse<User>> {
        console.log("AUTH_SERVICE: Registering user", data.phone);
        await new Promise(resolve => setTimeout(resolve, 300));

        if (MOCK_DB.users.some(u => u.phone === data.phone)) {
            return { success: false, error: 'Phone number is already registered.' };
        }
        
        const newUser: User = {
            id: `user-${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...data
        };
        MOCK_DB.users.push(newUser);
        
        const newWallet = { id: `wallet-${newUser.id}`, userId: newUser.id, balance: 0, currency: 'RWF' as const };
        MOCK_DB.wallets.push(newWallet);
        
        return { success: true, data: newUser };
    }

    async login({ phone, pin }: LoginDto): Promise<ApiResponse<{ token: string, user: User }>> {
        console.log("AUTH_SERVICE: Logging in user", phone);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const user = MOCK_DB.users.find(u => u.phone === phone);
        
        if (!user || user.pin !== pin) {
            return { success: false, error: 'Invalid phone number or PIN.' };
        }

        const token = createToken({ sub: user.id, name: user.name, isAdmin: user.isAdmin });
        
        return { success: true, data: { token, user } };
    }

    async me(token: string): Promise<ApiResponse<User>> {
        try {
            const decoded = decodeToken(token);
            const user = MOCK_DB.users.find(u => u.id === decoded.sub);
            if (!user) return { success: false, error: 'User not found' };
            return { success: true, data: user };
        } catch (e) {
            return { success: false, error: 'Invalid or expired token.' };
        }
    }
}
