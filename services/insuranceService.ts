
// FIX: Add .ts extension to file paths
import type { ApiResponse, User, InsurancePolicy } from '../types.ts';
import { MOCK_USER_DB_TYPE } from './db.ts';
import { decodeToken } from './authService.ts';

/**
 * @class InsuranceService
 * Simulates the backend microservice for managing insurance policies.
 */
export class InsuranceService {
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

    async getPoliciesByUserId(userId: string): Promise<ApiResponse<InsurancePolicy[]>> {
        const user = this.getAuthenticatedUser();
        if (user.id !== userId) throw new Error("Forbidden");

        console.log(`INSURANCE_SERVICE: Fetching policies for user ${userId}`);
        await new Promise(resolve => setTimeout(resolve, 400)); // Simulate DB query

        const policies = this.db.insurancePolicies.filter(p => p.userId === userId);
        return { success: true, data: policies };
    }
}
