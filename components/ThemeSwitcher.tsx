
import React from 'react';
// FIX: Add .ts extension to file path
import { useUserStore } from '../hooks/useUserStore.ts';
import { Sun, Moon, Laptop } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useUserStore();

    const themeOptions = [
        { name: 'light', label: 'Light', icon: Sun },
        { name: 'dark', label: 'Dark', icon: Moon },
        { name: 'system', label: 'System', icon: Laptop },
    ];

    return (
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
    );
};

export default ThemeSwitcher;
