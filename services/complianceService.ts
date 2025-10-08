// FIX: Add .ts extension to file path
import type { Transaction, ComplianceCheck } from '../types.ts';

/**
 * @class ComplianceService
 * Simulates the backend compliance microservice.
 * Handles AML checks, transaction screening, and regulatory reporting.
 */
export class ComplianceService {
    
    // Simulates an Anti-Money Laundering check
    private async amlCheck(transaction: Transaction): Promise<{ passed: boolean, reason?: string }> {
        // Rule: Flag transactions over a certain threshold from non-verified users
        // This is a very basic example. Real AML systems are highly complex.
        if (transaction.amount > 500000) {
             console.log(`COMPLIANCE_SERVICE: [AML] Flagged transaction ${transaction.id} for high value.`);
            return { passed: false, reason: 'High-value transaction requires review.' };
        }
        return { passed: true };
    }

    // Simulates checking against sanctions lists (e.g., OFAC)
    private async sanctionsScreening(transaction: Transaction): Promise<{ passed: boolean, reason?: string }> {
        // In a real app, this would check sender/receiver against a database of sanctioned individuals.
        return { passed: true };
    }
    
    async screenTransaction(transaction: Transaction): Promise<ComplianceCheck> {
        console.log(`COMPLIANCE_SERVICE: Screening transaction ${transaction.id}`);
        await new Promise(resolve => setTimeout(resolve, 200));

        const results = await Promise.all([
            this.amlCheck(transaction),
            this.sanctionsScreening(transaction)
        ]);

        const failedChecks = results.filter(r => !r.passed).map(r => r.reason || 'Unknown');
        
        return {
            passed: failedChecks.length === 0,
            failedChecks,
            riskScore: failedChecks.length * 0.5, // Simplified risk scoring
            requiresManualReview: failedChecks.length > 0,
        };
    }
}