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
    User,
    RegisterData,
    PaymentRequest,
} from '../types';
import { mockCryptoWallets, mockNfts } from '../constants/cryptoData';
import { mockBadges, mockGoals, mockQuests, mockRpgCharacter, mockMilestoneNfts } from '../constants/gamificationData';
import { mockCommunityProjects, mockIbiminaGroups } from '../constants/communityData';
import { mockMerchantData } from '../constants/merchantData';
import { mockClaims } from '../constants/insuranceData';
import { mockCourses } from '../constants/educationData';
import { mockImpactFunds, mockSdgMetrics } from '../constants/impactData';
import { mockDigitalCredentials } from '../constants/civicData';

// Import the new mock services
import { authService } from '../services/authService';
import { paymentGateway } from '../services/paymentService';
import { securityService } from '../services/securityService';


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
    user: User | null; // User can be null when not authenticated
    // --- PRODUCTION-READY ACTIONS ---
    register: (data: RegisterData) => Promise<void>;
    login: (phone: string, pin: string) => Promise<void>;
    logout: () => void;
    processTransaction: (request: PaymentRequest) => Promise<PaymentResponse>;
    processTopUp: (request: PaymentRequest) => Promise<PaymentResponse>;
    // --- EXISTING ACTIONS ---
    toggleMerchantView: () => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

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

const storeName = 'user-storage-v5-production'; // Version bump for new structure

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            ...initialAppState,
            isAuthenticated: false,
            user: null,
            
            register: async (data) => {
                const response = await authService.register(data);
                if (response.success && response.user) {
                    set({ isAuthenticated: true, user: response.user });
                } else {
                    throw new Error('Registration failed');
                }
            },

            login: async (phone, pin) => {
                const response = await authService.login(phone, pin);
                 if (response.success && response.user) {
                    set({ isAuthenticated: true, user: response.user });
                } else {
                    throw new Error('Login failed');
                }
            },

            logout: () => set({ isAuthenticated: false, user: null, ...initialAppState }),

            processTransaction: async (request) => {
                const user = get().user;
                if (!user || user.balance < request.amount) {
                    throw new Error('Insufficient balance.');
                }

                const paymentAuthSuccess = await authService.processPaymentAuth(request.amount, 'TRANSFER');
                if (!paymentAuthSuccess) {
                    throw new Error('Payment authentication failed.');
                }

                // Use the generic 'MTN' provider for simulation
                const response = await paymentGateway.processPayment('MTN', request);
                
                if (response.success) {
                    const newTransaction: Transaction = {
                        id: response.transactionId,
                        type: 'sent',
                        name: `To ${request.recipient}`,
                        description: request.description,
                        amount: -request.amount,
                        date: new Date().toISOString(),
                        iconName: 'arrow-up-right',
                    };
                    set(state => ({
                        user: state.user ? {
                            ...state.user,
                            balance: state.user.balance - request.amount,
                            transactions: [newTransaction, ...state.user.transactions],
                        } : null
                    }));
                }
                return response;
            },
            
            processTopUp: async (request) => {
                // Determine provider from providerData, default to MTN for simulation
                const providerId = request.providerData.providerId || 'MTN'; 
                const response = await paymentGateway.processPayment(providerId, request);

                if (response.success) {
                    const newTransaction: Transaction = {
                        id: response.transactionId,
                        type: 'top-up',
                        name: `Top-up via ${providerId}`,
                        description: request.description,
                        amount: request.amount,
                        date: new Date().toISOString(),
                        iconName: 'arrow-down-left',
                    };
                     set(state => ({
                        user: state.user ? {
                            ...state.user,
                            balance: state.user.balance + request.amount,
                            transactions: [newTransaction, ...state.user.transactions],
                        } : null
                    }));
                }
                return response;
            },

            toggleMerchantView: () => set((state) => ({ isMerchantView: !state.isMerchantView })),
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: storeName,
            storage: createJSONStorage(() => localStorage),
        }
    )
);