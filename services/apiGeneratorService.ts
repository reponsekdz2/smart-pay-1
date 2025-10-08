
import type { ApiResponse, GenerateApiKeyDto, GeneratedApiKey, ApiKey, ApiPermission, ApiEndpoint } from '../types.ts';
import { MOCK_USER_DB_TYPE } from './db.ts';

const ALL_ENDPOINTS: ApiEndpoint[] = [
    { method: 'POST', path: '/v1/transactions', description: 'Create a new transaction.', permissions: ['transactions:create'] },
    { method: 'GET', path: '/v1/transactions/:id', description: 'Retrieve a specific transaction.', permissions: ['transactions:read'] },
    { method: 'GET', path: '/v1/transactions', description: 'List transactions.', permissions: ['transactions:read'] },
    { method: 'GET', path: '/v1/users/:id', description: 'Get user details.', permissions: ['users:read'] },
    { method: 'GET', path: '/v1/wallets/:id/balance', description: 'Get wallet balance.', permissions: ['wallets:read'] },
];

/**
 * @class ApiGeneratorService
 * Simulates a service for generating API keys for developers/partners.
 */
export class ApiGeneratorService {
    private db: MOCK_USER_DB_TYPE;

    constructor(db: MOCK_USER_DB_TYPE) {
        this.db = db;
    }

    private generateRandomString(length: number): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    async generateApiKey(dto: GenerateApiKeyDto): Promise<ApiResponse<GeneratedApiKey>> {
        console.log(`API_GENERATOR_SERVICE: Generating new API key for merchant "${dto.merchantName}"`);
        
        const apiKey = `sk_live_${this.generateRandomString(24)}`;
        const apiSecret = `secret_${this.generateRandomString(32)}`;
        
        // In a real app, you'd use a strong hashing algorithm like bcrypt
        const apiSecretHash = `hashed_${apiSecret}`; 

        const newKey: GeneratedApiKey = {
            id: `key_${Date.now()}`,
            merchantName: dto.merchantName,
            apiKey,
            apiSecret, // Return the raw secret only on creation
            apiSecretHash,
            permissions: dto.permissions,
            createdAt: new Date().toISOString(),
            status: 'active',
        };

        // Don't store the raw secret in the DB
        const { apiSecret: _, ...keyToStore } = newKey;
        this.db.apiKeys.push(keyToStore);

        return { success: true, data: newKey };
    }

    async getApiKeys(): Promise<ApiResponse<ApiKey[]>> {
        // Return a copy to prevent mutation
        return { success: true, data: [...this.db.apiKeys] };
    }

    getApiEndpoints(permissions: ApiPermission[]): ApiEndpoint[] {
        return ALL_ENDPOINTS.filter(endpoint => 
            endpoint.permissions.some(p => permissions.includes(p))
        );
    }
}