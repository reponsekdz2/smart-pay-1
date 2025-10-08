
import type { ApiResponse, PaymentDto, Transaction, User } from '../types';
import { MOCK_USER_DB_TYPE } from './db';
import { decodeToken } from './authService';
import { WalletService } from './walletService';
import { ComplianceService } from './complianceService';
import { AiService } from './aiService';
import { notificationService } from './notificationService';
import Config from '../constants/config';

/**
 * @class SecurityService
 * Simulates a high-security transaction processing service.
 * This is where core business logic for payments would reside on the backend.
 */
export class SecurityService {
    private db: MOCK_USER_DB_TYPE;
    private authToken: string | null = null;
    private walletService: WalletService;
    private complianceService: ComplianceService;
    private aiService: AiService;

    constructor(db: MOCK_USER_DB_TYPE) {
        this.db = db;
        // In a real microservice architecture, these would be API clients to other services.
        // We instantiate them here for simulation purposes.
        this.walletService = new WalletService(db, { getOrSet: async (key, fetcher) => fetcher(), set: async () => {}, del: async () => {} } as any);
        this.complianceService = new ComplianceService();
        this.aiService = new AiService(db);
    }

    setAuthToken(token: string | null) {
        this.authToken = token;
        this.aiService.setAuthToken(token); // Propagate token
    }

    private getAuthenticatedUser(): User {
        if (!this.authToken) throw new Error("Unauthorized");
        const payload = decodeToken(this.authToken);
        const user = this.db.users.find(u => u.id === payload.sub);
        if (!user) throw new Error("User not found");
        return user;
    }

    async sendP2P(dto: PaymentDto): Promise<ApiResponse<Transaction>> {
        const fromUser = this.getAuthenticatedUser();
        if (fromUser.id !== dto.fromUserId) {
            throw new Error("Forbidden: Cannot initiate transfer for another user.");
        }
        
        // 1. PIN Verification
        if (fromUser.pin !== dto.pin) {
            throw new Error("Invalid PIN.");
        }

        // 2. Find recipient
        const toUser = this.db.users.find(u => u.phone === dto.toPhone);
        if (!toUser) {
            throw new Error("Recipient not found.");
        }

        // 3. Find wallets
        const fromWallet = this.db.wallets.find(w => w.userId === fromUser.id);
        const toWallet = this.db.wallets.find(w => w.userId === toUser.id);
        if (!fromWallet || !toWallet) {
            throw new Error("Wallet not found for one or more users.");
        }
        
        // 4. Validate transaction
        if (dto.amount <= 0) throw new Error("Invalid amount.");
        if (fromWallet.availableBalance < dto.amount) throw new Error("Insufficient funds.");
        if (dto.amount > Config.DAILY_SEND_LIMIT) throw new Error(`Amount exceeds daily limit.`);

        // 5. Create transaction record
        let transaction: Transaction = {
            id: `txn_p2p_${Date.now()}`, fromWalletId: fromWallet.id, toWalletId: toWallet.id,
            amount: dto.amount, fee: 100, currency: 'RWF', status: 'PENDING', type: 'P2P',
            description: dto.description || 'Peer-to-peer transfer', createdAt: new Date().toISOString(),
        };
        this.db.transactions.push(transaction);
        
        // 6. AI Fraud Analysis & Compliance Screening (asynchronous)
        const [fraudCheck, complianceCheck] = await Promise.all([
            this.aiService.analyzeTransactionForFraud(transaction),
            this.complianceService.screenTransaction(transaction)
        ]);

        if (fraudCheck.data.isFraud || !complianceCheck.passed) {
            transaction.status = 'FLAGGED';
            console.error(`SECURITY_SERVICE: Transaction ${transaction.id} flagged. Fraud: ${fraudCheck.data.isFraud}, Compliance: ${!complianceCheck.passed}`);
            throw new Error("Transaction could not be processed due to security reasons.");
        }
        
        // 7. Execute ledger update (atomic operation in a real db)
        const debitSuccess = this.walletService._updateBalance(fromWallet.id, -dto.amount);
        if (!debitSuccess) {
            transaction.status = 'FAILED';
            throw new Error("Failed to debit sender's account.");
        }

        const creditSuccess = this.walletService._updateBalance(toWallet.id, dto.amount);
        if (!creditSuccess) {
            // Attempt to roll back
            this.walletService._updateBalance(fromWallet.id, dto.amount);
            transaction.status = 'FAILED';
            throw new Error("Failed to credit recipient's account.");
        }

        // 8. Finalize
        transaction.status = 'COMPLETED';
        
        // 9. Notify recipient
        notificationService.notify(toUser.id, `You have received ${dto.amount} RWF from ${fromUser.name}.`, 'success');

        return { success: true, data: transaction };
    }
}
