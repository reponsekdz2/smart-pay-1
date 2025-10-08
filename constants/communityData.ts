import type { IbiminaGroup, CommunityProject } from '../types';

export const mockIbiminaGroups: IbiminaGroup[] = [
    {
        id: '1',
        name: 'Abavandimwe Cooperative',
        members: 25,
        totalSavings: 2500000,
        yourShare: 100000,
        nextMeeting: 'Saturday, 10 AM',
    },
    {
        id: '2',
        name: 'Ejo Heza Family Fund',
        members: 12,
        totalSavings: 1800000,
        yourShare: 150000,
        nextMeeting: 'Sunday, 2 PM',
    },
];

export const mockCommunityProjects: CommunityProject[] = [
    {
        id: '1',
        title: 'Gatenga School Renovation',
        goal: 5000000,
        collected: 3200000,
        contributors: 150,
        organizer: 'Gatenga Sector Office',
        verified: true,
    },
    {
        id: '2',
        title: 'Kimironko Market Water Access',
        goal: 1500000,
        collected: 950000,
        contributors: 88,
        organizer: 'Market Committee',
        verified: true,
    },
];
