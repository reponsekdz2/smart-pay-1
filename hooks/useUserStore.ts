import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
    Transaction,
    CryptoWallet,
    NFT,
    IbiminaGroup,
    CommunityProject,
    Badge,
    Quest,
    GoalPlanet,
    MerchantData,
    HealthClaim,
    Course,
    ImpactFund,
    SDGMetric,
    WealthRPGCharacter,
    MilestoneNFT,
    DigitalCredential,
} from '../types';
import { mockCryptoWallets, mockNfts } from '../constants/cryptoData';
import { mockBadges, mockGoals, mockQuests, mockRpgCharacter, mockMilestoneNfts } from '../constants/gamificationData';
import { mockCommunityProjects, mockIbiminaGroups } from '../constants/communityData';
import { mockMerchantData } from '../constants/merchantData';
import { mockClaims } from '../constants/insuranceData';
import { mockCourses } from '../constants/educationData';
import { mockImpactFunds, mockSdgMetrics } from '../constants/impactData';
import { mockDigitalCredentials } from '../constants/civicData';


interface User {
    name: string;
    phone: string;
    pin: string;
    balance: number;
    transactions: Transaction[];
    bio: string;
    connections: number;
    trustScore: string;
    email: string;
    verified: boolean;
}

// --- NEW STATE SLICES FOR SUPER APP ---
interface AppState {
    cryptoWallets: CryptoWallet[];
    nfts: NFT[];
    ibiminaGroups: IbiminaGroup[];
    communityProjects: CommunityProject[];
    goals: GoalPlanet[];
    badges: Badge[];
    quests: Quest[];
    merchantData: MerchantData;
    isMerchantView: boolean;
    claims: HealthClaim[];
    courses: Course[];
    theme: 'light' | 'dark' | 'system';
    // --- NEXT-LEVEL STATE SLICES ---
    impactFunds: ImpactFund[];
    sdgMetrics: SDGMetric[];
    rpgCharacter: WealthRPGCharacter;
    milestoneNfts: MilestoneNFT[];
    digitalCredentials: DigitalCredential[];
}

interface UserStore extends AppState {
    isAuthenticated: boolean;
    user: User;
    setPhone: (phone: string) => void;
    setName: (name: string) => void;
    setPin: (pin: string) => void;
    completeOnboarding: () => void;
    addTransaction: (details: { recipient: string; amount: number }) => void;
    topUpBalance: (amount: number, providerName: string) => void;
    toggleMerchantView: () => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    logout: () => void;
}

const initialUser: User = {
    name: '',
    phone: '',
    pin: '',
    balance: 500000,
    transactions: [
        {
            id: '1',
            type: 'received',
            name: 'From Mum',
            description: 'Pocket money',
            amount: 25000,
            date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            iconName: 'arrow-down-left',
        },
        {
            id: '2',
            type: 'payment',
            name: 'MTN Airtime',
            description: 'Mobile top-up',
            amount: -5000,
            date: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
            iconName: 'power',
        },
        {
            id: '3',
            type: 'payment',
            name: 'Supermarket',
            description: 'Groceries',
            amount: -15750,
            date: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
            iconName: 'shopping-cart',
        },
    ],
    bio: 'Digital finance enthusiast | Making payments simpler in Rwanda.',
    connections: 42,
    trustScore: '92%',
    email: 'user@smartpay.rw',
    verified: true,
};

const initialAppState: AppState = {
    cryptoWallets: mockCryptoWallets,
    nfts: mockNfts,
    ibiminaGroups: mockIbiminaGroups,
    communityProjects: mockCommunityProjects,
    goals: mockGoals,
    badges: mockBadges,
    quests: mockQuests,
    merchantData: mockMerchantData,
    isMerchantView: false,
    claims: mockClaims,
    courses: mockCourses,
    theme: 'system',
    // --- NEXT-LEVEL INITIAL STATE ---
    impactFunds: mockImpactFunds,
    sdgMetrics: mockSdgMetrics,
    rpgCharacter: mockRpgCharacter,
    milestoneNfts: mockMilestoneNfts,
    digitalCredentials: mockDigitalCredentials,
};

const storeName = 'user-storage-v4-quantum'; // Version bump for new structure

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            ...initialAppState,
            isAuthenticated: false,
            user: initialUser,
            setPhone: (phone) => set((state) => ({ user: { ...state.user, phone, email: `user${phone.slice(-4)}@smartpay.rw` } })),
            setName: (name) => set((state) => ({ user: { ...state.user, name } })),
            setPin: (pin) => set((state) => ({ user: { ...state.user, pin } })),
            completeOnboarding: () => set({ isAuthenticated: true }),
            addTransaction: ({ recipient, amount }) => {
                const newTransaction: Transaction = {
                    id: new Date().toISOString(),
                    type: 'sent',
                    name: `To ${recipient}`,
                    description: 'Money Transfer',
                    amount: -amount,
                    date: new Date().toISOString(),
                    iconName: 'arrow-up-right',
                };
                set((state) => ({
                    user: {
                        ...state.user,
                        balance: state.user.balance - amount,
                        transactions: [newTransaction, ...state.user.transactions],
                    },
                }));
            },
            topUpBalance: (amount, providerName) => {
              const newTransaction: Transaction = {
                id: new Date().toISOString(),
                type: 'top-up',
                name: `Top-up via ${providerName}`,
                description: 'Added funds to wallet',
                amount: amount,
                date: new Date().toISOString(),
                iconName: 'arrow-down-left',
              };
              set((state) => ({
                user: {
                  ...state.user,
                  balance: state.user.balance + amount,
                  transactions: [newTransaction, ...state.user.transactions],
                },
              }));
            },
            toggleMerchantView: () => set((state) => ({ isMerchantView: !state.isMerchantView })),
            setTheme: (theme) => set({ theme }),
            logout: () => set({ isAuthenticated: false, user: initialUser, ...initialAppState }),
        }),
        {
            name: storeName,
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                ...state, // Persist everything for the super app
            }),
        }
    )
);