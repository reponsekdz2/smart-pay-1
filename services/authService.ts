
import type { ApiResponse, LoginDto, RegisterDto, User } from '../types.ts';
import { MOCK_DB, MOCK_USER_DB_TYPE } from './db.ts';
import { MOCK_API_DELAY } from '../constants/config.ts';
import { notificationService } from './notificationService.ts';

// In-memory token store for simulation
const tokenStore: { [userId: string]: string } = {};

// Super simple mock JWT functions. DO NOT USE IN PRODUCTION.
const createToken = (payload: { sub: string, name: string, isAdmin: boolean }) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const pl = btoa(JSON.stringify(payload));
    return `${header}.${pl}.${btoa('secret')}`;
};

export const decodeToken = (token: string): { sub: string, name: string, isAdmin: boolean } => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch (e) {
        throw new Error("Invalid token");
    }
};

export class AuthService {
    private db: MOCK_USER_DB_TYPE;

    constructor(db: MOCK_USER_DB_TYPE) {
        this.db = db;
    }

    async login(credentials: LoginDto): Promise<ApiResponse<{ token: string; user: User }>> {
        console.log("AUTH_SERVICE: Attempting login for", credentials.phone);
        await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
        
        const user = this.db.users.find(u => u.phone === credentials.phone && u.pin === credentials.pin);

        if (!user) {
            return { success: false, error: "Invalid phone number or PIN." };
        }

        const token = createToken({ sub: user.id, name: user.name, isAdmin: user.isAdmin });
        tokenStore[user.id] = token;

        console.log("AUTH_SERVICE: Login successful for", user.name);
        return { success: true, data: { token, user } };
    }

    async register(data: RegisterDto): Promise<ApiResponse<User>> {
         console.log("AUTH_SERVICE: Attempting registration for", data.phone);
         await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));

        if (this.db.users.some(u => u.phone === data.phone)) {
            return { success: false, error: "Phone number already registered." };
        }

        const newUser: User = {
            id: `user-${Date.now()}`,
            ...data,
            name: data.name,
            nationalId: data.nationalId,
            pin: data.pin,
            phone: data.phone,
            createdAt: new Date().toISOString(),
            isAdmin: false,
        };

        this.db.users.push(newUser);

        // Create a wallet for the new user
        const newWallet = {
            id: `wallet-${newUser.id}`,
            userId: newUser.id,
            balance: 0, // Start with a zero balance
            currency: 'RWF' as const,
        };
        this.db.wallets.push(newWallet);
        
        console.log("AUTH_SERVICE: Registration successful for", newUser.name);
        notificationService.notify(newUser.id, 'Welcome to Smart Pay!', 'success');
        return { success: true, data: newUser };
    }

    getProfile(token: string): User | null {
        try {
            const payload = decodeToken(token);
            const user = this.db.users.find(u => u.id === payload.sub);
            return user || null;
        } catch (e) {
            return null;
        }
    }
}
