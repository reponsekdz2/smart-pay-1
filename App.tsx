
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// FIX: Add .ts extension to file path
import { useUserStore } from './hooks/useUserStore.ts';

// Layouts
import MainAppLayout from './layouts/MainAppLayout.tsx';
import AdminLayout from './layouts/AdminLayout.tsx';

// Screens
// FIX: Add .tsx extension to file path
import DashboardScreen from './screens/DashboardScreen.tsx';
import PaymentsScreen from './screens/PaymentsScreen.tsx';
import InsuranceScreen from './screens/InsuranceScreen.tsx';
import InvestScreen from './screens/InvestScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';
// FIX: Add .tsx extension to file path
import SendMoneyScreen from './screens/SendMoneyScreen.tsx';
import TopUpScreen from './screens/TopUpScreen.tsx';
import QRScannerScreen from './screens/QRScannerScreen.tsx';
import SmartAssistantScreen from './screens/SmartAssistantScreen.tsx';
import MoreScreen from './screens/MoreScreen.tsx';
import SecurityScreen from './screens/SecurityScreen.tsx';
import AnalyticsScreen from './screens/AnalyticsScreen.tsx';
import SavingsScreen from './screens/SavingsScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import SplashScreen from './screens/SplashScreen.tsx';
import OnboardingFlow from './screens/onboarding/OnboardingFlow.tsx';
import NotFoundScreen from './screens/NotFoundScreen.tsx';

// --- PRO Feature Placeholders ---
import AutomationScreen from './screens/AutomationScreen.tsx';
import CommunityScreen from './screens/CommunityScreen.tsx';
import CryptoScreen from './screens/CryptoScreen.tsx';
import EducationScreen from './screens/EducationScreen.tsx';
import MarketplaceScreen from './screens/MarketplaceScreen.tsx';
import MerchantDashboardScreen from './screens/MerchantDashboardScreen.tsx';
import BioWellnessScreen from './screens/BioWellnessScreen.tsx';
import CivicScreen from './screens/CivicScreen.tsx';
import DeveloperScreen from './screens/DeveloperScreen.tsx';
import ImpactScreen from './screens/ImpactScreen.tsx';
import MetaverseScreen from './screens/MetaverseScreen.tsx';
import QuantumAdvisorScreen from './screens/QuantumAdvisorScreen.tsx';
import RemittanceScreen from './screens/RemittanceScreen.tsx';
import GamingScreen from './screens/GamingScreen.tsx';
import NetworkScreen from './screens/NetworkScreen.tsx';

// Admin Screens
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen.tsx';
import AdminLoginScreen from './screens/admin/AdminLoginScreen.tsx';
import UserManagementScreen from './screens/admin/UserManagementScreen.tsx';
import TransactionManagementScreen from './screens/admin/TransactionManagementScreen.tsx';

// A component to handle theme application
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useUserStore(state => state.theme);

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

    return <>{children}</>;
};

const App: React.FC = () => {
    const { isAuthenticated, isLoading, user } = useUserStore();

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Auth Routes */}
                    <Route path="/auth/*" element={!isAuthenticated ? <OnboardingFlow /> : <Navigate to="/" />} />

                    {/* Protected Main App Routes */}
                    <Route path="/*" element={isAuthenticated ? <AppRoutes /> : <Navigate to="/auth/welcome" />} />
                    
                    {/* Admin Routes */}
                     <Route path="/admin/*" element={isAuthenticated && user?.isAdmin ? <AdminRoutes /> : <Navigate to="/auth/welcome" />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

const AppRoutes = () => (
    <Routes>
        <Route element={<MainAppLayout />}>
            <Route index element={<DashboardScreen />} />
            <Route path="payments" element={<PaymentsScreen />} />
            <Route path="insurance" element={<InsuranceScreen />} />
            <Route path="invest" element={<InvestScreen />} />
            <Route path="savings" element={<SavingsScreen />} />
            <Route path="more" element={<MoreScreen />} />
        </Route>
        {/* Standalone screens outside main nav */}
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/send" element={<SendMoneyScreen />} />
        <Route path="/topup" element={<TopUpScreen />} />
        <Route path="/scan" element={<QRScannerScreen />} />
        <Route path="/assistant" element={<SmartAssistantScreen />} />
        <Route path="/security" element={<SecurityScreen />} />
        <Route path="/analytics" element={<AnalyticsScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />

        {/* PRO Feature Placeholders */}
        <Route path="/automation" element={<AutomationScreen />} />
        <Route path="/community" element={<CommunityScreen />} />
        <Route path="/crypto" element={<CryptoScreen />} />
        <Route path="/education" element={<EducationScreen />} />
        <Route path="/marketplace" element={<MarketplaceScreen />} />
        <Route path="/merchant" element={<MerchantDashboardScreen />} />
        <Route path="/wellness" element={<BioWellnessScreen />} />
        <Route path="/civic" element={<CivicScreen />} />
        <Route path="/developer" element={<DeveloperScreen />} />
        <Route path="/impact" element={<ImpactScreen />} />
        <Route path="/metaverse" element={<MetaverseScreen />} />
        <Route path="/advisor" element={<QuantumAdvisorScreen />} />
        <Route path="/remittance" element={<RemittanceScreen />} />
        <Route path="/gaming" element={<GamingScreen />} />
        <Route path="/network" element={<NetworkScreen />} />

        <Route path="*" element={<NotFoundScreen />} />
    </Routes>
);

const AdminRoutes = () => (
     <Routes>
        <Route path="login" element={<AdminLoginScreen />} />
        <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboardScreen />} />
            <Route path="users" element={<UserManagementScreen />} />
            <Route path="transactions" element={<TransactionManagementScreen />} />
            {/* ... other admin routes */}
        </Route>
        <Route index element={<Navigate to="dashboard" />} />
    </Routes>
);


export default App;
