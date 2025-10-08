import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { ArrowLeft, Code, Layers, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlatformFeatureCard: React.FC<{ icon: React.ElementType, title: string, description: string }> = ({ icon: Icon, title, description }) => (
    <Card className="hover:shadow-lg transition-shadow">
        <Icon className="w-10 h-10 text-primary mb-3" />
        <h3 className="font-bold text-textPrimary dark:text-white text-lg">{title}</h3>
        <p className="text-sm text-textSecondary dark:text-gray-400 mt-1">{description}</p>
    </Card>
);

const DeveloperScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Developer Platform" leftAction={<button onClick={() => navigate(-1)}><ArrowLeft/></button>} />
            <div className="p-4 space-y-6">
                <div className="text-center">
                     <h1 className="text-2xl font-bold text-textPrimary dark:text-white">Build on Smart Pay</h1>
                    <p className="text-textSecondary dark:text-gray-400 mt-1">Leverage our secure and scalable infrastructure to build the future of finance in Africa.</p>
                </div>
               
                <div className="space-y-4">
                    <PlatformFeatureCard
                        icon={Share2}
                        title="Open Banking API"
                        description="Access over 500 secure endpoints for payments, data, and services. Build third-party apps on our robust platform."
                    />
                    <PlatformFeatureCard
                        icon={Layers}
                        title="No-Code Financial Builder"
                        description="Use our drag-and-drop workflow builder to create custom payment flows, approval processes, and more without writing a single line of code."
                    />
                    <PlatformFeatureCard
                        icon={Code}
                        title="White-Label Solutions"
                        description="Launch your own branded financial service with our fully customizable, regulation-compliant, white-label banking platform."
                    />
                </div>
                
                 <div className="pt-4">
                    <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primaryDark transition-colors">
                        Access Sandbox Environment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeveloperScreen;