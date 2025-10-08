import React from 'react';
import {
    BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

// --- Spending by Category Chart ---
interface SpendingChartProps {
    data: { name: string; value: number }[] | { category: string; amount: number }[];
}

const SPENDING_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

export const SpendingByCategoryChart: React.FC<SpendingChartProps> = ({ data }) => {
    const chartData = data.map(d => 'category' in d ? { name: d.category, value: d.amount } : d);
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SPENDING_COLORS[index % SPENDING_COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};


// --- Income vs Expense Chart ---
interface IncomeExpenseChartProps {
    data: { month: string; income: number; expense: number }[];
}

export const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" />
                <Bar dataKey="expense" fill="#ff6b6b" />
            </BarChart>
        </ResponsiveContainer>
    );
};
