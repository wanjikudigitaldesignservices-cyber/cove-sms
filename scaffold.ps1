$ErrorActionPreference = "Stop"

# Create directories
$dirs = @(
    "apps/web",
    "services/auth-service",
    "services/sis-service",
    "services/academics-service",
    "services/assessment-service",
    "services/fees-service",
    "services/comms-service",
    "gateway",
    "infra/.github/workflows",
    "packages/shared-types"
)

foreach ($d in $dirs) {
    New-Item -ItemType Directory -Force -Path $d | Out-Null
}

# Create shared-types
$sharedTypesPkg = @{
    name = "@cove-sms/shared-types"
    version = "1.0.0"
    main = "index.ts"
}
$sharedTypesPkg | ConvertTo-Json | Out-File -Encoding ASCII "packages/shared-types/package.json"
New-Item -ItemType File -Force -Path "packages/shared-types/index.ts" | Out-Null

# Initialize services
$services = @("auth-service", "sis-service", "academics-service", "assessment-service", "fees-service", "comms-service")
foreach ($svc in $services) {
    $svcPath = "services/$svc"
    $pkg = @{
        name = $svc
        version = "1.0.0"
        main = "src/index.ts"
        scripts = @{
            build = "tsc"
            start = "node dist/index.js"
            dev = "ts-node src/index.ts"
        }
    }
    $pkg | ConvertTo-Json | Out-File -Encoding ASCII "$svcPath/package.json"
    
    # Create src dirs
    $srcDirs = @("routes", "controllers", "services", "models", "middleware", "config")
    foreach ($sd in $srcDirs) {
        New-Item -ItemType Directory -Force -Path "$svcPath/src/$sd" | Out-Null
    }
    
    # Create basic index.ts
    $indexCode = @"
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: '$svc' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Service $svc listening on port \` + PORT));
"@
    Out-File -Encoding ASCII -FilePath "$svcPath/src/index.ts" -InputObject $indexCode
    
    # Create Dockerfile
    $dockerfile = @"
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
"@
    Out-File -Encoding ASCII -FilePath "$svcPath/Dockerfile" -InputObject $dockerfile
    
    # Create .env.example
    Out-File -Encoding ASCII -FilePath "$svcPath/.env.example" -InputObject "PORT=3000`nDATABASE_URL="
}

# Gateway setup
$gatewayPkg = @{
    name = "gateway"
    version = "1.0.0"
    main = "src/index.ts"
    scripts = @{
        build = "tsc"
        start = "node dist/index.js"
        dev = "ts-node src/index.ts"
    }
}
$gatewayPkg | ConvertTo-Json | Out-File -Encoding ASCII "gateway/package.json"

New-Item -ItemType Directory -Force -Path "gateway/src" | Out-Null
$gatewayCode = @"
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const services = {
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    sis: process.env.SIS_SERVICE_URL || 'http://localhost:3002',
    academics: process.env.ACADEMICS_SERVICE_URL || 'http://localhost:3003',
    assessment: process.env.ASSESSMENT_SERVICE_URL || 'http://localhost:3004',
    fees: process.env.FEES_SERVICE_URL || 'http://localhost:3005',
    comms: process.env.COMMS_SERVICE_URL || 'http://localhost:3006',
};

// Rate limit stub
app.use((req, res, next) => {
    // TODO: implement actual rate limiting
    next();
});

// JWT auth stub
app.use((req, res, next) => {
    // TODO: verify client JWT, sign internal service token
    next();
});

// Routes
Object.entries(services).forEach(([name, target]) => {
    app.use(\`/api/v1/\${name}\`, createProxyMiddleware({ target, changeOrigin: true }));
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'gateway' });
});

app.listen(PORT, () => console.log(\`Gateway running on port \` + PORT));
"@
Out-File -Encoding ASCII -FilePath "gateway/src/index.ts" -InputObject $gatewayCode

$gatewayDockerfile = @"
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
"@
Out-File -Encoding ASCII -FilePath "gateway/Dockerfile" -InputObject $gatewayDockerfile

Write-Output "Scaffold generated."
