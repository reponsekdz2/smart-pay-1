
import type { ApiResponse, User, SavingsGoal } from '../types.ts';
import { MOCK_USER_DB_TYPE } from './db.ts';
import { decodeToken } from './authService.ts';

/**
 * @class SavingsService
 * Simulates the backend microservice for managing savings goals.
 */
export class SavingsService {
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

    async getGoalsByUserId(userId: string): Promise<ApiResponse<SavingsGoal[]>> {
        const user = this.getAuthenticatedUser();
        if (user.id !== userId) throw new Error("Forbidden");
        
        console.log(`SAVINGS_SERVICE: Fetching goals for user ${userId}`);
        await new Promise(resolve => setTimeout(resolve, 350));
        
        const goals = this.db.savingsGoals.filter(g => g.userId === userId);
        return { success: true, data: goals };
    }
}
