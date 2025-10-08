import type { ImpactFund, SDGMetric } from '../types';

export const mockImpactFunds: ImpactFund[] = [
    {
        id: '1',
        name: 'Rwanda Agri-Tech Fund',
        sector: 'Agriculture',
        description: 'Invest in sustainable farming and market access for smallholder farmers.',
        minInvestment: 50000,
        expectedReturn: '8-12% p.a.',
    },
    {
        id: '2',
        name: 'Kigali Green Energy Project',
        sector: 'Renewable Energy',
        description: 'Fund the development of solar and micro-hydro projects in rural areas.',
        minInvestment: 100000,
        expectedReturn: '7-10% p.a.',
    },
    {
        id: '3',
        name: 'EdTech for All Initiative',
        sector: 'Education',
        description: 'Support digital learning platforms to improve skills development nationwide.',
        minInvestment: 25000,
        expectedReturn: 'Social & Financial',
    },
];

export const mockSdgMetrics: SDGMetric[] = [
    { goal: 1, title: 'No Poverty', impact: 'Your investments have helped create 45 jobs.' },
    { goal: 4, title: 'Quality Education', impact: 'Provided digital access to 250 students.' },
    { goal: 7, title: 'Affordable & Clean Energy', impact: 'Funded solar panels for 30 households.' },
];
