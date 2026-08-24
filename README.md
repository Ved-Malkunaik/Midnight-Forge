# Midnight Forge — Decentralized Software Contribution Marketplace

> **Build. Contribute. Verify. Earn.**

Midnight Forge is an open-source, decentralized software contribution marketplace built on the **Midnight Network**. It enables developers, DevOps engineers, students, and open-source projects to publish software products, publish contribution opportunities, collaborate natively through GitHub, verify accepted pull requests, and distribute pre-funded Midnight token rewards transparently.

---

## Project Structure

```
bulletin-board/
├── contract/               # Smart contract in Compact language
│   └── src/               # Contract source and utilities
├── api/                   # Methods, classes and types for CLI and UI
├── midnight-forge-cli/            # Command-line interface
│   └── src/               # CLI implementation
└── midnight-forge-ui/             # Web browser interface
    └── src/               # Web UI implementation
```

## Prerequisites :

1. install & setup 1AM wallet
2. fund your 1AM wallet :
   1) https://faucet.preprod.midnight.network/
   2) https://midnight-tmnight-preprod.nethermind.dev/
3. switch the network to prepod.


## 20 Test Passing results :

<img width="1545" height="846" alt="image" src="https://github.com/user-attachments/assets/85d8b8ad-13aa-4f62-a9ff-70345c7bb62a" />


## 🌟 Key Features

- **Multi-Wallet & 1AM Integration**: Native integration with 1AM and Midnight Lace wallets on the Midnight Preprod Network.
- **Resource-Based Authorization**: No static Publisher or Contributor roles. Resource ownership (project owner, claimant key digest) is proven in zero-knowledge.
- **Predefined Reward Release**: Fixed rewards defined at task creation. Rewards require explicit publisher confirmation following GitHub merge events.
- **Real-time GitHub PR Tracker**: Real-time status tracking for linked GitHub Pull Requests (`OPEN` → `IN_REVIEW` → `APPROVED` → `MERGED`) alongside Midnight contract lifecycle states (`OPEN` → `CLAIMED` → `PR_SUBMITTED` → `MERGED` → `ACCEPTED` → `REWARDED`).
- **User Feedback Portal**: Integrated `/feedback` page connected to Google Forms for user experience ratings and bug submissions.

---

## 🏗 System Architecture & Preprod Address

- **Preprod Contract Address**: `0200546febbb7a49324ecd734514cb7df13986d4c7ac5bef1860639087892788ab5e`
- **Network ID**: `preprod`

For complete architectural details, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## 📚 Documentation Index

- 📖 [User Guide](docs/USAGE.md) — Workflow instructions for publishers and contributors.
- 📐 [Architecture Document](docs/ARCHITECTURE.md) — Three sources of truth & privacy model.
- 🔀 [GitHub Integration](docs/GITHUB_INTEGRATION.md) — Webhooks & PR status tracker.
- 💰 [Reward Workflow](docs/REWARD_FLOW.md) — Predefined reward policy & 5-step transfer flow.
- 🚀 [Deployment Guide](docs/DEPLOYMENT.md) — Environment variables & local dev setup.

---

## 🧪 Verification & Commands

```bash
# 1. Compact Contract Tests (20 Vitest tests)
cd contract
npm test

# 2. Frontend Typecheck
cd ../midnight-forge-ui
node node_modules/typescript/bin/tsc -p tsconfig.json --noEmit

# 3. Frontend Lint
node ../node_modules/eslint/bin/eslint.js ./src --fix

# 4. Frontend Production Build
node ../node_modules/vite/bin/vite.js build --mode preprod
```
