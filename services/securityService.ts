import type { ApiResponse, User } from '../types.ts';
import { MOCK_DB } from './db.ts';

/**
 * @class SecurityService
 * Simulates the backend security microservice.
 */
export class SecurityService {
    
    async changePin(userId: string, oldPin: string, newPin: string): Promise<ApiResponse<null>> {
        console.log(`SECURITY_SERVICE: Attempting PIN change for user ${userId}`);
        await new Promise(resolve => setTimeout(resolve, 200));

        const user = MOCK_DB.users.find(u => u.id === userId);
        if (!user) {
            return { success: false, error: 'User not found.' };
        }

        if (user.pin !== oldPin) {
            return { success: false, error: 'Incorrect old PIN.' };
        }

        if (newPin.length !== 6) {
            return { success: false, error: 'New PIN must be 6 digits.' };
        }

        user.pin = newPin;

        return { success: true, data: null };
    }
}
