import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { LayoutDashboard, BarChart2, ShieldCheck, PiggyBank, MoreHorizontal } from 'lucide-react';
// FIX: Add .ts extension to file paths
import { useUserStore } from '../hooks/useUserStore.ts';
import { notificationService } from '../services/notificationService.ts';
import type { NotificationPayload } from '../types.ts';

const MainAppLayout: React.FC = () => {
    const { user } = useUserStore();

    React.useEffect(() => {
        const handleNotification = (event: Event) => {
            const customEvent = event as CustomEvent<Omit<NotificationPayload, 'userId'>>;
            // In a real app with websockets, you'd check if the notification is for the current user.
            // For this simulation, we just show it.
            alert(`Notification: ${customEvent.detail.message}`);
        };

        notificationService.addEventListener('notify', handleNotification);
        return () => {
            notificationService.removeEventListener('notify', handleNotification);
        };
    }, [user]);

    const navItems = [
        { path: '/', label: 'Home', icon: LayoutDashboard },
        { path: '/invest', label: 'Invest', icon: BarChart2 },
        { path: '/insurance', label: 'Insurance', icon: ShieldCheck },
        { path: '/savings', label: 'Savings', icon: PiggyBank },
        { path: '/more', label: 'More', icon: MoreHorizontal },
    ];

    return (
        <div className="flex flex-col h-full max-w-md mx-auto bg-background dark:bg-gray-900 font-sans shadow-2xl">
            <div className="flex-grow overflow-y-auto">
                <Outlet />
            </div>
            <BottomNav items={navItems} />
        </div>
    );
};

export default MainAppLayout;