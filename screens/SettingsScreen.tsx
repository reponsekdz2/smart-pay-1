
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useUserStore } from '../hooks/useUserStore.ts';
import { ArrowLeft, LogOut } from 'lucide-react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Card from '../components/Card';

const SettingsScreen: React.FC = () => {
    const navigate = useNavigate();
    const logout = useUserStore(state => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header 
                title="Settings"
                leftAction={<button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>}
            />
            <main className="p-4 space-y-4">
                <Card>
                    <ThemeSwitcher />
                </Card>
                 <Card>
                    <button onClick={handleLogout} className="w-full flex items-center justify-between text-error font-semibold">
                       <span>Log Out</span>
                       <LogOut className="w-5 h-5" />
                    </button>
                </Card>
            </main>
        </div>
    );
};

export default SettingsScreen;
