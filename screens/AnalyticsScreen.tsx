import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { FinancialHealthChart } from '../components/charts/FinancialHealthChart';
import { SpendingByCategoryChart, IncomeExpenseChart } from '../components/charts/FinancialCharts.tsx';
import { apiGateway } from '../services/apiGateway';
import { useUserStore } from '../hooks/useUserStore';
import type { FinancialInsights } from '../types';

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
                    setInsights(res.data!);
                }
            } catch (err) {
                console.error("Failed to fetch insights", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInsights();
    }, [user]);

    const financialHealthScore = insights ? Math.max(0, Math.round(insights.savingsRate)) : 0;

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header
                title="Financial Analytics"
                leftAction={<button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>}
            />
            <main className="p-4 space-y-4">
                {isLoading ? (
                    <p className="text-center text-textSecondary dark:text-gray-400">Loading insights...</p>
                ) : !insights ? (
                     <p className="text-center text-textSecondary dark:text-gray-400">Could not load insights.</p>
                ) : (
                    <>
                        <Card>
                            <h2 className="text-lg font-bold text-textPrimary dark:text-white mb-2">Financial Health</h2>
                            <div className="h-48">
                                <FinancialHealthChart score={financialHealthScore} />
                            </div>
                        </Card>
                         <Card>
                            <h2 className="text-lg font-bold text-textPrimary dark:text-white mb-2">Spending by Category</h2>
                            <div className="h-64">
                                <SpendingByCategoryChart data={insights.spendingByCategory} />
                            </div>
                        </Card>
                        <Card>
                            <h2 className="text-lg font-bold text-textPrimary dark:text-white mb-2">Income vs. Expense</h2>
                             <div className="h-64">
                                <IncomeExpenseChart data={insights.incomeVsExpense} />
                            </div>
                        </Card>
                    </>
                )}
            </main>
        </div>
    );
};

export default AnalyticsScreen;
