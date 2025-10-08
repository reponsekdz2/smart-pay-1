import type { HealthClaim } from '../types';

export const mockClaims: HealthClaim[] = [
    {
        id: '1',
        description: 'Dental Check-up',
        amount: 25000,
        status: 'Approved',
        date: new Date(Date.now() - 10 * 86400000).toISOString(),
    },
    {
        id: '2',
        description: 'General Consultation',
        amount: 15000,
        status: 'Pending',
        date: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
];
