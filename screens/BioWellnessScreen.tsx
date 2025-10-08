import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { ArrowLeft, HeartPulse, Dna, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockStressSpendingData = [
  { name: 'Mon', stress: 60, spending: 8000 },
  { name: 'Tue', stress: 40, spending: 5000 },
  { name: 'Wed', stress: 75, spending: 12000 },
  { name: 'Thu', stress: 50, spending: 6000 },
  { name: 'Fri', stress: 85, spending: 15000 },
  { name: 'Sat', stress: 30, spending: 20000 },
  { name: 'Sun', stress: 20, spending: 4000 },
];

const BioWellnessScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Bio-Financial Wellness" leftAction={<button onClick={() => navigate(-1)}><ArrowLeft/></button>} />
            <div className="p-4 space-y-6">
                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <HeartPulse className="w-5 h-5 mr-2 text-primary"/>
                        Health-Wealth Analytics
                    </h2>
                    <Card>
                        <h3 className="font-semibold text-textPrimary dark:text-gray-100">Stress & Spending Correlation</h3>
                        <p className="text-xs text-textSecondary dark:text-gray-400 mb-4">Higher stress levels often lead to impulsive spending. (Simulated Data)</p>
                        <div style={{ width: '100%', height: 200 }}>
                            <ResponsiveContainer>
                                <AreaChart data={mockStressSpendingData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)"/>
                                    <XAxis dataKey="name" tick={{ fill: 'gray', fontSize: 12 }} />
                                    <YAxis yAxisId="left" stroke="#8884d8" tick={{ fill: 'gray', fontSize: 12 }} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tick={{ fill: 'gray', fontSize: 12 }} />
                                    <Tooltip/>
                                    <Legend/>
                                    <Area yAxisId="left" type="monotone" dataKey="stress" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5}/>
                                    <Area yAxisId="right" type="monotone" dataKey="spending" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5}/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Dna className="w-5 h-5 mr-2 text-primary"/>
                        DNA-Based Financial Planning
                    </h2>
                     <Card>
                        <h3 className="font-semibold text-textPrimary dark:text-gray-100">Genetic Financial Profiling</h3>
                        <p className="text-sm text-textSecondary dark:text-gray-400 mt-2">
                           (Concept) By analyzing genetic markers associated with personality traits, we can create a hyper-personalized investment strategy that aligns with your innate risk tolerance and decision-making style.
                        </p>
                         <button className="w-full text-center text-primary font-semibold pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                            Learn More
                        </button>
                    </Card>
                </div>
                 <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <BrainCircuit className="w-5 h-5 mr-2 text-primary"/>
                        Neuro-Financial Optimization
                    </h2>
                     <Card>
                        <h3 className="font-semibold text-textPrimary dark:text-gray-100">Brain-Computer Interface (BCI)</h3>
                         <p className="text-sm text-textSecondary dark:text-gray-400 mt-2">
                           (Concept) Imagine a future where your wearable BCI helps you make better financial decisions by detecting emotional bias or lapses in focus during trading, ensuring you always act with a clear mind.
                        </p>
                        <button className="w-full text-center text-primary font-semibold pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                            Explore the Future
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BioWellnessScreen;
