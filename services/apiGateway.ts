import { AuthService } from './authService.ts';
import { WalletService } from './walletService.ts';
import { SavingsService } from './savingsService.ts';
import { InsuranceService } from './insuranceService.ts';
import { PaymentService } from './paymentService.ts';
import { AdminService } from './adminService.ts';
import { AnalyticsService } from './analyticsService.ts';
import { AIService } from './aiService.ts';
import { MOCK_DB } from './db.ts';

/**
 * @class ApiGateway
 * This class acts as a single entry point for all frontend requests,
 * simulating a real API Gateway that would route requests to different microservices.
 */
class ApiGateway {
    public auth: AuthService;
    public wallet: WalletService;
    public savings: SavingsService;
    public insurance: InsuranceService;
    public payment: PaymentService;
    public admin: AdminService;
    public analytics: AnalyticsService;
    public ai: AIService;

    constructor() {
        this.auth = new AuthService();
        this.wallet = new WalletService(MOCK_DB);
        this.savings = new SavingsService(MOCK_DB);
        this.insurance = new InsuranceService(MOCK_DB);
        this.payment = new PaymentService();
        this.admin = new AdminService(MOCK_DB);
        this.analytics = new AnalyticsService(MOCK_DB);
        this.ai = new AIService();
    }
    
    /**
     * Propagates the auth token to all services that require it.
     * @param token The JWT token string.
     */
    setAuthToken(token: string | null) {
        this.wallet.setAuthToken(token);
        this.savings.setAuthToken(token);
        this.insurance.setAuthToken(token);
        this.admin.setAuthToken(token);
        // Add other services that need auth here
    }
}

export const apiGateway = new ApiGateway();
