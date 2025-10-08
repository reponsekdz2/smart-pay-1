# Production Deployment Script

This shell script automates the deployment process to the production environment.

```bash
#!/bin/bash
# deploy-production.sh

set -e

echo "🚀 Starting Production Deployment..."

# Environment variables
export NODE_ENV=production
export MYSQL_HOST=${PRODUCTION_DB_HOST}
export MYSQL_USER=${PRODUCTION_DB_USER}
export MYSQL_PASSWORD=${PRODUCTION_DB_PASSWORD}
export JWT_SECRET=${PRODUCTION_JWT_SECRET}

# Build Docker images
echo "📦 Building Docker images..."
docker build -t smartpay/backend:latest -f backend/Dockerfile .
docker build -t smartpay/admin:latest -f admin/Dockerfile .

# Push to container registry
echo "📤 Pushing images to registry..."
docker push smartpay/backend:latest
docker push smartpay/admin:latest

# Database migrations
echo "🔄 Running database migrations..."
kubectl exec -n production deploy/smartpay-backend -- npm run migrate:prod

# Deploy to Kubernetes
echo "🎯 Deploying to Kubernetes..."
kubectl apply -f k8s/ -n production

# Wait for rollout
echo "⏳ Waiting for deployment to complete..."
kubectl rollout status -n production deployment/smartpay-backend
kubectl rollout status -n production deployment/smartpay-admin

# Run health checks
echo "🏥 Running health checks..."
curl -f https://api.smartpay.rw/health || exit 1
curl -f https://admin.smartpay.rw/health || exit 1

echo "✅ Production deployment completed successfully!"
```
