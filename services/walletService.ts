
import type { ApiResponse, Wallet } from '../types';
import { MOCK_USER_DB_TYPE } from './db';
import { CacheService } from './cacheService';

/**
 * @class WalletService
 * Simulates the backend wallet microservice.
 */
export class WalletService {
    private db: MOCK_USER_DB_TYPE;
    private cache: CacheService;

    constructor(db: MOCK_USER_DB_TYPE, cache: CacheService) {
        this.db = db;
        this.cache = cache;
    }

    async createWallet(userId: string, currency: 'RWF'): Promise<Wallet> {
        console.log(`WALLET_SERVICE: Creating wallet for user ${userId}`);
        const existingWallet = this.db.wallets.find(w => w.userId === userId && w.currency === currency);
        if (existingWallet) {
            throw new Error('Wallet already exists for this user.');
        }

        const newWallet: Wallet = {
            id: `wallet_${Date.now()}`,
            userId,
            balance: 0,
            availableBalance: 0,
            currency,
            createdAt: new Date().toISOString(),
        };
        this.db.wallets.push(newWallet);
        await this.cache.set(`wallet:user:${userId}`, newWallet, 3600);
        return newWallet;
    }
    
    async getWalletByUserId(userId: string): Promise<ApiResponse<Wallet | null>> {
        const wallet = await this.cache.getOrSet<Wallet | undefined>(`wallet:user:${userId}`, async () => {
             return this.db.wallets.find(w => w.userId === userId);
        }, 300);

        if (!wallet) {
            return { success: false, data: null, error: 'Wallet not found' };
        }
        return { success: true, data: wallet };
    }

    // Internal method for services, not exposed via API Gateway
    _updateBalance(walletId: string, amount: number): boolean {
        const wallet = this.db.wallets.find(w => w.id === walletId);
        if (wallet) {
            if (wallet.availableBalance + amount < 0) {
                console.error(`WALLET_SERVICE: Insufficient funds for wallet ${walletId}`);
                return false;
            }
            wallet.balance += amount;
            wallet.availableBalance += amount;
            // Invalidate cache
            this.cache.del(`wallet:user:${wallet.userId}`);
            console.log(`WALLET_SERVICE: Updated balance for wallet ${walletId}. New balance: ${wallet.balance}`);
            return true;
        }
        console.error(`WALLET_SERVICE: Wallet not found: ${walletId}`);
        return false;
    }
}
