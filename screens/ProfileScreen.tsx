import React from 'react';
import { ChevronRight, User, Globe, Bell, Shield, HelpCircle, LogOut, CheckCircle, Mail, MapPin, Edit, Share, QrCode, Lock } from 'lucide-react';
import { useUserStore } from '../hooks/useUserStore';

const InfoRow: React.FC<{ icon: React.ElementType; label: string, value: string }> = ({ icon: Icon, label, value }) => (
    <div className="flex items-center p-4">
        <Icon className="w-6 h-6 text-textSecondary mr-4" />
        <div className="flex-grow">
            <p className="text-sm text-textSecondary">{label}</p>
            <p className="font-medium text-textPrimary">{value}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
);

const Stat: React.FC<{ value: string | number, label: string }> = ({ value, label }) => (
    <div className="text-center">
        <p className="text-lg font-bold text-textPrimary">{value}</p>
        <p className="text-sm text-textSecondary">{label}</p>
    </div>
);

const QuickActionButton: React.FC<{ icon: React.ElementType, label: string }> = ({ icon: Icon, label }) => (
    <button className="flex flex-col items-center space-y-1 text-primary hover:text-primaryDark">
        <div className="bg-primaryLight p-3 rounded-full">
            <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold">{label}</span>
    </button>
);


const ProfileScreen: React.FC = () => {
    const { user, logout } = useUserStore();

    return (
        <div className="bg-background min-h-full">
            <div className="bg-surface">
                {/* Cover Photo */}
                <div className="h-32 bg-gray-200 relative">
                    <img src={`https://picsum.photos/seed/${user.phone}/400/200`} className="w-full h-full object-cover" alt="Cover"/>
                    <button className="absolute bottom-2 right-2 bg-black/50 text-white p-1.5 rounded-full"><Edit className="w-4 h-4"/></button>
                </div>

                {/* Profile Header */}
                <div className="p-4 relative">
                    <div className="absolute -top-12">
                         <img
                            src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`}
                            alt="User Profile"
                            className="w-24 h-24 rounded-full border-4 border-surface bg-gray-200"
                        />
                    </div>
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-textPrimary flex items-center">{user.name} {user.verified && <CheckCircle className="w-5 h-5 text-primary ml-2" />}</h2>
                        <p className="text-textSecondary mt-1">{user.bio}</p>
                    </div>
                </div>

                <div className="px-4 pb-4 border-b border-gray-200">
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
                <div className="bg-surface rounded-lg overflow-hidden">
                    <h3 className="p-4 font-bold text-textPrimary text-lg">Personal Information</h3>
                    <div className="divide-y divide-gray-100">
                        <InfoRow icon={User} label="National ID" value="119908********12" />
                        <InfoRow icon={Mail} label="Email" value={user.email} />
                        <InfoRow icon={MapPin} label="Address" value="Kigali, Rwanda" />
                    </div>
                </div>
                
                <div className="bg-surface rounded-lg overflow-hidden">
                    <h3 className="p-4 font-bold text-textPrimary text-lg">Preferences</h3>
                     <div className="divide-y divide-gray-100">
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