import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useUserStore } from '../hooks/useUserStore';
import { ChevronRight, Settings, Users, LogOut, Shield } from 'lucide-react';

interface MoreLinkProps {
    icon: React.ElementType;
    title: string;
    to: string;
}

const MoreLink: React.FC<MoreLinkProps> = ({ icon: Icon, title, to }) => (
    <Link to={to} className="flex items-center p-4 bg-surface dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <Icon className="w-6 h-6 text-primary mr-4" />
        <span className="flex-grow font-semibold text-textPrimary dark:text-white">{title}</span>
        <ChevronRight className="w-5 h-5 text-textTertiary dark:text-gray-500" />
    </Link>
);

const MoreScreen: React.FC = () => {
    const { user, logout } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth/welcome', { replace: true });
    };

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="More Options" />
            <main className="p-4 space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-surface dark:bg-gray-800 rounded-lg">
                    <img
                        src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.name}`}
                        alt="User Profile"
                        className="w-16 h-16 rounded-full bg-gray-200"
                    />
                    <div>
                        <p className="text-xl font-bold text-textPrimary dark:text-gray-100">{user?.name}</p>
                        <p className="text-md text-textSecondary dark:text-gray-400">{user?.phone}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <MoreLink icon={Settings} title="App Settings" to="/settings" />
                    <MoreLink icon={Users} title="My Network" to="/network" />
                    <MoreLink icon={Shield} title="Security Center" to="/security" />
                </div>
                
                 <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center p-4 bg-surface dark:bg-gray-800 rounded-lg text-error font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    <LogOut className="w-6 h-6 mr-2"/>
                    Log Out
                </button>
            </main>
        </div>
    );
};

export default MoreScreen;