import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

interface PieChartData {
    name: string;
    value: number;
    fill: string;
}

interface PortfolioDonutChartProps {
    data: PieChartData[];
}

const PortfolioDonutChart: React.FC<PortfolioDonutChartProps> = ({ data }) => {
    const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={5}
                        cornerRadius={8}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                        ))}
                         <Label
                            value={`${totalValue.toLocaleString()} RWF`}
                            position="center"
                            dy={-10}
                            className="text-2xl font-bold fill-textPrimary"
                        />
                         <Label
                            value="Total Value"
                            position="center"
                            dy={15}
                            className="text-sm fill-textSecondary"
                        />
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()} RWF`} />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PortfolioDonutChart;