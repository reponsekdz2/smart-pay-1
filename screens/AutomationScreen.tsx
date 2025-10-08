import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Zap, Bot, Repeat, Bell, TrendingUp, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RuleCard: React.FC<{ icon: React.ElementType; title: string; description: string; active: boolean; }> = ({ icon: Icon, title, description, active }) => (
    <div className="flex items-center p-4 bg-surface dark:bg-gray-800 rounded-lg">
        <Icon className="w-8 h-8 text-primary mr-4" />
        <div className="flex-grow">
            <h3 className="font-semibold text-textPrimary dark:text-gray-100">{title}</h3>
            <p className="text-sm text-textSecondary dark:text-gray-400">{description}</p>
        </div>
        <div className={`w-12 h-6 rounded-full flex items-center transition-colors ${active ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <span className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${active ? 'translate-x-7' : 'translate-x-1'}`}></span>
        </div>
    </div>
);

const AutomationScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Automation Engine" leftAction={<button onClick={() => navigate(-1)}><ArrowLeft/></button>} />
            <div className="p-4 space-y-6">
                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-primary"/>
                        Your Smart Rules
                    </h2>
                    <div className="space-y-3">
                        <RuleCard 
                            icon={Repeat}
                            title="Auto-Save Round-Up"
                            description="Round up transactions to the nearest 100 RWF and save the difference."
                            active={true}
                        />
                         <RuleCard 
                            icon={Bell}
                            title="Bill Payment Reminder"
                            description="Get a reminder 3 days before a bill is due."
                            active={true}
                        />
                         <RuleCard 
                            icon={TrendingUp}
                            title="Investment on Payday"
                            description="Automatically invest 10% of your salary."
                            active={false}
                        />
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Bot className="w-5 h-5 mr-2 text-primary"/>
                        AI-Powered Automation
                    </h2>
                    <Card>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-textPrimary dark:text-gray-100">Spending Optimizer</h3>
                                    <p className="text-sm text-textSecondary dark:text-gray-400">Let AI suggest changes to improve your budget.</p>
                                </div>
                                <button className="text-sm font-semibold text-primary">Analyze</button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-textPrimary dark:text-gray-100">Investment Auto-Balancer</h3>
                                    <p className="text-sm text-textSecondary dark:text-gray-400">Maintain your target portfolio allocation automatically.</p>
                                </div>
                                 <button className="text-sm font-semibold text-primary">Enable</button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-textPrimary dark:text-gray-100">Debt Repayment Optimizer</h3>
                                    <p className="text-sm text-textSecondary dark:text-gray-400">Pay down debt using the Avalanche method.</p>
                                </div>
                                 <button className="text-sm font-semibold text-primary">Setup</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AutomationScreen;
