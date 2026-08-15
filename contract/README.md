# Midnight Forge Smart Contract Layer

This package contains the official **Compact smart contract** and TypeScript bindings for **Midnight Forge**, a decentralized software contribution platform built on the Midnight Network.

---

## 1. Architecture Overview

Midnight Forge connects project owners (publishers) and developers (contributors) without centralized intermediaries or role-based access control lists (ACL). 

The smart contract layer enforces:
- **Project Registration**: Software projects/DApps published on-chain with metadata and improvement areas.
- **Contribution Lifecycle**: Issue creation, claiming, PR linking, merging, acceptance, and reward release.
- **Resource-Based Authorization**: Zero-knowledge proof of ownership derived from the user's dApp secret key without global admin or publisher roles.
- **Predefined Reward Logic**: Enforcing reward state transitions (`UNFUNDED` $\rightarrow$ `FUNDED` $\rightarrow$ `RELEASABLE` $\rightarrow$ `RELEASED`).
- **Off-Chain GitHub Boundary**: GitHub APIs remain off-chain in the API layer; the contract stores opaque string references.

---

## 2. File Structure

```
contract/
├── package.json                   # Contract package dependencies and npm scripts
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.build.json            # Build configuration for distribution
├── src/
│   ├── midnight-forge.compact     # Main Compact 0.23 smart contract source
│   ├── index.ts                   # Exported contract interfaces and CompiledContract asset loader
│   ├── witnesses.ts               # Private state definition and localSecretKey witness mapping
│   ├── managed/                   # COMPILER GENERATED ARTIFACTS (Do not edit manually)
│   │   └── midnight-forge/        # TypeScript bindings, ZKIR, proving keys, and contract metadata
│   └── test/
│       ├── utils.ts               # Cryptographic utility functions (randomBytes)
│       ├── midnight-forge-simulator.ts  # Contract simulator wrapper for test execution
│       └── midnight-forge.test.ts # Comprehensive Vitest test suite
```

---

## 3. Public Ledger State vs Private State

### Public Ledger State

The public ledger maintains two primary maps:

1. `ledger projects: Map<Bytes<32>, Project>`
   - `owner: Bytes<32>` (dApp-scoped public key digest)
   - `name: Opaque<"string">`
   - `description: Opaque<"string">`
   - `githubRepository: Opaque<"string">`
   - `deploymentUrl: Opaque<"string">`
   - `improvementAreas: Opaque<"string">`
   - `createdAt: Uint<64>`

2. `ledger contributions: Map<Bytes<32>, Contribution>`
   - `projectId: Bytes<32>`
   - `creator: Bytes<32>`
   - `title: Opaque<"string">`
   - `description: Opaque<"string">`
   - `difficulty: Difficulty` (`LOW`, `MEDIUM`, `HIGH`, `EXPERT`)
   - `rewardAmount: Uint<64>`
   - `status: ContributionStatus` (`OPEN`, `CLAIMED`, `PR_SUBMITTED`, `MERGED`, `ACCEPTED`, `REWARDED`)
   - `claimedBy: Bytes<32>`
   - `githubIssueReference: Opaque<"string">`
   - `githubPrReference: Opaque<"string">`
   - `rewardState: RewardState` (`UNFUNDED`, `FUNDED`, `RELEASABLE`, `RELEASED`)

### Private Witnesses & Privacy Model

- **Private Input**: `witness localSecretKey(): Bytes<32>`
  - Each actor keeps a 256-bit secret key private on their local device.
  - The secret key **never** leaves the local device or appears on the public ledger.
- **Zero-Knowledge Identity Proof**:
  - `dappUserKey(sk: Bytes<32>) = persistentHash([pad(32, "midnight-forge:user:"), pad(32, "core"), sk])`
  - Circuit `callerIdentity()` produces the dApp-scoped public identifier.
  - Authorization circuits compare `callerIdentity()` against `project.owner` or `contribution.claimedBy` in Zero Knowledge.
- **Selective Disclosure**:
  - Compact circuit arguments (such as project metadata, IDs, string references) are explicitly disclosed using `disclose(...)` only when required to update ledger state.

