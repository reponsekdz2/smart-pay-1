import type { ApiResponse, User, FinancialHealthPrediction, FraudAnalysis, Transaction } from '../types';
import { MOCK_USER_DB_TYPE } from './db';
import { decodeToken } from './authService';

/**
 * @class AiService
 * Simulates the backend AI-powered microservice.
 * Provides predictive analytics, fraud detection, and recommendations.
 */
export class AiService {
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

    async getFinancialHealth(userId: string): Promise<ApiResponse<FinancialHealthPrediction>> {
        const user = this.getAuthenticatedUser();
        if (user.id !== userId) throw new Error("Forbidden");
        
        console.log(`AI_SERVICE: Predicting financial health for user ${userId}`);
        await new Promise(resolve => setTimeout(resolve, 700)); // Simulate ML model inference time

        const userWallet = this.db.wallets.find(w => w.userId === userId);
        const transactions = this.db.transactions.filter(t => t.fromWalletId === userWallet?.id || t.toWalletId === userWallet?.id);
        
        const income = transactions.filter(t => t.toWalletId === userWallet?.id).reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions.filter(t => t.fromWalletId === userWallet?.id).reduce((sum, t) => sum + t.amount, 0);

        let score = 50;
        if (income > expenses) score += 25;
        if ((userWallet?.balance ?? 0) > 100000) score += 15;
        if (transactions.length > 10) score += 10;
        
        score = Math.min(99, Math.max(10, score)); // Clamp score

        const prediction: FinancialHealthPrediction = {
            score: score,
            trend: income > expenses ? 'improving' : 'declining',
            recommendations: [
                "Consider setting up a recurring savings goal to improve your score.",
                "Review your spending on 'Food' to identify potential savings."
            ]
        };

        return { success: true, data: prediction };
    }

    async analyzeTransactionForFraud(transaction: Transaction): Promise<ApiResponse<FraudAnalysis>> {
        console.log(`AI_SERVICE: [Fraud Detection] Analyzing transaction ${transaction.id}`);
        await new Promise(resolve => setTimeout(resolve, 150));
        
        let riskScore = 0;
        if (transaction.amount > 500000) riskScore += 0.4; // High value
        if (new Date(transaction.createdAt).getHours() < 6) riskScore += 0.3; // Unusual time
        
        const analysis: FraudAnalysis = {
            isFraud: riskScore > 0.6,
            riskScore: riskScore,
            confidence: 0.95,
            recommendedAction: riskScore > 0.6 ? 'BLOCK' : riskScore > 0.3 ? 'CHALLENGE' : 'ALLOW',
        };

        return { success: true, data: analysis };
    }
}