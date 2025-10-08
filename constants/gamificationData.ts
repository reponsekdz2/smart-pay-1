import type { GoalPlanet, Badge, Quest, WealthRPGCharacter, MilestoneNFT } from '../types';

export const mockGoals: GoalPlanet[] = [
    {
        id: '1',
        name: 'Buy a Car',
        targetAmount: 8000000,
        currentAmount: 3200000,
        timeline: 12,
        type: 'asset',
        priority: 'high',
    },
    {
        id: '2',
        name: 'University Fund',
        targetAmount: 12000000,
        currentAmount: 1500000,
        timeline: 24,
        type: 'education',
        priority: 'medium',
    },
    {
        id: '3',
        name: 'Home Construction',
        targetAmount: 25000000,
        currentAmount: 850000,
        timeline: 60,
        type: 'housing',
        priority: 'low',
    },
];

export const mockBadges: Badge[] = [
    {
        id: '1',
        name: 'Savings Champion',
        icon: '🏆',
        description: 'Saved 1,000,000 RWF',
        unlocked: true,
    },
    {
        id: '2',
        name: 'Investment Guru',
        icon: '📈',
        description: 'Made 10 successful investments',
        unlocked: false,
    },
    {
        id: '3',
        name: 'Community Helper',
        icon: '🤝',
        description: 'Participated in 5 community funds',
        unlocked: true,
    },
];

export const mockQuests: Quest[] = [
    {
        id: '1',
        title: 'The Budget Boss Battle',
        description: 'Stick to your budget for 30 days straight.',
        reward: 5000,
        xp: 250,
        progress: 65,
    },
    {
        id: '2',
        title: 'Slay the Debt Dragon',
        description: 'Pay off a high-interest debt completely.',
        reward: 10000,
        xp: 500,
        progress: 30,
    },
];

// --- NEW PLAY-TO-EARN DATA ---
export const mockRpgCharacter: WealthRPGCharacter = {
    level: 5,
    xp: 4500,
    netWorth: 5850000,
    financialSkills: ['Budgeting', 'Saving', 'Basic Investing'],
};

export const mockMilestoneNfts: MilestoneNFT[] = [
    {
        id: 'nft-m1',
        title: 'First 100k',
        milestone: 'Saved 100,000 RWF',
        creator: 'Smart Pay Mint',
        price: 0.05,
        currency: 'ETH',
        image: 'https://picsum.photos/seed/nft-milestone1/200/200',
        verified: true,
    },
    {
        id: 'nft-m2',
        title: 'Debt Free',
        milestone: 'Became Debt Free',
        creator: 'Smart Pay Mint',
        price: 0.2,
        currency: 'ETH',
        image: 'https://picsum.photos/seed/nft-milestone2/200/200',
        verified: true,
    },
];