// FIX: Add .ts extension to file path
import type { InsurancePolicy } from '../types.ts';

export const MOCK_INSURANCE_POLICIES: Omit<InsurancePolicy, 'id' | 'userId'>[] = [
    {
        provider: 'Radiant',
        type: 'Auto',
        policyNumber: 'RAD-AUTO-12345',
        coverage: 15000000,
        premium: 50000,
        status: 'Active',
        startDate: '2023-01-01',
        endDate: '2024-01-01',
    },
    {
        provider: 'Britam',
        type: 'Health',
        policyNumber: 'BRI-HLTH-67890',
        coverage: 5000000,
        premium: 25000,
        status: 'Active',
        startDate: '2023-06-01',
        endDate: '2024-06-01',
    },
];