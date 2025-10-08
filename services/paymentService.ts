import type { ApiResponse, PaymentDto, Transaction, User, PaymentRoute } from '../types';
import { MOCK_USER_DB_TYPE } from './db';
import { WalletService } from './walletService';
import { decodeToken } from './authService';

/**
 * @class PaymentService
 * Simulates the backend payment microservice.
 */
export class PaymentService {
    private db: MOCK_USER_DB_TYPE;
    private walletService: WalletService;
    private authToken: string | null = null;

    constructor(db: MOCK_USER_DB_TYPE, walletService: WalletService) {
        this.db = db;
        this.walletService = walletService;
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

    private async detectFraud(dto: PaymentDto): Promise<boolean> {
        console.log(`PAYMENT_SERVICE: Running fraud detection for ${dto.amount} RWF`);
        await new Promise(resolve => setTimeout(resolve, 300));
        return dto.amount > 1000000; 
    }
    
    // Simulates smart routing to find the best payment provider
    async findOptimalRoute(payment: { amount: number }): Promise<PaymentRoute> {
        console.log(`PAYMENT_SERVICE: Finding optimal route for amount ${payment.amount}`);
        await new Promise(resolve => setTimeout(resolve, 200));

        // Mock provider stats
        const routes = [
            { provider: 'MTN', cost: payment.amount * 0.01, speed: 10, reliability: 0.98, successRate: 0.99 },
            { provider: 'Airtel', cost: payment.amount * 0.012, speed: 15, reliability: 0.97, successRate: 0.98 },
            { provider: 'Bank', cost: payment.amount * 0.005 + 500, speed: 300, reliability: 0.99, successRate: 0.96 },
        ];

        // Scoring algorithm (lower is better for cost/speed, higher for reliability/success)
        const scoredRoutes = routes.map(r => {
            const score = (1/r.cost) * 0.4 + (1/r.speed) * 0.2 + r.reliability * 0.2 + r.successRate * 0.2;
            return { ...r, score };
        });

        const bestRoute = scoredRoutes.reduce((best, current) => current.score > best.score ? current : best);
        return bestRoute;
    }


    async initiateTopUp(dto: PaymentDto): Promise<ApiResponse<Transaction>> {
        const user = this.getAuthenticatedUser();
        console.log(`PAYMENT_SERVICE: Initiating top-up for ${user.name} via ${dto.provider}`);
        
        const isFraudulent = await this.detectFraud(dto);
        if (isFraudulent) {
            throw new Error('Transaction flagged for manual review.');
        }

        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(`PAYMENT_SERVICE: Received success callback from ${dto.provider}`);

        const userWallet = this.db.wallets.find(w => w.userId === user.id);
        if (!userWallet) throw new Error("User wallet not found.");

        userWallet.balance += dto.amount;
        userWallet.availableBalance += dto.amount;

        const transaction: Transaction = {
            id: `txn_topup_${Date.now()}`, fromWalletId: 'EXTERNAL', toWalletId: userWallet.id,
            amount: dto.amount, fee: dto.amount * 0.01, currency: 'RWF', status: 'COMPLETED', type: 'TOPUP',
            provider: dto.provider, providerReference: `prov_ref_${Date.now()}`, description: `Top-up via ${dto.provider}`,
            createdAt: new Date().toISOString(),
        };
        this.db.transactions.push(transaction);

        return { success: true, data: transaction };
    }

    async getTransactionsByUserId(userId: string): Promise<ApiResponse<Transaction[]>> {
        const user = this.getAuthenticatedUser();
        if (user.id !== userId) throw new Error("Forbidden");

        const userWallet = this.db.wallets.find(w => w.userId === userId);
        if (!userWallet) return { success: true, data: [] };

        const userTransactions = this.db.transactions
            .filter(t => t.fromWalletId === userWallet.id || t.toWalletId === userWallet.id)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        return { success: true, data: userTransactions };
    }
}