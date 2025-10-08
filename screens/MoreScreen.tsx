import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ChevronRight, User, Shield, BarChart3, Settings, LifeBuoy, Zap, Users, Bitcoin, BookOpen, ShoppingBag, Store, HeartPulse, Landmark, TerminalSquare, Leaf, Orbit, BrainCircuit, Globe, Trophy, Wifi, Link as LinkIcon } from 'lucide-react';

interface MoreLinkProps {
    icon: React.ElementType;
    label: string;
    path: string;
    isPro?: boolean;
}

const MoreLink: React.FC<MoreLinkProps> = ({ icon: Icon, label, path, isPro }) => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(path)} className="flex items-center justify-between w-full p-4 bg-surface dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex items-center space-x-4">
                <Icon className="w-6 h-6 text-primary" />
                <span className="font-semibold text-textPrimary dark:text-white">{label}</span>
                 {isPro && <span className="text-xs font-bold bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full">PRO</span>}
            </div>
            <ChevronRight className="w-5 h-5 text-textSecondary dark:text-gray-400" />
        </button>
    );
};

const MoreScreen: React.FC = () => {
    const coreFeatures = [
        { icon: User, label: 'My Profile', path: '/profile' },
        { icon: Shield, label: 'Security Center', path: '/security' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Wifi, label: 'Pay Bills', path: '/payments' },
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: LifeBuoy, label: 'Help & Support', path: '/support' },
    ];
    
    const proFeatures = [
        { icon: Zap, label: 'Automation', path: '/automation' },
        { icon: Users, label: 'Community', path: '/community' },
        { icon: Bitcoin, label: 'Crypto', path: '/crypto' },
        { icon: BookOpen, label: 'Learn', path: '/education' },
        { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
        { icon: Store, label: 'Merchant Tools', path: '/merchant' },
        { icon: HeartPulse, label: 'Bio-Wellness', path: '/wellness' },
        { icon: Landmark, label: 'Civic Engagement', path: '/civic' },
        { icon: TerminalSquare, label: 'Developer API', path: '/developer' },
        { icon: Leaf, label: 'My Impact', path: '/impact' },
        { icon: Orbit, label: 'Metaverse', path: '/metaverse' },
        { icon: BrainCircuit, label: 'Quantum Advisor', path: '/advisor' },
        { icon: Globe, label: 'Global Transfers', path: '/remittance' },
        { icon: Trophy, label: 'Rewards & Games', path: '/gaming' },
        { icon: LinkIcon, label: 'My Network', path: '/network' },
    ];


    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="More" />
            <main className="p-4 space-y-6">
                 <div>
                    <h2 className="px-2 mb-2 text-sm font-semibold text-textSecondary dark:text-gray-400">General</h2>
                    <div className="space-y-2">
                        {coreFeatures.map(item => <MoreLink key={item.path} {...item} />)}
                    </div>
                </div>
                <div>
                    <h2 className="px-2 mb-2 text-sm font-semibold text-textSecondary dark:text-gray-400">Smart Pay PRO Features</h2>
                    <div className="space-y-2">
                        {proFeatures.map(item => <MoreLink key={item.path} {...item} isPro />)}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MoreScreen;