---

## 4. Contract Circuits (API)

| Circuit | Inputs | Authorization | State Transition / Description |
| :--- | :--- | :--- | :--- |
| `registerProject` | `projectId`, `name`, `description`, `githubRepository`, `deploymentUrl`, `improvementAreas`, `createdAt` | Anyone (caller becomes owner) | Inserts new project into `projects`. Fails if `projectId` exists. |
| `updateProject` | `projectId`, `name`, `description`, `githubRepository`, `deploymentUrl`, `improvementAreas` | `project.owner == callerIdentity()` | Updates project details. Fails if non-owner calls or project missing. |
| `getProject` | `projectId` | Public | Returns public `Project` struct from ledger. |
| `createContribution` | `contributionId`, `projectId`, `title`, `description`, `difficulty`, `rewardAmount`, `githubIssueReference`, `githubPrReference` | `project.owner == callerIdentity()` | Creates `Contribution` in `OPEN` & `UNFUNDED` state. Fails if caller is not project owner. |
| `claimContribution` | `contributionId` | Anyone except project owner | Transition `OPEN` $\rightarrow$ `CLAIMED`. Sets `claimedBy = callerIdentity()`. Self-dealing guard prevents project owner from claiming own project. |
| `submitContribution` | `contributionId`, `githubPrReference` | `contribution.claimedBy == callerIdentity()` | Transition `CLAIMED` $\rightarrow$ `PR_SUBMITTED`. Attaches PR reference. |
| `markContributionMerged` | `contributionId` | `project.owner == callerIdentity()` | Transition `PR_SUBMITTED` $\rightarrow$ `MERGED`. Called after PR is merged on GitHub. |
| `acceptContribution` | `contributionId` | `project.owner == callerIdentity()` | Transition `MERGED` $\rightarrow$ `ACCEPTED`. Updates `rewardState` $\rightarrow$ `RELEASABLE`. |
| `fundReward` | `contributionId` | `project.owner == callerIdentity()` | Sets `rewardState` $\rightarrow$ `FUNDED`. Fails if already funded or finalized. |
| `releaseReward` | `contributionId` | `contribution.claimedBy == callerIdentity()` | Transition `ACCEPTED` $\rightarrow$ `REWARDED` & `RELEASABLE` $\rightarrow$ `RELEASED`. Irreversible. |
| `getContribution` | `contributionId` | Public | Returns public `Contribution` struct from ledger. |

---

## 5. Contribution State Machine

```
              createContribution()
                       │
                       ▼
                    [ OPEN ]
                       │
                       │ claimContribution() (by Contributor)
                       ▼
                   [ CLAIMED ]
                       │
                       │ submitContribution() (with PR link)
                       ▼
                [ PR_SUBMITTED ]
                       │
                       │ markContributionMerged() (by Project Owner)
                       ▼
                   [ MERGED ]
                       │
                       │ acceptContribution() (by Project Owner)
                       ▼
                  [ ACCEPTED ]  <── (rewardState: RELEASABLE)
                       │
                       │ releaseReward() (by Contributor)
                       ▼
                  [ REWARDED ]  <── (rewardState: RELEASED)
```

---

## 6. GitHub Integration Boundary

The Compact smart contract **does not** invoke external HTTP APIs (e.g. `api.github.com`). 

Instead, the architecture strictly separates concerns:
1. **GitHub / API Layer**: Handles webhooks, OAuth, PR fetching, and CI checks.
2. **Compact Contract Layer**: Enforces ownership, contribution state transitions, acceptance proofs, and reward releases. Stores opaque string references (`githubIssueReference`, `githubPrReference`) to anchor off-chain activity to on-chain state.

---

## 7. Compilation & Testing

### Prerequisites
- Node.js >= 24.11.1
- Compact Compiler CLI `compact 0.5.1`

### Commands

```bash
# Compile Compact contract and generate TypeScript bindings & ZK artifacts
npm run compact

# Typecheck TypeScript source and tests
npm run typecheck

# Run full Vitest smart contract test suite
npm run test

# Build compiled TypeScript distribution
npm run build
```
