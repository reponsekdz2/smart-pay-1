// FIX: Add .ts extension to file paths
import type { ApiResponse, BusinessIntelligence, User } from '../types.ts';
import { MOCK_USER_DB_TYPE } from './db.ts';
import { decodeToken } from './authService.ts';

/**
 * @class AdminService
 * Simulates the backend admin microservice.
 */
export class AdminService {
    private db: MOCK_USER_DB_TYPE;
    private authToken: string | null = null;

    constructor(db: MOCK_USER_DB_TYPE) {
        this.db = db;
    }
    
    setAuthToken(token: string | null) {
        this.authToken = token;
    }

    private getAuthenticatedAdminUser(): User {
        if (!this.authToken) throw new Error("Unauthorized");
        const payload = decodeToken(this.authToken);
        const user = this.db.users.find(u => u.id === payload.sub);
        if (!user || !user.isAdmin) throw new Error("Forbidden: Admin access required");
        return user;
    }

    async getBusinessIntelligence(): Promise<ApiResponse<BusinessIntelligence>> {
        this.getAuthenticatedAdminUser(); // Throws error if not admin
        
        console.log("ADMIN_SERVICE: Compiling business intelligence report.");
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate heavy query

        const today = new Date().toISOString().split('T')[0];
        const dailyTx = this.db.transactions.filter(t => t.createdAt.startsWith(today));
        const newUsers = this.db.users.filter(u => u.createdAt.startsWith(today));

        const data: BusinessIntelligence = {
            dailyTransactionVolume: dailyTx.reduce((sum, tx) => sum + tx.amount, 0),
            newUserSignups: newUsers.length,
            totalRevenue: this.db.transactions.reduce((sum, tx) => sum + tx.fee, 0),
            highRiskTransactions: this.db.transactions.filter(t => t.status === 'FLAGGED').length,
        };

        return { success: true, data };
    }
}