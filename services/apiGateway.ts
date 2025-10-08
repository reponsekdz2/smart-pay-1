
import { MOCK_DB } from './db';
import { AuthService } from './authService';
import { PaymentService } from './paymentService';
import { WalletService } from './walletService';
import { AnalyticsService } from './analyticsService';
import { AdminService } from './adminService';
import { AiService } from './aiService';
import { RelationshipService } from './relationshipService';
import { SecurityService } from './securityService';
import { SavingsService } from './savingsService';
import { InsuranceService } from './insuranceService';
import { CacheService } from './cacheService';
import { MonitoringService } from './monitoringService';
import { SyncService } from './syncService';

class ApiGateway {
    public auth: AuthService;
    public payment: PaymentService;
    public wallet: WalletService;
    public analytics: AnalyticsService;
    public admin: AdminService;
    public ai: AiService;
    public relationship: RelationshipService;
    public security: SecurityService;
    public savings: SavingsService;
    public insurance: InsuranceService;
    public sync: SyncService;

    private cache: CacheService;
    private monitor: MonitoringService;

    constructor() {
        // In a real app, these services would be remote microservices.
        // Here, we instantiate them locally with shared DB and cache contexts.
        this.cache = new CacheService();
        this.monitor = new MonitoringService();
        
        // Services
        const walletService = new WalletService(MOCK_DB, this.cache);

        this.auth = new AuthService(MOCK_DB, this.cache);
        this.payment = new PaymentService(MOCK_DB, walletService);
        this.wallet = walletService;
        this.analytics = new AnalyticsService(MOCK_DB);
        this.admin = new AdminService(MOCK_DB);
        this.ai = new AiService(MOCK_DB);
        this.relationship = new RelationshipService(MOCK_DB);
        this.security = new SecurityService(MOCK_DB);
        this.savings = new SavingsService(MOCK_DB);
        this.insurance = new InsuranceService(MOCK_DB);
        this.sync = new SyncService();

        // Wrap methods with monitoring/tracing
        this.wrapServicesWithMonitoring();
    }

    setAuthToken(token: string | null) {
        // Propagate the auth token to all services that need it.
        this.auth.setAuthToken(token);
        this.payment.setAuthToken(token);
        this.admin.setAuthToken(token);
        this.ai.setAuthToken(token);
        this.relationship.setAuthToken(token);
        this.security.setAuthToken(token);
        this.savings.setAuthToken(token);
        this.insurance.setAuthToken(token);
    }
    
    private wrapServicesWithMonitoring() {
        // This is a simplified example of wrapping a method.
        // In a real implementation, you'd use decorators or a more robust AOP approach.
        const originalLogin = this.auth.login.bind(this.auth);
        this.auth.login = (dto) => {
            return this.monitor.traceOperation('auth.login', { phone: dto.phone }, () => originalLogin(dto));
        }
        
        const originalGetFinancialInsights = this.analytics.getFinancialInsights.bind(this.analytics);
        this.analytics.getFinancialInsights = (userId) => {
            return this.monitor.traceOperation('analytics.getFinancialInsights', { userId }, () => originalGetFinancialInsights(userId));
        }

        const originalSendP2P = this.security.sendP2P.bind(this.security);
        this.security.sendP2P = (dto) => {
             return this.monitor.traceOperation('security.sendP2P', { from: dto.fromUserId, to: dto.toPhone, amount: dto.amount }, () => originalSendP2P(dto));
        }
    }
}

export const apiGateway = new ApiGateway();
