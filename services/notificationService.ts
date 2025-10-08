// FIX: Add .ts extension to file path
import type { NotificationPayload } from '../types.ts';

/**
 * @class NotificationService
 * Simulates a real-time notification service (e.g., WebSockets, Push Notifications).
 * This uses a simple browser EventTarget to dispatch events that the UI can listen to.
 * In a real app, this would connect to a WebSocket server (like the one defined in the prompt).
 */
class NotificationService extends EventTarget {
    
    /**
     * Dispatches a notification event. The UI can listen for 'notify' events.
     * @param userId The ID of the user to notify.
     * @param message The message content.
     * @param type The type of notification.
     */
    public notify(userId: string, message: string, type: 'success' | 'error' | 'info' = 'info') {
        console.log(`NOTIFICATION_SERVICE: Firing notification for user ${userId}: "${message}"`);
        
        const payload: Omit<NotificationPayload, 'userId'> = { message, type };
        
        // In this simulation, we dispatch a global event.
        // A real implementation would check if the current user matches the userId.
        this.dispatchEvent(new CustomEvent('notify', { detail: payload }));
    }
}

export const notificationService = new NotificationService();