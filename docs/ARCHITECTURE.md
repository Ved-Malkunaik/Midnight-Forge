# Midnight Forge — System Architecture & Trust Model

## Three Sources of Truth

```
┌─────────────────────────────────────────────────────────┐
│                       GITHUB                            │
│  Source of truth for code, issues, PRs, merge activity  │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼ (Webhooks / Sync API)
┌─────────────────────────────────────────────────────────┐
│              MIDNIGHT FORGE BACKEND & API               │
│ Synchronization layer, mapping metadata & indexing     │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼ (ZK Circuit Execution)
┌─────────────────────────────────────────────────────────┐
│            COMPACT SMART CONTRACT (ON-CHAIN)            │
│  Authoritative for state, owner key digest, reward state │
└─────────────────────────────────────────────────────────┘
```

### 1. GitHub
Stores source code, commit history, pull request status, and merge events. GitHub remains an external source of truth.

### 2. Midnight Forge Backend / Sync Layer
Monitors GitHub PR activity, maps Midnight Contribution IDs to GitHub repositories and PR numbers, and streams real-time status updates to the UI.

### 3. Compact Smart Contract (`contract/src/midnight-forge.compact`)
Enforces resource-based authorization. A wallet address proves ownership or claimant identity using zero-knowledge secret key digests (`dappUserKey`). Manages the contribution lifecycle (`OPEN` → `CLAIMED` → `PR_SUBMITTED` → `MERGED` → `ACCEPTED` → `REWARDED`) and reward release eligibility (`UNFUNDED` → `FUNDED` → `RELEASABLE` → `RELEASED`).

## Privacy Model
Midnight Forge leverages Midnight’s ZK privacy to conceal the caller's raw secret key. Circuits evaluate a dApp-scoped digest (`dappUserKey`), enabling linkable authorization within Midnight Forge without exposing identities across other Midnight dApps.
