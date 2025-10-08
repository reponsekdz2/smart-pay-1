import React from 'react';
import { ChevronRight, User, Globe, Bell, Shield, HelpCircle, LogOut, CheckCircle, Mail, MapPin, Edit, Share, QrCode, Lock, Settings, Store, Moon, Sun, Monitor } from 'lucide-react';
import { useUserStore } from '../hooks/useUserStore';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';

const InfoRow: React.FC<{ icon: React.ElementType; label: string, value: string; onClick?: () => void; }> = ({ icon: Icon, label, value, onClick }) => (
    <button onClick={onClick} className="flex items-center p-4 text-textPrimary dark:text-gray-200 w-full text-left">
        <Icon className="w-6 h-6 text-textSecondary dark:text-gray-400 mr-4" />
        <div className="flex-grow">
            <p className="text-sm text-textSecondary dark:text-gray-400">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
);

const Stat: React.FC<{ value: string | number, label: string }> = ({ value, label }) => (
    <div className="text-center">
        <p className="text-lg font-bold text-textPrimary dark:text-gray-100">{value}</p>
        <p className="text-sm text-textSecondary dark:text-gray-400">{label}</p>
    </div>
);

const QuickActionButton: React.FC<{ icon: React.ElementType, label: string }> = ({ icon: Icon, label }) => (
    <button className="flex flex-col items-center space-y-1 text-primary hover:text-primaryDark">
        <div className="bg-primaryLight dark:bg-primary/20 p-3 rounded-full">
            <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold">{label}</span>
    </button>
);


const ProfileScreen: React.FC = () => {
    const { user, logout, isMerchantView, toggleMerchantView } = useUserStore();
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full pb-6">
            <div className="bg-surface dark:bg-gray-800">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 relative">
                    <img src={`https://picsum.photos/seed/${user.phone}/400/200`} className="w-full h-full object-cover" alt="Cover"/>
                    <button className="absolute bottom-2 right-2 bg-black/50 text-white p-1.5 rounded-full"><Edit className="w-4 h-4"/></button>
                </div>

                <div className="p-4 relative">
                    <div className="absolute -top-12">
                         <img
                            src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`}
                            alt="User Profile"
                            className="w-24 h-24 rounded-full border-4 border-surface dark:border-gray-800 bg-gray-200"
                        />
                    </div>
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-textPrimary dark:text-white flex items-center">{user.name} {user.verified && <CheckCircle className="w-5 h-5 text-primary ml-2" />}</h2>
                        <p className="text-textSecondary dark:text-gray-400 mt-1">{user.bio}</p>
                    </div>
                </div>

                <div className="px-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-3 gap-4">
                        <Stat value={user.connections} label="Connections" />
                        <Stat value={user.transactions.length} label="Transactions" />
                        <Stat value={user.trustScore} label="Trust Score" />
                    </div>
                </div>
                
                 <div className="p-4 flex justify-around">
                    <QuickActionButton icon={Edit} label="Edit Profile" />
                    <QuickActionButton icon={Share} label="Share" />
                    <QuickActionButton icon={QrCode} label="My QR" />
                    <QuickActionButton icon={Lock} label="Privacy" />
                </div>
            </div>

            <div className="p-4 space-y-4">
                 <div className="bg-surface dark:bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <Store className="w-6 h-6 text-primary mr-3" />
                        <span className="font-bold text-textPrimary dark:text-white">Merchant View</span>
                    </div>
                    <button onClick={toggleMerchantView} className={`w-14 h-8 rounded-full flex items-center transition-colors ${isMerchantView ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                        <span className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${isMerchantView ? 'translate-x-7' : 'translate-x-1'}`}></span>
                    </button>
                </div>

                <div className="bg-surface dark:bg-gray-800 rounded-lg overflow-hidden">
                    <h3 className="p-4 font-bold text-textPrimary dark:text-white text-lg">App Settings</h3>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        <div className="p-4">
                            <label className="text-sm text-textSecondary dark:text-gray-400">Theme</label>
                            <ThemeSwitcher />
                        </div>
                        <InfoRow icon={Shield} label="Security" value="Quantum Encrypted" onClick={() => navigate('/security')} />
                        <InfoRow icon={Bell} label="Notifications" value="Enabled" />
                        <InfoRow icon={Globe} label="Language" value="English" />
                    </div>
                </div>

                 <button 
                    onClick={logout}
                    className="flex items-center justify-center w-full p-3 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span className="font-bold">Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileScreen;