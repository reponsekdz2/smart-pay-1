
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, List } from 'lucide-react';

const AdminLayout: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/users', label: 'Users', icon: Users },
        { path: '/admin/transactions', label: 'Transactions', icon: List },
    ];

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
                </div>
                <nav>
                    <ul>
                        {navItems.map(item => (
                             <li key={item.path}>
                                <Link 
                                    to={item.path}
                                    className={`flex items-center p-4 text-textPrimary dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === item.path ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                                >
                                    <item.icon className="w-6 h-6 mr-3" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
