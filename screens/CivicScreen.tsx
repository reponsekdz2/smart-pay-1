import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { ArrowLeft, User, FileText, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore';
import type { DigitalCredential } from '../types';

const CredentialCard: React.FC<{ cred: DigitalCredential }> = ({ cred }) => (
    <div className="flex items-center p-3 bg-surface dark:bg-gray-700/50 rounded-lg">
        <cred.icon className="w-8 h-8 text-primary mr-4" />
        <div className="flex-grow">
            <h3 className="font-semibold text-textPrimary dark:text-gray-100">{cred.name}</h3>
            <p className="text-sm text-textSecondary dark:text-gray-400">Issuer: {cred.issuer}</p>
        </div>
        {cred.verified && <div className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full font-semibold">Verified</div>}
    </div>
);

const CivicScreen: React.FC = () => {
    const navigate = useNavigate();
    const { digitalCredentials } = useUserStore();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Civic Services" leftAction={<button onClick={() => navigate(-1)}><ArrowLeft/></button>} />
            <div className="p-4 space-y-6">
                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <User className="w-5 h-5 mr-2 text-primary"/>
                        National Digital Identity
                    </h2>
                    <Card>
                        <div className="space-y-3">
                            {digitalCredentials.map(cred => <CredentialCard key={cred.id} cred={cred} />)}
                        </div>
                         <button className="w-full text-center text-primary font-semibold pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                            Add New Credential
                        </button>
                    </Card>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-primary"/>
                        Smart Tax System
                    </h2>
                     <Card>
                        <h3 className="font-semibold text-textPrimary dark:text-gray-100">Auto Tax Filing</h3>
                        <p className="text-sm text-textSecondary dark:text-gray-400 mt-1">
                           Your tax information is pre-filled based on your transactions. Ready to submit for 2024.
                        </p>
                        <button className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primaryDark transition-colors mt-4">
                            Review & File Now
                        </button>
                    </Card>
                </div>
                 <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <BarChart2 className="w-5 h-5 mr-2 text-primary"/>
                        Public Financial Management
                    </h2>
                     <Card>
                        <h3 className="font-semibold text-textPrimary dark:text-gray-100">Budget Transparency</h3>
                        <p className="text-sm text-textSecondary dark:text-gray-400 mt-1">
                           Explore real-time government spending and track public projects in your community.
                        </p>
                        <button className="w-full text-center text-primary font-semibold pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                           View Public Dashboard
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CivicScreen;