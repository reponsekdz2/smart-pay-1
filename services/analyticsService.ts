// FIX: Add .ts extension to file paths
import type { ApiResponse, FinancialInsights } from '../types.ts';
import { MOCK_USER_DB_TYPE } from './db.ts';

/**
 * @class AnalyticsService
 * Simulates the backend analytics microservice.
 * Generates insights for users and business intelligence for admins.
 * In a real app, this would query a data warehouse like ClickHouse or BigQuery.
 */
export class AnalyticsService {
    private db: MOCK_USER_DB_TYPE;
    
    constructor(db: MOCK_USER_DB_TYPE) {
        this.db = db;
    }

    async getFinancialInsights(userId: string): Promise<ApiResponse<FinancialInsights>> {
        console.log(`ANALYTICS_SERVICE: Generating insights for user ${userId}`);
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const userWallet = this.db.wallets.find(w => w.userId === userId);
        if (!userWallet) throw new Error("Wallet not found");

        const transactions = this.db.transactions.filter(t => t.fromWalletId === userWallet.id || t.toWalletId === userWallet.id);
        
        const income = transactions.filter(t => t.toWalletId === userWallet.id).reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.fromWalletId === userWallet.id).reduce((sum, t) => sum + t.amount, 0);

        const insights: FinancialInsights = {
            spendingByCategory: [
                { category: 'Food', amount: expense * 0.4 },
                { category: 'Transport', amount: expense * 0.3 },
                { category: 'Utilities', amount: expense * 0.2 },
                { category: 'Other', amount: expense * 0.1 },
            ],
            incomeVsExpense: [{ month: 'Current', income, expense }],
            savingsRate: income > 0 ? ((income - expense) / income) * 100 : 0,
        };

        return { success: true, data: insights };
    }
}