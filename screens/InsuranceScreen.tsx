import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { mockPolicies } from '../constants';
import { Shield, Car, Home, Heart, PlusCircle, Video, FileScan, History } from 'lucide-react';
import type { InsurancePolicy, HealthClaim } from '../types';
import { useUserStore } from '../hooks/useUserStore';

const PolicyItem: React.FC<{ policy: InsurancePolicy }> = ({ policy }) => (
    <div className="flex items-center p-3 bg-surface dark:bg-gray-700/50 rounded-lg mb-2">
        <div className="p-2 bg-primaryLight text-primary rounded-full mr-3">
            <policy.icon className="w-5 h-5" />
        </div>
        <div className="flex-grow">
            <p className="font-semibold text-textPrimary dark:text-gray-100">{policy.name}</p>
            <p className="text-xs text-textSecondary dark:text-gray-400">{policy.coverage}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${policy.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'}`}>
            {policy.status}
        </span>
    </div>
);

const InsuranceCategoryCard: React.FC<{ icon: React.ElementType, title: string, description: string }> = ({ icon: Icon, title, description }) => (
    <Card className="flex items-center hover:shadow-lg transition-shadow cursor-pointer">
        <Icon className="w-10 h-10 text-primary mr-4" />
        <div>
            <h3 className="font-bold text-textPrimary dark:text-gray-100">{title}</h3>
            <p className="text-sm text-textSecondary dark:text-gray-400">{description}</p>
        </div>
    </Card>
);

const ClaimItem: React.FC<{ claim: HealthClaim }> = ({ claim }) => {
    const statusClasses = {
        Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
        Approved: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        Rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    };
    return (
        <div className="flex items-center justify-between p-2">
            <div>
                <p className="font-medium text-textPrimary dark:text-gray-200">{claim.description}</p>
                <p className="text-xs text-textSecondary dark:text-gray-400">{new Date(claim.date).toLocaleDateString()}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusClasses[claim.status]}`}>
                {claim.status}
            </span>
        </div>
    )
};

const InsuranceScreen: React.FC = () => {
    const { claims } = useUserStore();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Insurance Hub" />

            <div className="p-4 space-y-6">
                <Card className="bg-primaryDark text-white">
                    <h2 className="font-bold text-lg">Your Policies</h2>
                    <p className="text-sm opacity-80 mb-4">You have {mockPolicies.filter(p => p.status === 'Active').length} active policies.</p>
                    <div className="space-y-2">
                        {mockPolicies.map(policy => <PolicyItem key={policy.id} policy={policy} />)}
                    </div>
                </Card>
                
                <Card>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3">Health Hub</h2>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <button className="p-2 rounded-lg hover:bg-primaryLight dark:hover:bg-primary/20">
                            <Video className="w-8 h-8 mx-auto text-primary"/>
                            <span className="text-xs font-medium text-textPrimary dark:text-gray-200 mt-1">Telemedicine</span>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-primaryLight dark:hover:bg-primary/20">
                            <FileScan className="w-8 h-8 mx-auto text-primary"/>
                            <span className="text-xs font-medium text-textPrimary dark:text-gray-200 mt-1">Submit Claim</span>
                        </button>
                         <button className="p-2 rounded-lg hover:bg-primaryLight dark:hover:bg-primary/20">
                            <History className="w-8 h-8 mx-auto text-primary"/>
                            <span className="text-xs font-medium text-textPrimary dark:text-gray-200 mt-1">Claim History</span>
                        </button>
                    </div>
                    {claims.length > 0 && <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-sm text-textPrimary dark:text-gray-100 mb-2">Recent Claims</h3>
                        <div className="space-y-1">
                            {claims.slice(0, 2).map(claim => <ClaimItem key={claim.id} claim={claim} />)}
                        </div>
                    </div>}
                </Card>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3">Explore Marketplace</h2>
                    <div className="space-y-3">
                        <InsuranceCategoryCard icon={Shield} title="Account Protection" description="Insure your balance and transactions." />
                        <InsuranceCategoryCard icon={Car} title="Vehicle Insurance" description="Get instant coverage for your car." />
                        <InsuranceCategoryCard icon={Home} title="Property Insurance" description="Protect your home and belongings." />
                        <InsuranceCategoryCard icon={Heart} title="Health Insurance" description="Cover your family's medical needs." />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsuranceScreen;
