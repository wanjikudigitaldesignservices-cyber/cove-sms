$ErrorActionPreference = "Stop"

# Add dependencies for gateway
Set-Location "C:\Users\wanji\.gemini\antigravity-ide\scratch\cove-sms\gateway"
npm install express http-proxy-middleware dotenv
npm install -D typescript @types/node @types/express @types/http-proxy-middleware ts-node

# Add dependencies for all 6 services
$services = @("auth-service", "sis-service", "academics-service", "assessment-service", "fees-service", "comms-service")
foreach ($svc in $services) {
    Set-Location "C:\Users\wanji\.gemini\antigravity-ide\scratch\cove-sms\services\$svc"
    npm install express dotenv
    npm install -D typescript @types/node @types/express ts-node
}

# Install dependencies for React app + tailwind
Set-Location "C:\Users\wanji\.gemini\antigravity-ide\scratch\cove-sms\apps\web"
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Finally, run npm install at root to link workspaces
Set-Location "C:\Users\wanji\.gemini\antigravity-ide\scratch\cove-sms"
npm install
