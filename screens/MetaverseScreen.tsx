import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { ArrowLeft, Cuboid, GalleryVertical, BarChart4 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../hooks/useUserStore';

const MetaverseFeatureCard: React.FC<{ icon: React.ElementType, title: string, description: string, buttonText: string }> = ({ icon: Icon, title, description, buttonText }) => (
    <Card className="text-center hover:shadow-2xl transition-shadow">
         <div className="w-16 h-16 bg-primaryLight dark:bg-primary/20 text-primary rounded-full mx-auto flex items-center justify-center">
            <Icon className="w-8 h-8"/>
        </div>
        <h3 className="font-bold text-textPrimary dark:text-white text-xl mt-4">{title}</h3>
        <p className="text-sm text-textSecondary dark:text-gray-400 mt-1 mb-4">{description}</p>
        <button className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primaryDark transition-colors">
            {buttonText}
        </button>
    </Card>
);

const MetaverseScreen: React.FC = () => {
    const navigate = useNavigate();
    const { nfts, milestoneNfts } = useUserStore();
    const totalDigitalAssets = nfts.length + milestoneNfts.length;

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Metaverse Banking" leftAction={<button onClick={() => navigate(-1)}><ArrowLeft/></button>} />
            <div className="p-4 space-y-6">
                <div className="text-center p-4 bg-surface dark:bg-gray-800 rounded-lg">
                    <h1 className="text-2xl font-bold text-textPrimary dark:text-white">Welcome to the Financial Metaverse</h1>
                    <p className="text-textSecondary dark:text-gray-400 mt-1">Your assets, achievements, and advice, visualized in a stunning 3D world.</p>
                </div>
               
                <div className="space-y-4">
                   <MetaverseFeatureCard 
                        icon={Cuboid}
                        title="Virtual Bank Branch"
                        description="Meet with AI financial advisors, attend virtual seminars, and manage your accounts in our immersive 3D branch."
                        buttonText="Enter Virtual Branch"
                   />
                    <MetaverseFeatureCard 
                        icon={GalleryVertical}
                        title="Your Wealth Gallery"
                        description={`Explore your ${totalDigitalAssets} digital assets, from investment NFTs to achievement trophies, beautifully displayed in your personal gallery.`}
                        buttonText="Visit Gallery"
                   />
                    <MetaverseFeatureCard 
                        icon={BarChart4}
                        title="VR Trading Floor"
                        description="Experience the future of trading with holographic market data, gesture-based commands, and social trading in virtual reality."
                        buttonText="Launch VR Trading"
                   />
                </div>
            </div>
        </div>
    );
};

export default MetaverseScreen;
