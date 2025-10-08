import React from 'react';
import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
    path: string;
    icon: LucideIcon;
    label: string;
}

interface BottomNavProps {
    items: NavItem[];
}

const BottomNav: React.FC<BottomNavProps> = ({ items }) => {
    return (
        <div className="w-full bg-surface dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <nav className="flex justify-around items-center h-16">
                {items.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end // Use `end` for the home route to avoid matching all sub-routes
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full text-sm transition-colors duration-200 ${
                                isActive ? 'text-primary' : 'text-textSecondary dark:text-gray-400 hover:text-primary'
                            }`
                        }
                    >
                        <item.icon className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default BottomNav;
