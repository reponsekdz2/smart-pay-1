
import type { Transaction } from "../types";

// In a real app, you'd use a more robust storage like IndexedDB
const PENDING_QUEUE_KEY = 'smartpay_sync_queue';

/**
 * @class SyncService
 * Simulates a service for handling offline functionality.
 * Queues transactions made while offline and syncs them when back online.
 */
export class SyncService {
    
    constructor() {
        // Listen for online/offline events to trigger sync
        window.addEventListener('online', this.processQueue.bind(this));
    }

    private getQueue(): Transaction[] {
        try {
            const queueStr = localStorage.getItem(PENDING_QUEUE_KEY);
            return queueStr ? JSON.parse(queueStr) : [];
        } catch {
            return [];
        }
    }

    private saveQueue(queue: Transaction[]) {
        localStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(queue));
    }

    /**
     * Adds a transaction to the offline queue.
     * @param transaction The transaction to be queued.
     */
    async addToQueue(transaction: Transaction) {
        console.log(`SYNC_SERVICE: Adding transaction ${transaction.id} to offline queue.`);
        const queue = this.getQueue();
        queue.push(transaction);
        this.saveQueue(queue);
    }

    /**
     * Processes the queue of pending transactions.
     * This would be called when the app comes back online.
     */
    async processQueue() {
        const queue = this.getQueue();
        if (queue.length === 0) {
            console.log("SYNC_SERVICE: Queue is empty, nothing to sync.");
            return;
        }

        console.log(`SYNC_SERVICE: Processing ${queue.length} items from the offline queue...`);

        // In a real app, you would loop through `queue` and send each transaction
        // to the real API endpoint.
        // For simulation, we'll just clear the queue.
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

        console.log("SYNC_SERVICE: Sync complete. Clearing queue.");
        this.saveQueue([]);
    }
}
