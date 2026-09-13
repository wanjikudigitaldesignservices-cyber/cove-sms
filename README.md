# Cove SMS Monorepo

This repository contains the **Phase 1 scaffolding** for the Cove High School School Management System.

## Overview
- **Monorepo** managed with npm workspaces.
- Six micro‑services (auth, sis, academics, assessment, fees, comms) each with its own Express + TypeScript skeleton.
- **API Gateway** that proxies requests to the services.
- Minimal **React + Vite** web app that shows a health‑check dashboard.
- Docker Compose file to spin up all services, a Redis event bus and a single Postgres instance (schemas are per‑service).
- GitHub Actions CI that lints and builds every package on PR.

## Local Development
```bash
# From the repo root
npm install            # install all workspace packages
docker compose up      # starts all containers
```
Visit `http://localhost:5173` (the web app) to see the health status of each service.

## Directory Layout
```
cove-sms/
├─ apps/
│  └─ web/                # React + Vite placeholder UI
├─ services/
│  ├─ auth-service/
│  ├─ sis-service/
│  ├─ academics-service/
│  ├─ assessment-service/
│  ├─ fees-service/
│  └─ comms-service/
├─ gateway/                # API gateway
├─ infra/docker-compose.yml
├─ packages/shared-types/
└─ .github/workflows/ci.yml
```

## Next Steps
- Run `docker compose up` and verify health endpoints.
- Extend each service with real business logic in later phases.
