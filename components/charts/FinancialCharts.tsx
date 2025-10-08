
import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface SpendingData {
    category: string;
    amount: number;
}

export const SpendingPieChart: React.FC<{ data: SpendingData[] }> = ({ data }) => {
    const chartData = data.map(item => ({ name: item.category, value: item.amount }));
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

interface IncomeExpenseData {
    month: string;
    income: number;
    expense: number;
}

export const IncomeExpenseBarChart: React.FC<{ data: IncomeExpenseData[] }> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" name="Income" />
                <Bar dataKey="expense" fill="#ff8042" name="Expense" />
            </BarChart>
        </ResponsiveContainer>
    );
};
