
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { mockPolicies } from '../constants';
import { Shield, Car, Home, Heart, PlusCircle } from 'lucide-react';
import type { InsurancePolicy } from '../types';

const PolicyItem: React.FC<{ policy: InsurancePolicy }> = ({ policy }) => (
    <div className="flex items-center p-3 bg-surface rounded-lg mb-2">
        <div className="p-2 bg-primaryLight text-primary rounded-full mr-3">
            <policy.icon className="w-5 h-5" />
        </div>
        <div className="flex-grow">
            <p className="font-semibold text-textPrimary">{policy.name}</p>
            <p className="text-xs text-textSecondary">{policy.coverage}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${policy.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {policy.status}
        </span>
    </div>
);

const InsuranceCategoryCard: React.FC<{ icon: React.ElementType, title: string, description: string }> = ({ icon: Icon, title, description }) => (
    <Card className="flex items-center hover:shadow-lg transition-shadow cursor-pointer">
        <Icon className="w-10 h-10 text-primary mr-4" />
        <div>
            <h3 className="font-bold text-textPrimary">{title}</h3>
            <p className="text-sm text-textSecondary">{description}</p>
        </div>
    </Card>
);

const InsuranceScreen: React.FC = () => {
    return (
        <div className="bg-background min-h-full">
            <Header title="Insurance" />

            <div className="p-4 space-y-6">
                <Card className="bg-primaryDark text-white">
                    <h2 className="font-bold text-lg">Your Policies</h2>
                    <p className="text-sm opacity-80 mb-4">You have {mockPolicies.filter(p => p.status === 'Active').length} active policies.</p>
                    <div className="space-y-2">
                        {mockPolicies.map(policy => <PolicyItem key={policy.id} policy={policy} />)}
                    </div>
                </Card>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary mb-3">Explore Marketplace</h2>
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