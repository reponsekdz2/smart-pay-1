import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import { apiGateway } from '../services/apiGateway';
import type { BusinessIntelligence } from '../types';
import { BarChart, Users, DollarSign, AlertTriangle } from 'lucide-react';

const MetricCard: React.FC<{ icon: React.ElementType; title: string; value: string | number; }> = ({ icon: Icon, title, value }) => (
    <Card>
        <div className="flex items-center">
            <Icon className="w-8 h-8 text-primary mr-4" />
            <div>
                <p className="text-sm text-textSecondary dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-textPrimary dark:text-white">{value}</p>
            </div>
        </div>
    </Card>
);

const AdminDashboard: React.FC = () => {
    const [biData, setBiData] = useState<BusinessIntelligence | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGateway.admin.getBusinessIntelligence();
                if (response.success) {
                    setBiData(response.data);
                }
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    if (error) {
        return <div className="p-4 text-error">Error: {error}</div>;
    }

    if (!biData) {
        return <div className="p-4">Loading Admin Data...</div>;
    }

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Admin Dashboard" />
            <main className="p-4 space-y-6">
                <h1 className="text-xl font-bold text-textPrimary dark:text-white">Business Intelligence</h1>
                <div className="grid grid-cols-2 gap-4">
                    <MetricCard 
                        icon={BarChart} 
                        title="Transaction Volume (Today)" 
                        value={`${biData.dailyTransactionVolume.toLocaleString()} RWF`}
                    />
                    <MetricCard 
                        icon={Users} 
                        title="New Signups (Today)" 
                        value={biData.newUserSignups}
                    />
                     <MetricCard 
                        icon={DollarSign} 
                        title="Total Revenue (Fees)" 
                        value={`${biData.totalRevenue.toLocaleString()} RWF`}
                    />
                     <MetricCard 
                        icon={AlertTriangle} 
                        title="High-Risk Transactions" 
                        value={biData.highRiskTransactions}
                    />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
