import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { useUserStore } from '../hooks/useUserStore';
import type { MilestoneNFT, Quest } from '../types';
import { Shield, Swords, Gem, Trophy } from 'lucide-react';

const RPGCharacterCard: React.FC = () => {
    const { rpgCharacter } = useUserStore();
    const xpToNextLevel = Math.pow(rpgCharacter.level, 2) * 1000;
    const progress = (rpgCharacter.xp / xpToNextLevel) * 100;

    return (
        <Card className="bg-gradient-to-br from-gray-700 to-black text-white">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Financial Adventurer</h3>
                <span className="font-bold text-lg">Level {rpgCharacter.level}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5 my-3">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-300">
                <span>XP: {rpgCharacter.xp.toLocaleString()} / {xpToNextLevel.toLocaleString()}</span>
                <span>Net Worth: {rpgCharacter.netWorth.toLocaleString()} RWF</span>
            </div>
        </Card>
    )
}

const QuestCard: React.FC<{ quest: Quest }> = ({ quest }) => (
    <div className="p-3 bg-primaryLight/50 dark:bg-primary/20 rounded-lg">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-semibold text-sm text-textPrimary dark:text-gray-100">{quest.title}</h4>
                <p className="text-xs text-textSecondary dark:text-gray-400">{quest.description}</p>
            </div>
            <span className="text-xs font-bold text-primary dark:text-primaryLight">{quest.xp} XP</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${quest.progress}%` }}></div>
        </div>
    </div>
);

const MilestoneNFTCard: React.FC<{ nft: MilestoneNFT }> = ({ nft }) => (
    <div className="w-36 flex-shrink-0 text-center">
        <img src={nft.image} alt={nft.title} className="w-full h-36 object-cover rounded-lg border-2 border-primary" />
        <p className="font-semibold text-sm mt-2 text-textPrimary dark:text-white truncate">{nft.milestone}</p>
        <p className="text-xs text-primary font-bold">{nft.title}</p>
    </div>
);


const GamingScreen: React.FC = () => {
    const { quests, milestoneNfts } = useUserStore();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Financial Gaming" />

            <div className="p-4 space-y-6">
                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-primary"/>
                        Wealth-Building RPG
                    </h2>
                    <RPGCharacterCard />
                </div>
                
                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Swords className="w-5 h-5 mr-2 text-primary"/>
                        Economic Quests
                    </h2>
                    <div className="space-y-3">
                        {quests.map(quest => (
                            <QuestCard key={quest.id} quest={quest} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                       <Trophy className="w-5 h-5 mr-2 text-primary"/>
                        Tradable Milestone NFTs
                    </h2>
                    <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
                       {milestoneNfts.map(nft => <MilestoneNFTCard key={nft.id} nft={nft} />)}
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                       <Gem className="w-5 h-5 mr-2 text-primary"/>
                        Skill-Based Games
                    </h2>
                     <Card>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-textPrimary dark:text-gray-100">Trading Tournaments</h3>
                                <p className="text-sm text-textSecondary dark:text-gray-400">Compete for real cash prizes.</p>
                            </div>
                            <button className="text-sm font-semibold text-white bg-primary px-4 py-2 rounded-lg">Join</button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default GamingScreen;