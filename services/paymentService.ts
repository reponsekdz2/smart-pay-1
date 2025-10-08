
import type { ApiResponse, SendMoneyDto, Transaction, User } from '../types.ts';
import { MOCK_USER_DB_TYPE } from './db.ts';
import { decodeToken } from './authService.ts';
import { ComplianceService } from './complianceService.ts';
import { notificationService } from './notificationService.ts';

export class PaymentService {
    private db: MOCK_USER_DB_TYPE;
    private complianceService: ComplianceService;
    private authToken: string | null = null;

    constructor(db: MOCK_USER_DB_TYPE, complianceService: ComplianceService) {
        this.db = db;
        this.complianceService = complianceService;
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
    
    async sendMoney(payload: SendMoneyDto): Promise<ApiResponse<Transaction>> {
        const fromUser = this.getAuthenticatedUser();
        if (fromUser.id !== payload.fromUserId) throw new Error("Forbidden");

        const fromWallet = this.db.wallets.find(w => w.userId === fromUser.id);
        const toUser = this.db.users.find(u => u.phone === payload.toPhone);

        if (!toUser) return { success: false, error: 'Recipient phone number not found.' };
        const toWallet = this.db.wallets.find(w => w.userId === toUser.id);

        if (!fromWallet || !toWallet) return { success: false, error: 'Wallet error.' };
        if (fromWallet.balance < payload.amount) return { success: false, error: 'Insufficient funds.' };

        const fee = payload.amount > 100000 ? 500 : 100; // Simplified fee logic

        const newTransaction: Transaction = {
            id: `tx-${Date.now()}`,
            fromWalletId: fromWallet.id,
            toWalletId: toWallet.id,
            amount: payload.amount,
            fee,
            currency: 'RWF',
            description: payload.description,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
        };

        const complianceCheck = await this.complianceService.screenTransaction(newTransaction);
        if (!complianceCheck.passed) {
            newTransaction.status = 'FLAGGED';
            this.db.transactions.push(newTransaction);
            notificationService.notify(fromUser.id, 'Your transaction has been flagged for review.', 'info');
            return { success: false, error: `Transaction flagged: ${complianceCheck.failedChecks.join(', ')}` };
        }
        
        // Atomic update simulation
        fromWallet.balance -= (payload.amount + fee);
        toWallet.balance += payload.amount;
        newTransaction.status = 'COMPLETED';
        this.db.transactions.push(newTransaction);

        notificationService.notify(fromUser.id, `You sent ${payload.amount} RWF to ${toUser.name}.`, 'success');
        notificationService.notify(toUser.id, `You received ${payload.amount} RWF from ${fromUser.name}.`, 'success');

        return { success: true, data: newTransaction };
    }
}
