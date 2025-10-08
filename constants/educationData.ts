import type { Course, Simulation } from '../types';

export const mockCourses: Course[] = [
    {
        id: '1',
        title: 'Budgeting for Beginners',
        duration: '2 weeks',
        difficulty: 'beginner',
        reward: 1000,
    },
    {
        id: '2',
        title: 'Investment Strategies',
        duration: '4 weeks',
        difficulty: 'intermediate',
        reward: 2500,
    },
    {
        id: '3',
        title: 'Advanced Wealth Management',
        duration: '6 weeks',
        difficulty: 'advanced',
        reward: 5000,
    },
];

export const mockSimulations: Simulation[] = [
    {
        id: '1',
        type: 'stock_market',
        title: 'Stock Market Challenge',
        description: 'Invest virtual cash in a real-time market simulation.',
    },
    {
        id: '2',
        type: 'business_management',
        title: 'Startup CEO',
        description: 'Run a virtual startup and make key business decisions.',
    },
];
