import { LucideIcon } from 'lucide-react';

export type TransactionIconType = 'arrow-up-right' | 'arrow-down-left' | 'shopping-cart' | 'power' | 'users' | 'landmark';

export interface Transaction {
    id: string;
    type: 'sent' | 'received' | 'payment' | 'top-up' | 'loan' | 'insurance' | 'community' | 'investment';
    name: string;
    description: string;
    amount: number;
    date: string;
    iconName: TransactionIconType;
}

export interface InsurancePolicy {
    id: string;
    type: 'Account' | 'Vehicle' | 'Property' | 'Health';
    name: string;
    coverage: string;
    premium: number;
    status: 'Active' | 'Expired';
    icon: LucideIcon;
}

// Replaced by GoalPlanet
export interface InvestmentGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    color: string;
}

export interface NavItem {
    path: string;
    icon: LucideIcon;
    label: string;
}

// New types for Payment Integration
export type ProviderCategory = 'MOBILE_MONEY' | 'BANKS' | 'INTERNATIONAL';

export interface PaymentProvider {
    id:string;
    name: string;
    icon: LucideIcon;
    category: ProviderCategory;
    fees: string;
    speed: string;
    currency?: string;
    formFields: {
        id: string;
        label: string;
        type: 'text' | 'number' | 'tel';
        placeholder: string;
    }[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

// --- ULTIMATE FEATURE EXPANSION TYPES ---

// 🧠 AI & Intelligence
export interface PredictiveInsight {
    id: string;
    type: 'spending_alert' | 'saving_opportunity' | 'investment_alert';
    title: string;
    message: string;
    confidence: number;
    icon: LucideIcon;
}

// 🌐 Blockchain & Web3
export interface CryptoWallet {
    id: string;
    name: string;
    symbol: 'BTC' | 'ETH' | 'BNB' | 'RWT';
    balance: number;
    valueRWF: number;
    network: 'mainnet' | 'testnet' | 'local';
    icon: LucideIcon;
}

export interface NFT {
    id: string;
    title: string;
    creator: string;
    price: number;
    currency: 'ETH' | 'RWT';
    image: string;
    verified: boolean;
}

// 🏘️ Community Banking
export interface IbiminaGroup {
    id: string;
    name: string;
    members: number;
    totalSavings: number;
    yourShare: number;
    nextMeeting: string;
}

export interface CommunityProject {
    id: string;
    title: string;
    goal: number;
    collected: number;
    contributors: number;
    organizer: string;
    verified: boolean;
}

// 🎯 Smart Goals & Gamification
export interface GoalPlanet {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    timeline: number; // months
    type: 'asset' | 'education' | 'housing' | 'emergency';
    priority: 'high' | 'medium' | 'low';
}

export interface Badge {
    id: string;
    name: string;
    icon: string;
    description: string;
    unlocked: boolean;
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    reward: number; // RWF
    xp: number;
    progress: number; // percentage
}

// 🏢 Business & Merchant
export interface BusinessMetric {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
}

export interface BusinessProduct {
    id: string;
    name: string;
    stock: number;
    price: number;
}

export interface MerchantData {
    stats: BusinessMetric[];
    inventory: BusinessProduct[];
}

// 🏥 Health & Insurance
export interface HealthClaim {
    id: string;
    description: string;
    amount: number;
    status: 'Pending' | 'Approved' | 'Rejected';
    date: string;
}

// 🎓 Financial Education
export interface Course {
    id: string;
    title: string;
    duration: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    reward: number; // RWF
}

export interface Simulation {
    id: string;
    type: 'stock_market' | 'business_management';
    title: string;
    description: string;
}


// --- 🚀 NEXT-LEVEL ADVANCED FEATURE TYPES ---

// 🤖 QUANTUM AI FINANCIAL ADVISOR
export interface LifeEventPredictions {
    marriage: number;
    children: number;
    homePurchase: number;
    retirement: number;
    emergency: number;
}

export interface AIStrategy {
    id: string;
    title: string;
    description: string;
    category: 'Portfolio' | 'Tax' | 'Estate';
    icon: LucideIcon;
}

// 🌌 METAVERSE BANKING
export interface MetaverseAsset {
    id: string;
    name: string;
    type: 'NFT Art' | 'Virtual Property' | 'Achievement Trophy';
    value: number; // in ETH or RWT
    currency: 'ETH' | 'RWT';
    image: string;
}

// 🧬 BIOMETRIC WEALTH MANAGEMENT
export interface HealthWealthMetric {
    id: string;
    title: string;
    description: string;
    correlation: 'Positive' | 'Negative' | 'Neutral';
    icon: LucideIcon;
}

// 🌱 SUSTAINABLE & IMPACT INVESTING
export interface ImpactFund {
    id: string;
    name: string;
    sector: 'Agriculture' | 'Renewable Energy' | 'Education';
    description: string;
    minInvestment: number;
    expectedReturn: string;
}

export interface SDGMetric {
    goal: number;
    title: string;
    impact: string;
}

// 🎮 PLAY-TO-EARN FINANCIAL GAMING
export interface WealthRPGCharacter {
    level: number;
    xp: number;
    netWorth: number;
    financialSkills: string[];
}

export interface MilestoneNFT extends NFT {
    milestone: string;
}

// 🏛️ GOVERNMENT & INSTITUTIONAL INTEGRATION
export interface DigitalCredential {
    id: string;
    name: string;
    issuer: string;
    verified: boolean;
    icon: LucideIcon;
}
