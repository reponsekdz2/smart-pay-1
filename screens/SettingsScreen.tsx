import React from 'react';
import Header from '../components/Header';
import { ArrowLeft, Sun, Moon, Laptop, Wifi, WifiOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore';

const SettingsScreen: React.FC = () => {
    const navigate = useNavigate();
    const { theme, setTheme, isOffline, toggleOfflineMode } = useUserStore();

    const themeOptions = [
        { name: 'light', label: 'Light', icon: Sun },
        { name: 'dark', label: 'Dark', icon: Moon },
        { name: 'system', label: 'System', icon: Laptop },
    ];

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full flex flex-col">
            <Header
                title="Settings"
                leftAction={
                    <button onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                }
            />
            <main className="p-4 space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-textPrimary dark:text-white mb-2">Theme</h2>
                    <div className="grid grid-cols-3 gap-2 p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        {themeOptions.map(option => (
                            <button
                                key={option.name}
                                onClick={() => setTheme(option.name as any)}
                                className={`flex items-center justify-center space-x-2 py-2 rounded-md transition-colors text-sm font-medium ${
                                    theme === option.name
                                        ? 'bg-white dark:bg-gray-800 shadow text-primary'
                                        : 'text-textSecondary dark:text-gray-300 hover:bg-white/50'
                                }`}
                            >
                                <option.icon className="w-5 h-5" />
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-textPrimary dark:text-white mb-2">Connectivity</h2>
                     <div 
                        onClick={toggleOfflineMode} 
                        className="flex items-center justify-between p-4 bg-surface dark:bg-gray-800 rounded-lg cursor-pointer"
                    >
                        <div className="flex items-center">
                            {isOffline ? <WifiOff className="w-6 h-6 text-warning mr-4" /> : <Wifi className="w-6 h-6 text-success mr-4" />}
                            <div>
                                <p className="font-semibold text-textPrimary dark:text-white">Offline Mode</p>
                                <p className="text-sm text-textSecondary dark:text-gray-400">
                                    {isOffline ? 'Enabled. Transactions will be queued.' : 'Disabled. You are online.'}
                                </p>
                            </div>
                        </div>
                        <div className={`relative w-12 h-6 rounded-full transition-colors ${isOffline ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isOffline ? 'transform translate-x-6' : ''}`}></span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsScreen;