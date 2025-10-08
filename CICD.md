# CI/CD Pipeline Configuration

This file contains the GitHub Actions workflow for continuous integration and deployment to production.

```yaml
# .github/workflows/production.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: test
        ports:
          - 3306:3306
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
      env:
        NODE_ENV: test
        MYSQL_HOST: localhost
        MYSQL_USER: root
        MYSQL_PASSWORD: root
        MYSQL_DATABASE: test
    
    - name: Build application
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker image
      run: |
        docker build -t smartpay/backend:${{ github.sha }} .
        docker tag smartpay/backend:${{ github.sha }} smartpay/backend:latest
    
    - name: Deploy to Kubernetes
      uses: azure/k8s-deploy@v1
      with:
        namespace: production
        manifests: k8s/deployment.yaml
        images: smartpay/backend:${{ github.sha }}
    
    - name: Run database migrations
      run: |
        kubectl exec -n production deploy/smartpay-backend -- npm run migrate:prod
    
    - name: Verify deployment
      run: |
        kubectl rollout status -n production deployment/smartpay-backend
```
