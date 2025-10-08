import React from 'react';
import { useUserStore } from '../hooks/useUserStore';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useUserStore();

    const options = [
        { name: 'light', icon: Sun },
        { name: 'dark', icon: Moon },
        { name: 'system', icon: Monitor },
    ];

    return (
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-full mt-2">
            {options.map(option => (
                <button
                    key={option.name}
                    onClick={() => setTheme(option.name as 'light' | 'dark' | 'system')}
                    className={`flex-1 flex items-center justify-center capitalize p-2 rounded-full text-sm font-semibold transition-colors ${
                        theme === option.name 
                        ? 'bg-white dark:bg-gray-900 text-primary shadow' 
                        : 'text-textSecondary dark:text-gray-300'
                    }`}
                >
                    <option.icon className="w-4 h-4 mr-2" />
                    {option.name}
                </button>
            ))}
        </div>
    );
};

export default ThemeSwitcher;
