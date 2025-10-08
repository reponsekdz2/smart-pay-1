import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart2, Settings, Shield, Code } from 'lucide-react';

const AdminLayout: React.FC = () => {
    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/users', label: 'Users', icon: Users },
        { path: '/admin/transactions', label: 'Transactions', icon: BarChart2 },
        { path: '/admin/security', label: 'Security', icon: Shield },
        { path: '/admin/settings', label: 'Settings', icon: Settings },
        { path: '/admin/developer', label: 'Developer', icon: Code },
    ];
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 text-2xl font-bold border-b border-gray-700">Smart Pay Admin</div>
                <nav className="flex-1 p-2 space-y-1">
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 rounded-md space-x-3 transition-colors ${
                                isActive ? 'bg-primary text-white' : 'hover:bg-gray-700'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto bg-background p-4">
                     <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
