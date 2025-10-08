import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { useUserStore } from '../hooks/useUserStore';
import type { CryptoWallet, NFT } from '../types';
import { ArrowUpRight, ArrowDownLeft, Repeat, BarChart, Image } from 'lucide-react';

const CryptoWalletCard: React.FC<{ wallet: CryptoWallet }> = ({ wallet }) => (
    <div className="flex items-center py-3">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 text-primary rounded-full mr-4">
            <wallet.icon className="w-6 h-6" />
        </div>
        <div className="flex-grow">
            <p className="font-bold text-textPrimary dark:text-white">{wallet.name}</p>
            <p className="text-sm text-textSecondary dark:text-gray-400">{wallet.symbol}</p>
        </div>
        <div className="text-right">
            <p className="font-bold text-textPrimary dark:text-white">{wallet.balance.toLocaleString()} {wallet.symbol}</p>
            <p className="text-sm text-textSecondary dark:text-gray-400">{wallet.valueRWF.toLocaleString()} RWF</p>
        </div>
    </div>
);

const CryptoActionButton: React.FC<{ icon: React.ElementType, label: string }> = ({ icon: Icon, label }) => (
    <button className="flex flex-col items-center space-y-2">
        <div className="bg-primaryLight dark:bg-primary/20 text-primary dark:text-primaryLight rounded-full p-4 hover:bg-primary/20 transition-all">
            <Icon className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium text-textPrimary dark:text-gray-200">{label}</span>
    </button>
);

const NFTCard: React.FC<{ nft: NFT }> = ({ nft }) => (
    <div className="w-36 flex-shrink-0">
        <img src={nft.image} alt={nft.title} className="w-full h-36 object-cover rounded-lg" />
        <p className="font-semibold text-sm mt-2 text-textPrimary dark:text-white truncate">{nft.title}</p>
        <p className="text-xs text-primary font-bold">{nft.price} {nft.currency}</p>
    </div>
);


const CryptoScreen: React.FC = () => {
    const { cryptoWallets, nfts } = useUserStore();
    const totalCryptoValue = cryptoWallets.reduce((sum, wallet) => sum + wallet.valueRWF, 0);

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Crypto & Web3" />
            <div className="p-4 space-y-6">
                <Card className="bg-gradient-to-br from-gray-700 to-black text-white">
                    <p className="text-sm opacity-80">Total Crypto Value</p>
                    <p className="text-4xl font-bold mt-1 tracking-tight">{totalCryptoValue.toLocaleString()} RWF</p>
                </Card>

                <Card>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <CryptoActionButton icon={ArrowDownLeft} label="Buy" />
                        <CryptoActionButton icon={ArrowUpRight} label="Sell" />
                        <CryptoActionButton icon={Repeat} label="Swap" />
                        <CryptoActionButton icon={BarChart} label="Stake" />
                    </div>
                </Card>

                <Card>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-white mb-2">Your Assets</h2>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {cryptoWallets.map(wallet => <CryptoWalletCard key={wallet.id} wallet={wallet} />)}
                    </div>
                </Card>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-white mb-3 flex items-center">
                        <Image className="w-5 h-5 mr-2 text-primary"/>
                        Featured NFTs
                    </h2>
                    <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
                       {nfts.map(nft => <NFTCard key={nft.id} nft={nft} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoScreen;
