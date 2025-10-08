
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, CreditCard, Landmark, Shield, MoreHorizontal } from 'lucide-react';
import { useUserStore } from './hooks/useUserStore';

// Screens
import DashboardScreen from './screens/DashboardScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import InsuranceScreen from './screens/InsuranceScreen';
import InvestScreen from './screens/InvestScreen';
import MoreScreen from './screens/MoreScreen';
import SplashScreen from './screens/SplashScreen';
import OnboardingFlow from './screens/onboarding/OnboardingFlow';
import SendMoneyScreen from './screens/SendMoneyScreen';
import TopUpScreen from './screens/TopUpScreen';
import AdminDashboard from './screens/AdminDashboard';
import NotFoundScreen from './screens/NotFoundScreen';
import SettingsScreen from './screens/SettingsScreen';
import NetworkScreen from './screens/NetworkScreen';
import SecurityScreen from './screens/SecurityScreen';
import SavingsScreen from './screens/SavingsScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import GamingScreen from './screens/GamingScreen';
import SmartAssistantScreen from './screens/SmartAssistantScreen';
import ImpactScreen from './screens/ImpactScreen';

// Components
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
    const { isAuthenticated, theme } = useUserStore();
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        // Apply theme
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme]);

    useEffect(() => {
        // Simulate loading time for persisted state to be read
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <Router>
            {isAuthenticated ? <MainApp /> : <AuthRoutes />}
        </Router>
    );
};

const AuthRoutes: React.FC = () => (
    <Routes>
        <Route path="/auth/*" element={<OnboardingFlow />} />
        <Route path="*" element={<Navigate to="/auth/welcome" replace />} />
    </Routes>
);

const MainApp: React.FC = () => {
    const { user } = useUserStore();

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/payments', label: 'Pay', icon: CreditCard },
        { path: '/savings', label: 'Savings', icon: Landmark },
        { path: '/insurance', label: 'Insurance', icon: Shield },
        { path: '/more', label: 'More', icon: MoreHorizontal },
    ];
    
    // Example of role-based routing
    if (user?.role === 'ADMIN') {
        return (
             <div className="max-w-md mx-auto h-screen bg-background dark:bg-gray-900 font-sans flex flex-col">
                <Routes>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
             </div>
        );
    }

    return (
        <div className="max-w-md mx-auto h-screen bg-background dark:bg-gray-900 font-sans flex flex-col">
            <main className="flex-1 overflow-y-auto">
                <Routes>
                    <Route path="/" element={<DashboardScreen />} />
                    <Route path="/payments" element={<PaymentsScreen />} />
                    <Route path="/insurance" element={<InsuranceScreen />} />
                    <Route path="/invest" element={<InvestScreen />} />
                    <Route path="/more" element={<MoreScreen />} />
                    <Route path="/send" element={<SendMoneyScreen />} />
                    <Route path="/topup" element={<TopUpScreen />} />
                    <Route path="/settings" element={<SettingsScreen />} />
                    <Route path="/network" element={<NetworkScreen />} />
                    <Route path="/security" element={<SecurityScreen />} />
                    <Route path="/savings" element={<SavingsScreen />} />
                    <Route path="/analytics" element={<AnalyticsScreen />} />
                    <Route path="/gaming" element={<GamingScreen />} />
                    <Route path="/assistant" element={<SmartAssistantScreen />} />
                    <Route path="/impact" element={<ImpactScreen />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </main>
            <BottomNav items={navItems} />
        </div>
    );
};

export default App;
