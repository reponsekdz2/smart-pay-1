
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from './hooks/useUserStore';

// Layouts
import MainAppLayout from './layouts/MainAppLayout';
import AdminLayout from './layouts/AdminLayout';

// Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingFlow from './screens/onboarding/OnboardingFlow';
import DashboardScreen from './screens/DashboardScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import InsuranceScreen from './screens/InsuranceScreen';
import InvestScreen from './screens/InvestScreen';
import SavingsScreen from './screens/SavingsScreen';
import MoreScreen from './screens/MoreScreen';
import SendMoneyScreen from './screens/SendMoneyScreen';
import TopUpScreen from './screens/TopUpScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import NetworkScreen from './screens/NetworkScreen';
import SettingsScreen from './screens/SettingsScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import SecurityScreen from './screens/SecurityScreen';

// Admin Screens
import AdminDashboard from './screens/AdminDashboard';
import AdminLoginScreen from './screens/admin/AdminLoginScreen';

const ProtectedRoute: React.FC = () => {
    const isAuthenticated = useUserStore(state => state.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/auth/welcome" replace />;
    }
    return <Outlet />;
};

const App: React.FC = () => {
    const { token, isLoading, isAuthenticated, rehydrate } = useUserStore();
    const theme = useUserStore(state => state.theme);

    useEffect(() => {
        rehydrate();
    }, [rehydrate]);

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

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Onboarding Routes */}
                <Route path="/auth/*" element={<OnboardingFlow />} />
                <Route path="/admin/login" element={<AdminLoginScreen />} />

                {/* Main App Routes (Protected) */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainAppLayout />}>
                        <Route path="/" element={<DashboardScreen />} />
                        <Route path="/dashboard" element={<DashboardScreen />} />
                        <Route path="/invest" element={<InvestScreen />} />
                        <Route path="/insurance" element={<InsuranceScreen />} />
                        <Route path="/savings" element={<SavingsScreen />} />
                        <Route path="/more" element={<MoreScreen />} />
                    </Route>
                    {/* Screens without bottom nav */}
                    <Route path="/send" element={<SendMoneyScreen />} />
                    <Route path="/topup" element={<TopUpScreen />} />
                    <Route path="/payments" element={<PaymentsScreen />} />
                    <Route path="/analytics" element={<AnalyticsScreen />} />
                    <Route path="/network" element={<NetworkScreen />} />
                    <Route path="/settings" element={<SettingsScreen />} />
                    <Route path="/security" element={<SecurityScreen />} />
                </Route>
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    {/* Add other admin routes here */}
                </Route>

                {/* Fallback Route */}
                <Route path="*" element={isAuthenticated ? <NotFoundScreen /> : <Navigate to="/auth/welcome" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
