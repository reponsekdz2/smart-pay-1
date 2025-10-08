
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore';
import { apiGateway } from '../services/apiGateway';
import type { FinancialInsights } from '../types';
import Card from '../components/Card';
import { SpendingPieChart, IncomeExpenseBarChart } from '../components/charts/FinancialCharts';

const AnalyticsScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [insights, setInsights] = useState<FinancialInsights | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            if (!user) return;
            try {
                const res = await apiGateway.analytics.getFinancialInsights(user.id);
                if (res.success) {
                    setInsights(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch insights", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInsights();
    }, [user]);

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full flex flex-col">
            <Header
                title="Financial Analytics"
                leftAction={<button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>}
            />
            <main className="p-4 space-y-6">
                {isLoading ? (
                    <p className="text-center text-textSecondary dark:text-gray-400">Loading insights...</p>
                ) : insights ? (
                    <>
                        <Card>
                            <h2 className="text-lg font-bold text-textPrimary dark:text-white mb-2">Spending By Category</h2>
                            <div className="h-64">
                                <SpendingPieChart data={insights.spendingByCategory} />
                            </div>
                        </Card>
                        <Card>
                            <h2 className="text-lg font-bold text-textPrimary dark:text-white mb-2">Income vs. Expense</h2>
                             <div className="h-64">
                                <IncomeExpenseBarChart data={insights.incomeVsExpense} />
                            </div>
                        </Card>
                         <Card>
                            <h2 className="text-lg font-bold text-textPrimary dark:text-white">Savings Rate</h2>
                            <p className="text-3xl font-bold text-success">{insights.savingsRate.toFixed(1)}%</p>
                            <p className="text-sm text-textSecondary dark:text-gray-400">of your income this month was saved.</p>
                        </Card>
                    </>
                ) : (
                    <p className="text-center text-textSecondary dark:text-gray-400">Could not load financial insights.</p>
                )}
            </main>
        </div>
    );
};

export default AnalyticsScreen;
