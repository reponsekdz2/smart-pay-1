import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Home, Repeat, Gamepad2, Leaf, MoreHorizontal, LayoutDashboard, ShoppingBag, Handshake, FileText } from 'lucide-react';
import { useUserStore } from './hooks/useUserStore';

import DashboardScreen from './screens/DashboardScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import InsuranceScreen from './screens/InsuranceScreen';
import ProfileScreen from './screens/ProfileScreen';
import SendMoneyScreen from './screens/SendMoneyScreen';
import OnboardingFlow from './screens/onboarding/OnboardingFlow';
import BottomNav from './components/BottomNav';
import SplashScreen from './screens/SplashScreen';
import TopUpScreen from './screens/TopUpScreen';
import QRScannerScreen from './screens/QRScannerScreen';

// --- SUPER APP SCREENS ---
import CryptoScreen from './screens/CryptoScreen';
import CommunityScreen from './screens/CommunityScreen';
import GamingScreen from './screens/GamingScreen';
import MoreScreen from './screens/MoreScreen';
import EducationScreen from './screens/EducationScreen';
import MarketplaceScreen from './screens/MarketplaceScreen';
import AutomationScreen from './screens/AutomationScreen';
import MerchantDashboardScreen from './screens/MerchantDashboardScreen';

// --- NEXT-LEVEL ADVANCED SCREENS ---
import ImpactScreen from './screens/ImpactScreen';
import QuantumAdvisorScreen from './screens/QuantumAdvisorScreen';
import MetaverseScreen from './screens/MetaverseScreen';
import BioWellnessScreen from './screens/BioWellnessScreen';
import SecurityScreen from './screens/SecurityScreen';
import CivicScreen from './screens/CivicScreen';
import DeveloperScreen from './screens/DeveloperScreen';
import RemittanceScreen from './screens/RemittanceScreen';


const useHydration = () => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        if (useUserStore.persist.hasHydrated()) {
            setHydrated(true);
            return;
        }
        const unsub = useUserStore.persist.onFinishHydration(() => setHydrated(true));
        return () => unsub();
    }, []);

    return hydrated;
};

// --- DYNAMIC THEME ENGINE ---
const useTheme = () => {
    const theme = useUserStore((state) => state.theme);
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme]);
};


const App: React.FC = () => {
    const hasHydrated = useHydration();
    const [isSplashFinished, setSplashFinished] = useState(false);
    useTheme();

    useEffect(() => {
        const timer = setTimeout(() => setSplashFinished(true), 2000); // Shorter splash
        return () => clearTimeout(timer);
    }, []);
    
    if (!hasHydrated || !isSplashFinished) {
        return <SplashScreen />;
    }

    return (
        <HashRouter>
            <Main />
        </HashRouter>
    );
};

const Main: React.FC = () => {
    const location = useLocation();
    const { isAuthenticated, isMerchantView } = useUserStore((state) => ({
      isAuthenticated: state.isAuthenticated,
      isMerchantView: state.isMerchantView,
    }));

    if (!isAuthenticated) {
        return (
             <div className="max-w-md mx-auto h-screen bg-backgroundDark font-sans flex flex-col">
                <Routes>
                    <Route path="/*" element={<OnboardingFlow />} />
                </Routes>
            </div>
        );
    }
    
    if (isMerchantView) {
        return <MerchantApp />;
    }

    const pathsWithoutNav = ['/send-money', '/top-up', '/qr-scanner'];
    const showNav = !pathsWithoutNav.some(path => location.pathname.startsWith(path));

    const navItems = [
        { path: '/dashboard', icon: Home, label: 'Home' },
        { path: '/crypto', icon: Repeat, label: 'Crypto' },
        { path: '/gaming', icon: Gamepad2, label: 'Gaming' },
        { path: '/impact', icon: Leaf, label: 'Impact' },
        { path: '/more', icon: MoreHorizontal, label: 'More' },
    ];
    
    return (
        <div className="max-w-md mx-auto h-screen bg-background dark:bg-gray-900 font-sans flex flex-col">
            <div className="flex-grow overflow-y-auto">
                <Routes>
                    <Route path="/dashboard" element={<DashboardScreen />} />
                    <Route path="/payments" element={<PaymentsScreen />} />
                    <Route path="/crypto" element={<CryptoScreen />} />
                    <Route path="/community" element={<CommunityScreen />} />
                    <Route path="/gaming" element={<GamingScreen />} />
                    <Route path="/more" element={<MoreScreen />} />
                    <Route path="/insurance" element={<InsuranceScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="/send-money" element={<SendMoneyScreen />} />
                    <Route path="/top-up" element={<TopUpScreen />} />
                    <Route path="/qr-scanner" element={<QRScannerScreen />} />
                    <Route path="/education" element={<EducationScreen />} />
                    <Route path="/marketplace" element={<MarketplaceScreen />} />
                    <Route path="/automation" element={<AutomationScreen />} />
                    {/* NEXT-LEVEL ROUTES */}
                    <Route path="/impact" element={<ImpactScreen />} />
                    <Route path="/advisor" element={<QuantumAdvisorScreen />} />
                    <Route path="/metaverse" element={<MetaverseScreen />} />
                    <Route path="/wellness" element={<BioWellnessScreen />} />
                    <Route path="/security" element={<SecurityScreen />} />
                    <Route path="/civic" element={<CivicScreen />} />
                    <Route path="/developer" element={<DeveloperScreen />} />
                    <Route path="/remittance" element={<RemittanceScreen />} />

                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </div>
            {showNav && <BottomNav items={navItems} />}
        </div>
    );
};

// --- PLACEHOLDER MERCHANT SCREENS to fix navigation ---
const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => (
    <div className="p-4 bg-background dark:bg-gray-900 h-full">
        <h1 className="text-2xl font-bold text-textPrimary dark:text-white">{title}</h1>
        <p className="text-textSecondary dark:text-gray-400 mt-2">This feature is under construction.</p>
    </div>
);


const MerchantApp: React.FC = () => {
    const location = useLocation();
    const pathsWithoutNav = ['/some-merchant-path'];
    const showNav = !pathsWithoutNav.some(path => location.pathname.startsWith(path));
    
    const navItems = [
        { path: '/merchant/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/merchant/inventory', icon: ShoppingBag, label: 'Inventory' },
        { path: '/merchant/crm', icon: Handshake, label: 'Customers' },
        { path: '/merchant/invoices', icon: FileText, label: 'Invoices' },
        { path: '/profile', icon: MoreHorizontal, label: 'More' }, // Link back to personal profile
    ];

    return (
        <div className="max-w-md mx-auto h-screen bg-background dark:bg-gray-900 font-sans flex flex-col">
            <div className="flex-grow overflow-y-auto">
                <Routes>
                    <Route path="/merchant/dashboard" element={<MerchantDashboardScreen />} />
                    <Route path="/merchant/inventory" element={<PlaceholderScreen title="Inventory Management" />} />
                    <Route path="/merchant/crm" element={<PlaceholderScreen title="Customer Management" />} />
                    <Route path="/merchant/invoices" element={<PlaceholderScreen title="Invoices" />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="*" element={<Navigate to="/merchant/dashboard" />} />
                </Routes>
            </div>
            {showNav && <BottomNav items={navItems} />}
        </div>
    );
};

export default App;