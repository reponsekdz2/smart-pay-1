import type { ApiResponse, User, RelationshipNode } from '../types';
import { MOCK_USER_DB_TYPE } from './db';
import { decodeToken } from './authService';

/**
 * @class RelationshipService
 * Simulates a graph database for analyzing user relationships.
 */
export class RelationshipService {
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

    // Simulates a graph query to find a user's financial network
    async analyzeUserNetwork(userId: string): Promise<ApiResponse<RelationshipNode[]>> {
        const user = this.getAuthenticatedUser();
        if (user.id !== userId) throw new Error("Forbidden");

        console.log(`RELATIONSHIP_SERVICE: Analyzing network for user ${userId}`);
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate complex query

        const userWallet = this.db.wallets.find(w => w.userId === userId);
        if (!userWallet) return { success: true, data: [] };

        const relatedTransactions = this.db.transactions.filter(
            t => t.fromWalletId === userWallet.id || t.toWalletId === userWallet.id
        );

        const relationships = new Map<string, { sent: number; received: number; count: number }>();

        for (const tx of relatedTransactions) {
            let otherWalletId: string;
            let direction: 'sent' | 'received';

            if (tx.fromWalletId === userWallet.id) {
                otherWalletId = tx.toWalletId;
                direction = 'sent';
            } else {
                otherWalletId = tx.fromWalletId;
                direction = 'received';
            }

            const otherWallet = this.db.wallets.find(w => w.id === otherWalletId);
            if (!otherWallet) continue;
            
            const otherUserId = otherWallet.userId;

            if (!relationships.has(otherUserId)) {
                relationships.set(otherUserId, { sent: 0, received: 0, count: 0 });
            }

            const rel = relationships.get(otherUserId)!;
            rel.count += 1;
            if (direction === 'sent') {
                rel.sent += tx.amount;
            } else {
                rel.received += tx.amount;
            }
        }
        
        const network: RelationshipNode[] = Array.from(relationships.entries()).map(([contactId, data]) => {
            const contact = this.db.users.find(u => u.id === contactId);
            return {
                contactId,
                contactName: contact?.name || 'Unknown User',
                transactionCount: data.count,
                totalSent: data.sent,
                totalReceived: data.received,
                strength: 0, // Will be calculated next
            };
        });

        const maxCount = Math.max(1, ...network.map(n => n.transactionCount));
        network.forEach(n => {
            n.strength = Math.min(1, n.transactionCount / maxCount); // Simple strength calculation
        });

        const sortedNetwork = network.sort((a, b) => b.strength - a.strength);

        return { success: true, data: sortedNetwork };
    }
}