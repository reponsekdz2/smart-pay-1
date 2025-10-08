# Kubernetes Deployment Configuration

This file contains the Kubernetes `Deployment` and `Service` configurations for deploying the backend application to a production namespace.

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: smartpay-backend
  namespace: production
spec:
  replicas: 4
  selector:
    matchLabels:
      app: smartpay-backend
  template:
    metadata:
      labels:
        app: smartpay-backend
    spec:
      containers:
      - name: backend
        image: smartpay/backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: MYSQL_HOST
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: host
        - name: MYSQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: password
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: smartpay-backend-service
  namespace: production
spec:
  selector:
    app: smartpay-backend
  ports:
  - port: 3000
    targetPort: 3000
  type: LoadBalancer
```
