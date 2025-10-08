
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { apiGateway } from '../services/apiGateway';
import { useUserStore } from '../hooks/useUserStore';
import type { InsurancePolicy } from '../types';
import { ShieldCheck, HeartPulse, Car, Home as HomeIcon } from 'lucide-react';

const PolicyCard: React.FC<{ policy: InsurancePolicy }> = ({ policy }) => {
    const icons = {
        Health: <HeartPulse className="w-8 h-8 text-white" />,
        Auto: <Car className="w-8 h-8 text-white" />,
        Home: <HomeIcon className="w-8 h-8 text-white" />,
        Life: <ShieldCheck className="w-8 h-8 text-white" />
    };

    return (
        <Card className="flex items-start space-x-4">
            <div className="p-3 bg-primary rounded-lg">{icons[policy.type]}</div>
            <div className="flex-grow">
                <p className="font-bold text-textPrimary dark:text-white">{policy.type} Insurance</p>
                <p className="text-sm text-textSecondary dark:text-gray-400">Provider: {policy.provider}</p>
                <p className="text-sm text-textSecondary dark:text-gray-400">Premium: {policy.premium.toLocaleString()} RWF/month</p>
                <span className="text-xs font-semibold bg-success/20 text-success px-2 py-0.5 rounded-full">{policy.status}</span>
            </div>
            <div className="text-right">
                <p className="text-sm text-textSecondary dark:text-gray-400">Coverage</p>
                <p className="font-bold text-lg text-textPrimary dark:text-white">{policy.coverage.toLocaleString()} RWF</p>
            </div>
        </Card>
    );
};


const InsuranceScreen: React.FC = () => {
    const { user } = useUserStore();
    const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPolicies = async () => {
            if (!user) return;
            try {
                setIsLoading(true);
                const res = await apiGateway.insurance.getPoliciesByUserId(user.id);
                if (res.success) {
                    setPolicies(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch policies", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPolicies();
    }, [user]);

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="My Insurance" />
            <main className="p-4 space-y-4">
                <h1 className="text-xl font-bold text-textPrimary dark:text-white">Active Policies</h1>
                {isLoading ? (
                    <p className="text-center text-textSecondary dark:text-gray-400">Loading policies...</p>
                ) : policies.length > 0 ? (
                    policies.map(policy => <PolicyCard key={policy.id} policy={policy} />)
                ) : (
                    <p className="text-textSecondary dark:text-gray-400 text-center mt-8">You have no active insurance policies.</p>
                )}
                 <button className="w-full bg-primary text-white font-bold py-3 rounded-lg mt-4">
                    Browse New Policies
                </button>
            </main>
        </div>
    );
};

export default InsuranceScreen;
