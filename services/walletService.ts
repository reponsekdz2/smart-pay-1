
import type { ApiResponse, Transaction, User, Wallet } from '../types.ts';
import { MOCK_USER_DB_TYPE } from './db.ts';
import { decodeToken } from './authService.ts';
import { MOCK_API_DELAY } from '../constants/config.ts';

export class WalletService {
    private db: MOCK_USER_DB_TYPE;
    private authToken: string | null = null;

    constructor(db: MOCK_USER_DB_TYPE) {
        this.db = db;
    }
    
    setAuthToken(token: string | null) {
        this.authToken = token;
    }

    private getAuthenticatedUser(): User {
        if (!this.authToken) throw new Error("Unauthorized");
        const payload = decodeToken(this.authToken);
        const user = this.db.users.find(u => u.id === payload.sub);
        if (!user) throw new Error("User not found");
        return user;
    }

    async getWalletByUserId(userId: string): Promise<ApiResponse<Wallet>> {
        const authUser = this.getAuthenticatedUser();
        if (authUser.id !== userId) throw new Error("Forbidden");

        console.log(`WALLET_SERVICE: Fetching wallet for user ${userId}`);
        await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));

        const wallet = this.db.wallets.find(w => w.userId === userId);
        if (!wallet) {
            return { success: false, error: 'Wallet not found.' };
        }
        return { success: true, data: wallet };
    }
    
    async getTransactionsByUserId(userId: string): Promise<ApiResponse<Transaction[]>> {
        const authUser = this.getAuthenticatedUser();
        if (authUser.id !== userId) throw new Error("Forbidden");
        
        const wallet = this.db.wallets.find(w => w.userId === userId);
        if (!wallet) return { success: false, error: 'Wallet not found.' };

        console.log(`WALLET_SERVICE: Fetching transactions for user ${userId}`);
        await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));

        const transactions = this.db.transactions.filter(t => t.fromWalletId === wallet.id || t.toWalletId === wallet.id);
        
        // Sort by date, newest first
        transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return { success: true, data: transactions };
    }
}
