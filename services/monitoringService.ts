/**
 * @class MonitoringService
 * Simulates a service for logging and monitoring application events.
 * In a real app, this would send data to a service like Sentry, Datadog, or Grafana.
 */
export class MonitoringService {
    
    logEvent(eventName: string, metadata: Record<string, any> = {}) {
        console.log(`MONITORING_SERVICE: [EVENT] ${eventName}`, metadata);
        // In a real app: Sentry.captureMessage(eventName, { extra: metadata });
    }

    logError(error: Error, context: Record<string, any> = {}) {
        console.error(`MONITORING_SERVICE: [ERROR]`, error, context);
        // In a real app: Sentry.captureException(error, { extra: context });
    }
}

export const monitoringService = new MonitoringService();
