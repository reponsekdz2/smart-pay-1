import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface FinancialHealthChartProps {
    score: number;
}

const FinancialHealthChart: React.FC<FinancialHealthChartProps> = ({ score }) => {
    const data = [{ name: 'Health', value: score }];

    const scoreColor = score > 75 ? '#42B72A' : score > 50 ? '#F7B928' : '#FA383E';

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="90%"
                barSize={10}
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
                    cornerRadius={10}
                    angleAxisId={0}
                    fill={scoreColor}
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-xl font-bold"
                >
                    {`${score}`}
                </text>
                 <text
                    x="50%"
                    y="68%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-primaryLight text-xs font-medium"
                >
                    Score
                </text>
            </RadialBarChart>
        </ResponsiveContainer>
    );
};

export default FinancialHealthChart;