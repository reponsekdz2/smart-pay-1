
import { MOCK_DB } from './db.ts';
import { AuthService } from './authService.ts';
import { WalletService } from './walletService.ts';
import { PaymentService } from './paymentService.ts';
import { ComplianceService } from './complianceService.ts';
import { InsuranceService } from './insuranceService.ts';
import { SavingsService } from './savingsService.ts';
import { AnalyticsService } from './analyticsService.ts';
import { AdminService } from './adminService.ts';
import { ApiGeneratorService } from './apiGeneratorService.ts';

// Instantiate services
const complianceService = new ComplianceService();
const authService = new AuthService(MOCK_DB);
const walletService = new WalletService(MOCK_DB);
const paymentService = new PaymentService(MOCK_DB, complianceService);
const insuranceService = new InsuranceService(MOCK_DB);
const savingsService = new SavingsService(MOCK_DB);
const analyticsService = new AnalyticsService(MOCK_DB);
const adminService = new AdminService(MOCK_DB);
const apiGeneratorService = new ApiGeneratorService(MOCK_DB);

// The Gateway itself
export const apiGateway = {
    auth: {
        login: authService.login.bind(authService),
        register: authService.register.bind(authService),
        getProfile: authService.getProfile.bind(authService),
    },
    wallet: {
        getWallet: walletService.getWalletByUserId.bind(walletService),
        getTransactions: walletService.getTransactionsByUserId.bind(walletService),
    },
    payment: {
        sendMoney: paymentService.sendMoney.bind(paymentService),
    },
    insurance: {
        getPoliciesByUserId: insuranceService.getPoliciesByUserId.bind(insuranceService),
    },
    savings: {
        getGoalsByUserId: savingsService.getGoalsByUserId.bind(savingsService),
    },
    analytics: {
        getFinancialInsights: analyticsService.getFinancialInsights.bind(analyticsService),
    },
    admin: {
        getBusinessIntelligence: adminService.getBusinessIntelligence.bind(adminService),
    },
    apiGenerator: {
        generateApiKey: apiGeneratorService.generateApiKey.bind(apiGeneratorService),
        getApiKeys: apiGeneratorService.getApiKeys.bind(apiGeneratorService),
        getApiEndpoints: apiGeneratorService.getApiEndpoints.bind(apiGeneratorService),
    },
    
    // This function allows the auth token to be passed down to all services that need it.
    setAuthToken: (token: string | null) => {
        walletService.setAuthToken(token);
        paymentService.setAuthToken(token);
        insuranceService.setAuthToken(token);
        savingsService.setAuthToken(token);
        adminService.setAuthToken(token);
    }
};