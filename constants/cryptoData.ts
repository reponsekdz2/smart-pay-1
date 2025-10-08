import type { CryptoWallet, NFT } from '../types';
import { Bitcoin, VenetianMask, Waves, Atom } from 'lucide-react';

export const mockCryptoWallets: CryptoWallet[] = [
    {
        id: 'btc',
        name: 'Bitcoin',
        symbol: 'BTC',
        balance: 0.0052,
        valueRWF: 1250000,
        network: 'mainnet',
        icon: Bitcoin,
    },
    {
        id: 'eth',
        name: 'Ethereum',
        symbol: 'ETH',
        balance: 0.84,
        valueRWF: 945000,
        network: 'mainnet',
        icon: VenetianMask,
    },
    {
        id: 'bnb',
        name: 'Binance Coin',
        symbol: 'BNB',
        balance: 3.2,
        valueRWF: 420000,
        network: 'mainnet',
        icon: Waves,
    },
    {
        id: 'rwt',
        name: 'Rwanda Token',
        symbol: 'RWT',
        balance: 15000,
        valueRWF: 15000,
        network: 'local',
        icon: Atom,
    },
];

export const mockNfts: NFT[] = [
    {
        id: '1',
        title: 'Rwanda Heritage Art #1',
        creator: 'RwandaArtCollective',
        price: 0.5,
        currency: 'ETH',
        image: 'https://picsum.photos/seed/nft1/200/200',
        verified: true,
    },
    {
        id: '2',
        title: 'Digital Land Certificate',
        creator: 'RwandaLandBoard',
        price: 120,
        currency: 'RWT',
        image: 'https://picsum.photos/seed/nft2/200/200',
        verified: true,
    },
];
