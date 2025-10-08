import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { ShoppingBasket, Wrench, Map, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MarketplaceItemProps {
    image: string;
    name: string;
    description: string;
    price?: string;
}

const MarketplaceItemCard: React.FC<MarketplaceItemProps> = ({ image, name, description, price }) => (
    <Card className="overflow-hidden">
        <img src={image} alt={name} className="w-full h-32 object-cover" />
        <div className="p-2">
            <h3 className="font-bold text-textPrimary dark:text-white">{name}</h3>
            <p className="text-sm text-textSecondary dark:text-gray-400">{description}</p>
            {price && <p className="text-right font-bold text-primary mt-2">{price}</p>}
        </div>
    </Card>
);

const MarketplaceScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background dark:bg-gray-900 min-h-full">
            <Header title="Local Marketplace" leftAction={<button onClick={() => navigate(-1)}><ArrowLeft/></button>} />
            <div className="p-4 space-y-6">
                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <ShoppingBasket className="w-5 h-5 mr-2 text-primary"/>
                        Local Products
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <MarketplaceItemCard image="https://picsum.photos/seed/market1/200/200" name="Gourmet Coffee" description="From local farmers" price="5,000 RWF"/>
                        <MarketplaceItemCard image="https://picsum.photos/seed/market2/200/200" name="Handwoven Baskets" description="Artisanal crafts" price="15,000 RWF"/>
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Wrench className="w-5 h-5 mr-2 text-primary"/>
                        Service Providers
                    </h2>
                     <div className="grid grid-cols-2 gap-4">
                        <MarketplaceItemCard image="https://picsum.photos/seed/market3/200/200" name="Plumbing Services" description="Certified plumbers"/>
                        <MarketplaceItemCard image="https://picsum.photos/seed/market4/200/200" name="Electricians" description="24/7 availability"/>
                    </div>
                </div>
                 <div>
                    <h2 className="font-bold text-lg text-textPrimary dark:text-gray-100 mb-3 flex items-center">
                        <Map className="w-5 h-5 mr-2 text-primary"/>
                        Tourism Services
                    </h2>
                     <div className="grid grid-cols-2 gap-4">
                        <MarketplaceItemCard image="https://picsum.photos/seed/market5/200/200" name="Gorilla Trekking" description="Volcanoes National Park" price="$1,500"/>
                        <MarketplaceItemCard image="https://picsum.photos/seed/market6/200/200" name="Kigali City Tour" description="Full-day guided tour" price="50,000 RWF"/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MarketplaceScreen;
