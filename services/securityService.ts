
import type { ApiResponse } from '../types.ts';
export class SecurityService {
    async changePin(userId: string, oldPin: string, newPin: string): Promise<ApiResponse> {
        // Mock implementation
        console.log(`SECURITY_SERVICE: Changing PIN for user ${userId}`);
        return { success: true };
    }
}
