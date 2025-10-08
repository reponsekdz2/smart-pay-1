import type { ApiResponse, BusinessIntelligence, User } from '../types';
import { MOCK_USER_DB_TYPE } from './db';
import { decodeToken } from './authService';

/**
 * @class AdminService
 * Simulates the backend admin microservice.
 * Provides functionality for administrative tasks and dashboards.
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

    private getAuthenticatedAdmin(): User {
        if (!this.authToken) throw new Error("Unauthorized");
        const payload = decodeToken(this.authToken);
        const user = this.db.users.find(u => u.id === payload.sub);
        if (!user || user.role !== 'ADMIN') throw new Error("Forbidden");
        return user;
    }

    async getBusinessIntelligence(): Promise<ApiResponse<BusinessIntelligence>> {
        this.getAuthenticatedAdmin(); // Throws error if not admin
        
        console.log("ADMIN_SERVICE: Generating Business Intelligence report...");
        await new Promise(resolve => setTimeout(resolve, 500));

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const report: BusinessIntelligence = {
            timestamp: new Date().toISOString(),
            dailyTransactionVolume: this.db.transactions
                .filter(t => new Date(t.createdAt) >= today)
                .reduce((sum, t) => sum + t.amount, 0),
            newUserSignups: this.db.users
                .filter(u => new Date(u.createdAt) >= today)
                .length,
            totalRevenue: this.db.transactions
                .reduce((sum, t) => sum + t.fee, 0),
            highRiskTransactions: this.db.transactions
                .filter(t => t.status === 'FLAGGED').length,
        };

        return { success: true, data: report };
    }
}
