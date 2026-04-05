# GCP Deployment Plan

## Overview
The backend is a NestJS app connected to a PostgreSQL database.
The plan is to deploy it on GCP using Cloud Run, Cloud SQL, and Cloud Build.

## 1. Cloud Run
- Package the NestJS app into a Docker container
- Deploy the container to Cloud Run
- Cloud Run handles scaling automatically — it scales up under load and scales to zero when idle
- No need to manage servers

## 2. Database — Cloud SQL
- Use Cloud SQL to host the PostgreSQL database
- Cloud SQL handles backups and availability automatically
- Connect Cloud Run to Cloud SQL using a private IP for security

## 3. Environment Variables
- Store sensitive values like DB passwords and Firebase keys in GCP Secret Manager
- Link the secrets to Cloud Run so the app can read them at runtime
- Never store secrets in the code or config files

## 4. Load Balancing
- Set up a GCP HTTP(S) Load Balancer in front of Cloud Run
- This gives a single public URL for the app
- Handles SSL (HTTPS) and distributes traffic

## 5. CI/CD with Cloud Build
- Connect the GitHub repository to Cloud Build
- Set a trigger: whenever code is pushed to the main branch, Cloud Build automatically:
  1. Installs dependencies
  2. Builds the app
  3. Builds the Docker image
  4. Deploys to Cloud Run

## Trade-offs
- Chose Cloud Run over a full Kubernetes cluster because it is simpler and cost-effective for this scale
- Chose Cloud SQL over self-hosted PostgreSQL because it handles maintenance automatically
