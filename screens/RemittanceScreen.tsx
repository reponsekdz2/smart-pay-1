import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { ArrowLeft, Globe, Zap, Building, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RemittanceFeatureCard: React.FC<{ icon: React.ElementType, title: string, description: string }> = ({ icon: Icon, title, description }) => (
    <div className="flex items-start p-4 bg-surface dark:bg-gray-800 rounded-lg">
        <Icon className="w-8 h-8 text-primary mr-4 mt-1" />
        <div>
            <h3 className="font-semibold text-textPrimary dark:text-gray-100">{title}</h3>
            <p className="text-sm text-textSecondary dark:text-gray-400">{description}</p>
        </div>
    </div>
);

const RemittanceScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Global Remittance" leftAction={<button onClick={() => navigate(-1)}><ArrowLeft/></button>} />
            <div className="p-4 space-y-6">
                <Card className="bg-primary text-white">
                     <h2 className="font-bold text-lg">Send Money Across Borders</h2>
                    <p className="text-sm opacity-80 mb-4">Instantly, securely, and with ultra-low fees.</p>
                     <button className="w-full bg-white text-primary font-bold py-2 px-4 rounded-lg hover:bg-primaryLight transition-colors">
                        Start a Transfer
                    </button>
                </Card>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-primary"/>
                        Borderless Payment Features
                    </h2>
                    <div className="space-y-3">
                        <RemittanceFeatureCard
                            icon={Globe}
                            title="Blockchain Remittance"
                            description="Settle payments in seconds, not days, with fees as low as 0.1%. Access over 150 currency pairs."
                        />
                        <RemittanceFeatureCard
                            icon={Zap}
                            title="AI Exchange Optimization"
                            description="Our AI finds the absolute best exchange rate and timing for your transfer, maximizing what your recipient gets."
                        />
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Building className="w-5 h-5 mr-2 text-primary"/>
                        Diaspora Financial Hub
                    </h2>
                     <div className="space-y-3">
                        <RemittanceFeatureCard
                            icon={Home}
                            title="Remote Property Management"
                            description="Collect rent, coordinate maintenance, and manage your Rwandan properties from anywhere in the world."
                        />
                        <RemittanceFeatureCard
                            icon={Building}
                            title="Home-Country Investments"
                            description="Easily invest in curated Rwandan real estate, vetted local businesses, and government bonds."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemittanceScreen;