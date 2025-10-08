import type { DigitalCredential } from '../types';
import { Fingerprint, Car, GraduationCap } from 'lucide-react';

export const mockDigitalCredentials: DigitalCredential[] = [
    {
        id: '1',
        name: 'National ID',
        issuer: 'NIDA',
        verified: true,
        icon: Fingerprint,
    },
    {
        id: '2',
        name: "Driver's License",
        issuer: 'RNP',
        verified: true,
        icon: Car,
    },
    {
        id: '3',
        name: 'Academic Records',
        issuer: 'University of Rwanda',
        verified: true,
        icon: GraduationCap,
    },
];
