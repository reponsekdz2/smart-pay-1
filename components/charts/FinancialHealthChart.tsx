
import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface FinancialHealthChartProps {
    score: number; // Score from 0 to 100
}

export const FinancialHealthChart: React.FC<FinancialHealthChartProps> = ({ score }) => {
    const data = [{ name: 'Health Score', value: score, fill: '#82ca9d' }];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                barSize={20}
                data={data}
                startAngle={90}
                endAngle={-270}
            >
                <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                />
                <RadialBar
                    background
                    dataKey="value"
                    angleAxisId={0}
                    
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-4xl font-bold fill-current text-textPrimary dark:text-white"
                >
                    {score}
                </text>
                 <text
                    x="50%"
                    y="65%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm fill-current text-textSecondary dark:text-gray-400"
                >
                    / 100
                </text>
            </RadialBarChart>
        </ResponsiveContainer>
    );
};
