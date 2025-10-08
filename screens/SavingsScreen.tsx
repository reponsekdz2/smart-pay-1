
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
// FIX: Add .ts extension to file paths
import { apiGateway } from '../services/apiGateway.ts';
import { useUserStore } from '../hooks/useUserStore.ts';
import type { SavingsGoal } from '../types.ts';
import { PiggyBank, Plus } from 'lucide-react';

const GoalCard: React.FC<{ goal: SavingsGoal }> = ({ goal }) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;

    return (
        <Card>
            <div className="flex justify-between items-center">
                <p className="font-bold text-lg text-textPrimary dark:text-white">{goal.name}</p>
                <PiggyBank className="w-6 h-6 text-primary" />
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="text-sm flex justify-between text-textSecondary dark:text-gray-400">
                <span>{goal.currentAmount.toLocaleString()} RWF</span>
                <span className="font-semibold">{goal.targetAmount.toLocaleString()} RWF</span>
            </div>
        </Card>
    );
}

const SavingsScreen: React.FC = () => {
    const { user } = useUserStore();
    const [goals, setGoals] = useState<SavingsGoal[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGoals = async () => {
            if (!user) return;
            try {
                const res = await apiGateway.savings.getGoalsByUserId(user.id);
                if (res.success && res.data) {
                    setGoals(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch savings goals", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGoals();
    }, [user]);


    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Savings Goals" />
            <main className="p-4 space-y-4">
                {isLoading ? (
                    <p className="text-center text-textSecondary dark:text-gray-400">Loading your goals...</p>
                ) : goals.length > 0 ? (
                    goals.map(goal => <GoalCard key={goal.id} goal={goal} />)
                ) : (
                    <p className="text-center text-textSecondary dark:text-gray-400">You have no savings goals yet.</p>
                )}

                <button className="w-full flex items-center justify-center space-x-2 bg-primary text-white font-bold py-3 rounded-lg mt-4">
                    <Plus className="w-5 h-5"/>
                    <span>Create New Goal</span>
                </button>
            </main>
        </div>
    );
};

export default SavingsScreen;
