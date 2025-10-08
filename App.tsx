
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Home, CreditCard, Shield, BarChart2, User } from 'lucide-react';
import { useUserStore } from './hooks/useUserStore';

import DashboardScreen from './screens/DashboardScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import InsuranceScreen from './screens/InsuranceScreen';
import InvestScreen from './screens/InvestScreen';
import ProfileScreen from './screens/ProfileScreen';
import SendMoneyScreen from './screens/SendMoneyScreen';
import OnboardingFlow from './screens/onboarding/OnboardingFlow';
import BottomNav from './components/BottomNav';
import SplashScreen from './screens/SplashScreen';
import TopUpScreen from './screens/TopUpScreen';
import QRScannerScreen from './screens/QRScannerScreen'; // Import the new screen

// Custom hook to reliably track Zustand hydration status using the official persist API
const useHydration = () => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // Check if hydration is already complete
        if (useUserStore.persist.hasHydrated()) {
            setHydrated(true);
            return;
        }

        // If not, subscribe to the onFinishHydration event
        const unsub = useUserStore.persist.onFinishHydration(() => {
            setHydrated(true);
        });
        
        // Cleanup subscription on unmount
        return () => {
            unsub();
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return hydrated;
};


const App: React.FC = () => {
    const hasHydrated = useHydration();
    const [isSplashFinished, setSplashFinished] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSplashFinished(true);
        }, 3000); // Match splash screen duration
        
        return () => {
            clearTimeout(timer);
        };
    }, []);
    
    // Wait for both store rehydration and splash screen animation to finish
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
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return (
             <div className="max-w-md mx-auto h-screen bg-backgroundDark font-sans flex flex-col">
                <Routes>
                    <Route path="/onboarding/*" element={<OnboardingFlow />} />
                    <Route path="*" element={<Navigate to="/onboarding" />} />
                </Routes>
            </div>
        );
    }
    
    const pathsWithoutNav = ['/send-money', '/top-up', '/qr-scanner'];
    const showNav = !pathsWithoutNav.some(path => location.pathname.startsWith(path));

    const navItems = [
        { path: '/dashboard', icon: Home, label: 'Home' },
        { path: '/payments', icon: CreditCard, label: 'Payments' },
        { path: '/insurance', icon: Shield, label: 'Insurance' },
        { path: '/invest', icon: BarChart2, label: 'Invest' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];
    
    return (
        <div className="max-w-md mx-auto h-screen bg-background font-sans flex flex-col">
            <div className="flex-grow overflow-y-auto">
                <Routes>
                    <Route path="/dashboard" element={<DashboardScreen />} />
                    <Route path="/payments" element={<PaymentsScreen />} />
                    <Route path="/insurance" element={<InsuranceScreen />} />
                    <Route path="/invest" element={<InvestScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="/send-money" element={<SendMoneyScreen />} />
                    <Route path="/top-up" element={<TopUpScreen />} />
                    <Route path="/qr-scanner" element={<QRScannerScreen />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </div>
            {showNav && <BottomNav items={navItems} />}
        </div>
    );
};

export default App;
