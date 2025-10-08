import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { ArrowLeft, User, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore';
import { apiGateway } from '../services/apiGateway';
import type { RelationshipNode } from '../types';
import Card from '../components/Card';

const RelationshipItem: React.FC<{ node: RelationshipNode, rank: number }> = ({ node, rank }) => (
    <Card className="flex items-center space-x-4">
        <span className="text-xl font-bold text-textTertiary dark:text-gray-500">{rank}</span>
         <img
            src={`https://api.dicebear.com/8.x/initials/svg?seed=${node.contactName}`}
            alt={node.contactName}
            className="w-12 h-12 rounded-full bg-gray-200"
        />
        <div className="flex-grow">
            <p className="font-bold text-textPrimary dark:text-white">{node.contactName}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${node.strength * 100}%` }}></div>
            </div>
            <p className="text-xs text-textSecondary dark:text-gray-400 mt-1">Strength: {(node.strength * 100).toFixed(0)}%</p>
        </div>
        <div className="text-right">
             <p className="text-sm font-semibold text-success">+{node.totalReceived.toLocaleString()} RWF</p>
             <p className="text-sm font-semibold text-error">-{node.totalSent.toLocaleString()} RWF</p>
        </div>
    </Card>
);

const NetworkScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [network, setNetwork] = useState<RelationshipNode[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNetwork = async () => {
            if (!user) return;
            try {
                setIsLoading(true);
                const res = await apiGateway.relationship.analyzeUserNetwork(user.id);
                if (res.success) {
                    setNetwork(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch network:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNetwork();
    }, [user]);

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full flex flex-col">
            <Header
                title="My Network"
                leftAction={
                    <button onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                }
            />
            <main className="p-4 space-y-4">
                {isLoading ? (
                    <p className="text-center text-textSecondary dark:text-gray-400">Analyzing your network...</p>
                ) : network.length > 0 ? (
                    network.map((node, index) => (
                        <RelationshipItem key={node.contactId} node={node} rank={index + 1} />
                    ))
                ) : (
                    <p className="text-center text-textSecondary dark:text-gray-400">No network data yet. Start transacting to build your network.</p>
                )}
            </main>
        </div>
    );
};

export default NetworkScreen;