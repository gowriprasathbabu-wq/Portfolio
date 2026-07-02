# ☁️ AWS Deployment Guide — Gowri Prasath Portfolio

## Architecture Overview

```
Internet → Route 53 → CloudFront → ALB → ECS Fargate (Node.js SSR)
                                        ↓
                                    ECR (Docker Registry)
```

---

## Prerequisites

- AWS CLI v2 installed and configured
- Docker installed
- Node.js 20+
- AWS Account with appropriate IAM permissions

---

## Step 1: Build Docker Image

```bash
# Build production image
docker build -t gowri-portfolio:latest .

# Test locally
docker run -p 4000:4000 gowri-portfolio:latest
```

---

## Step 2: Push to Amazon ECR

```bash
# Set variables
export AWS_REGION=ap-south-1
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export ECR_REPO=gowri-portfolio

# Create ECR repository
aws ecr create-repository \
  --repository-name $ECR_REPO \
  --region $AWS_REGION \
  --image-scanning-configuration scanOnPush=true

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS \
  --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Tag and push
docker tag gowri-portfolio:latest \
  $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest

docker push \
  $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest
```

---

## Step 3: ECS Fargate Setup

```bash
# Create ECS Cluster
aws ecs create-cluster \
  --cluster-name gowri-portfolio-cluster \
  --capacity-providers FARGATE \
  --region $AWS_REGION

# Create Task Definition (save as task-def.json first, then register)
aws ecs register-task-definition \
  --cli-input-json file://aws/task-definition.json \
  --region $AWS_REGION

# Create ECS Service
aws ecs create-service \
  --cluster gowri-portfolio-cluster \
  --service-name gowri-portfolio-service \
  --task-definition gowri-portfolio:1 \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxx],securityGroups=[sg-xxxx],assignPublicIp=ENABLED}" \
  --region $AWS_REGION
```

---

## Step 4: Application Load Balancer

```bash
# Create ALB
aws elbv2 create-load-balancer \
  --name gowri-portfolio-alb \
  --subnets subnet-xxx subnet-yyy \
  --security-groups sg-xxx \
  --region $AWS_REGION

# Create Target Group
aws elbv2 create-target-group \
  --name gowri-portfolio-tg \
  --protocol HTTP \
  --port 4000 \
  --target-type ip \
  --vpc-id vpc-xxx \
  --health-check-path / \
  --health-check-interval-seconds 30 \
  --region $AWS_REGION
```

---

## Step 5: CloudFront Distribution

```bash
# Create CloudFront distribution pointing to ALB
aws cloudfront create-distribution \
  --origin-domain-name your-alb-dns.elb.amazonaws.com \
  --default-root-object index.html
```

---

## Step 6: Route 53 DNS

1. Create hosted zone for `gowriprasath.dev`
2. Add ALIAS record pointing to CloudFront distribution
3. Request SSL certificate via ACM (us-east-1 for CloudFront)

---

## Environment Variables (ECS Task Definition)

```json
{
  "environment": [
    { "name": "NODE_ENV", "value": "production" },
    { "name": "PORT",     "value": "4000" }
  ]
}
```

---

## CI/CD via GitHub Actions

Set these GitHub repository secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` → `ap-south-1`
- `ECS_CLUSTER` → `gowri-portfolio-cluster`
- `ECS_SERVICE` → `gowri-portfolio-service`

Push to `main` branch → automatic build, push to ECR, and ECS deploy.

---

## Estimated Monthly Cost (ap-south-1)

| Service         | Spec                     | Cost/month |
|----------------|--------------------------|------------|
| ECS Fargate    | 0.25 vCPU, 0.5GB RAM    | ~$6        |
| ALB            | 1 LCU                    | ~$16       |
| CloudFront     | 1GB transfer             | ~$1        |
| ECR            | 1GB storage              | ~$0.10     |
| Route 53       | 1 hosted zone            | ~$0.50     |
| **Total**      |                          | **~$24**   |
