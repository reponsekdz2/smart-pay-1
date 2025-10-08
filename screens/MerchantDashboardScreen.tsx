import React from 'react';
import { BarChart, Package, Handshake, FileText, Bell, Link as LinkIcon, QrCode, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Card from '../components/Card';
import { useUserStore } from '../hooks/useUserStore';
import type { BusinessMetric, BusinessProduct } from '../types';

const MetricCard: React.FC<{ metric: BusinessMetric }> = ({ metric }) => {
    const trendColor = metric.trend === 'up' ? 'text-success' : 'text-error';
    return (
        <Card>
            <p className="text-sm text-textSecondary dark:text-gray-400">{metric.title}</p>
            <p className="text-2xl font-bold text-textPrimary dark:text-white">{metric.value}</p>
            <p className={`text-sm font-semibold ${trendColor}`}>{metric.change}</p>
        </Card>
    );
};

const LowStockItem: React.FC<{ item: BusinessProduct }> = ({ item }) => (
    <div className="flex justify-between items-center p-2 bg-yellow-100/50 dark:bg-yellow-900/50 rounded-lg">
        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">{item.name}</p>
        <p className="text-sm font-bold text-yellow-800 dark:text-yellow-300">{item.stock} left</p>
    </div>
);

const MerchantDashboardScreen: React.FC = () => {
    const { user, merchantData } = useUserStore();
    const lowStockItems = merchantData.inventory.filter(item => item.stock < 15);

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title={`${user.name}'s Store`} rightAction={<button><Bell /></button>} />
            <div className="p-4 space-y-6">
                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <BarChart className="w-5 h-5 mr-2 text-primary"/>
                        Today's Overview
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {merchantData.stats.map(stat => <MetricCard key={stat.title} metric={stat} />)}
                    </div>
                </div>

                {lowStockItems.length > 0 && (
                     <div>
                        <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                            <Package className="w-5 h-5 mr-2 text-primary"/>
                            Inventory Alerts
                        </h2>
                        <div className="space-y-2">
                           {lowStockItems.map(item => <LowStockItem key={item.id} item={item} />)}
                        </div>
                    </div>
                )}

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-primary"/>
                        Business Tools
                    </h2>
                    <Card>
                        <div className="grid grid-cols-3 gap-4 text-center">
                             <button className="flex flex-col items-center space-y-1">
                                <div className="p-3 bg-primaryLight dark:bg-primary/20 rounded-full text-primary"><LinkIcon className="w-5 h-5"/></div>
                                <span className="text-xs font-medium text-textPrimary dark:text-gray-200">Payment Link</span>
                            </button>
                             <button className="flex flex-col items-center space-y-1">
                                <div className="p-3 bg-primaryLight dark:bg-primary/20 rounded-full text-primary"><FileText className="w-5 h-5"/></div>
                                <span className="text-xs font-medium text-textPrimary dark:text-gray-200">Create Invoice</span>
                            </button>
                             <button className="flex flex-col items-center space-y-1">
                                <div className="p-3 bg-primaryLight dark:bg-primary/20 rounded-full text-primary"><QrCode className="w-5 h-5"/></div>
                                <span className="text-xs font-medium text-textPrimary dark:text-gray-200">Business QR</span>
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MerchantDashboardScreen;
