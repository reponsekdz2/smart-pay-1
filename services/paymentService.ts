import type { ApiResponse, Transaction } from '../types.ts';
import { MOCK_DB } from './db.ts';
import { ComplianceService } from './complianceService.ts';
import { notificationService } from './notificationService.ts';

interface SendMoneyDto {
    fromUserId: string;
    toPhone: string;
    amount: number;
    description: string;
}

/**
 * @class PaymentService
 * Simulates the backend payments microservice.
 */
export class PaymentService {
    private complianceService: ComplianceService;

    constructor() {
        this.complianceService = new ComplianceService();
    }

    async sendMoney(data: SendMoneyDto): Promise<ApiResponse<Transaction>> {
        console.log(`PAYMENT_SERVICE: Initiating transfer from ${data.fromUserId} to ${data.toPhone}`);
        
        const fromWallet = MOCK_DB.wallets.find(w => w.userId === data.fromUserId);
        const toUser = MOCK_DB.users.find(u => u.phone === data.toPhone);
        
        if (!fromWallet) return { success: false, error: "Sender wallet not found." };
        if (!toUser) return { success: false, error: "Recipient not found." };
        
        const toWallet = MOCK_DB.wallets.find(w => w.userId === toUser.id);
        if (!toWallet) return { success: false, error: "Recipient wallet not found." };

        if (fromWallet.balance < data.amount) {
            return { success: false, error: "Insufficient funds." };
        }

        const fee = data.amount * 0.01; // 1% fee
        const totalDeducted = data.amount + fee;

        if (fromWallet.balance < totalDeducted) {
            return { success: false, error: "Insufficient funds to cover fee." };
        }

        const newTransaction: Transaction = {
            id: `tx-${Date.now()}`,
            fromWalletId: fromWallet.id,
            toWalletId: toWallet.id,
            amount: data.amount,
            fee: fee,
            currency: 'RWF',
            description: data.description,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
        };

        const complianceCheck = await this.complianceService.screenTransaction(newTransaction);
        if (!complianceCheck.passed) {
            newTransaction.status = 'FLAGGED';
            MOCK_DB.transactions.unshift(newTransaction);
             notificationService.notify(data.fromUserId, `Your transaction to ${toUser.name} is under review.`, 'info');
            return { success: false, error: `Transaction flagged for review: ${complianceCheck.failedChecks.join(', ')}` };
        }
        
        // Atomic update simulation
        fromWallet.balance -= totalDeducted;
        toWallet.balance += data.amount;
        newTransaction.status = 'COMPLETED';

        MOCK_DB.transactions.unshift(newTransaction);

        notificationService.notify(toUser.id, `You have received ${data.amount} RWF from ${MOCK_DB.users.find(u => u.id === data.fromUserId)?.name}.`, 'success');

        return { success: true, data: newTransaction };
    }
}
