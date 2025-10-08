
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useUserStore } from '../hooks/useUserStore';
import { ArrowLeft, User, Mail, Phone, Edit } from 'lucide-react';
import Card from '../components/Card';

const ProfileScreen: React.FC = () => {
    const { user } = useUserStore();
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header 
                title="My Profile"
                leftAction={<button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>}
                rightAction={<button><Edit className="w-6 h-6" /></button>}
            />
            <main className="p-4 space-y-4">
                <div className="flex flex-col items-center">
                    <img
                        src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.name}`}
                        alt="User Profile"
                        className="w-24 h-24 rounded-full bg-gray-200 border-4 border-primary"
                    />
                    <h1 className="text-2xl font-bold mt-2 text-textPrimary dark:text-white">{user?.name}</h1>
                </div>

                <Card>
                    <h2 className="text-lg font-semibold mb-2 text-textPrimary dark:text-white">Contact Information</h2>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <Phone className="w-5 h-5 text-textSecondary dark:text-gray-400 mr-3" />
                            <span className="text-textPrimary dark:text-gray-200">{user?.phone}</span>
                        </div>
                        <div className="flex items-center">
                            <Mail className="w-5 h-5 text-textSecondary dark:text-gray-400 mr-3" />
                            <span className="text-textPrimary dark:text-gray-200">email_placeholder@smartpay.rw</span>
                        </div>
                    </div>
                </Card>
                 <Card>
                    <h2 className="text-lg font-semibold mb-2 text-textPrimary dark:text-white">Identity Information</h2>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <User className="w-5 h-5 text-textSecondary dark:text-gray-400 mr-3" />
                            <span className="text-textPrimary dark:text-gray-200">ID: {user?.nationalId}</span>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default ProfileScreen;
