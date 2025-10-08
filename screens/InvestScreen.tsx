import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import PortfolioDonutChart from '../components/charts/PortfolioDonutChart';
import { mockInvestmentGoals, investmentPortfolioData } from '../constants';
import type { InvestmentGoal } from '../types';

const GoalTracker: React.FC<{ goal: InvestmentGoal }> = ({ goal }) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    return (
        <div>
            <div className="flex justify-between items-baseline mb-1">
                <span className="font-semibold text-textPrimary">{goal.name}</span>
                <span className="text-sm font-medium text-textSecondary">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full" style={{ width: `${progress}%`, backgroundColor: goal.color }}></div>
            </div>
            <p className="text-xs text-right mt-1 text-textSecondary">
                {goal.currentAmount.toLocaleString()} / {goal.targetAmount.toLocaleString()} RWF
            </p>
        </div>
    );
};

const updatedInvestmentGoals = mockInvestmentGoals.map(goal => {
    if (goal.id === '1') goal.color = '#1877F2'; // primary
    if (goal.id === '2') goal.color = '#42B72A'; // success
    if (goal.id === '3') goal.color = '#166FE5'; // primaryDark
    return goal;
});

const updatedPortfolioData = investmentPortfolioData.map(item => {
    if (item.name.includes('Stocks')) item.fill = '#1877F2';
    if (item.name.includes('Bonds')) item.fill = '#166FE5';
    if (item.name.includes('Equities')) item.fill = '#42B72A';
    if (item.name.includes('Savings')) item.fill = '#F7B928';
    return item;
});


const InvestScreen: React.FC = () => {
    return (
        <div className="bg-background min-h-full">
            <Header title="Investments & Savings" />

            <div className="p-4 space-y-6">
                <Card>
                    <h2 className="font-bold text-lg text-textPrimary mb-2">Investment Portfolio</h2>
                    <PortfolioDonutChart data={updatedPortfolioData} />
                </Card>

                <Card>
                    <h2 className="font-bold text-lg text-textPrimary mb-4">Savings Goals</h2>
                    <div className="space-y-4">
                        {updatedInvestmentGoals.map(goal => (
                            <GoalTracker key={goal.id} goal={goal} />
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default InvestScreen;