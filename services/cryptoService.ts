
import type { ApiResponse } from '../types.ts';

/**
 * @class CryptoService
 * Simulates a service for interacting with cryptocurrency exchanges or wallets.
 */
export class CryptoService {
    
    async getPrice(ticker: 'BTC' | 'ETH'): Promise<ApiResponse<{ price: number }>> {
        console.log(`CRYPTO_SERVICE: Fetching price for ${ticker}`);
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const price = ticker === 'BTC' ? 65000 : 3500;
        return { success: true, data: { price: price * 1250 } }; // Mock price in RWF
    }
}
