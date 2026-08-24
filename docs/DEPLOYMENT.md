# Midnight Forge — Preprod Deployment & Environment Configuration

## Centralized Environment Variables (`midnight-forge-ui/.env.preprod`)

```env
VITE_NETWORK_ID=preprod
VITE_LOGGING_LEVEL=trace
VITE_MIDNIGHT_FORGE_CONTRACT_ADDRESS=0200546febbb7a49324ecd734514cb7df13986d4c7ac5bef1860639087892788ab5e
VITE_API_BASE_URL=http://localhost:3001
VITE_GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/1FAIpQLSc_midnight_forge_feedback/viewform
```

## Running Local Services
1. **Contract Compilation & Vitest Suite**:
   ```bash
   cd contract
   npm test
   ```
2. **API Backend Service**:
   ```bash
   cd api
   npm run build
   ```
3. **Frontend Application**:
   ```bash
   cd midnight-forge-ui
   npm run dev
   ```
