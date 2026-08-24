# Midnight Forge — Predefined Reward & Transfer Workflow

## Fixed Reward Policy
Rewards are defined up front by the project owner during contribution creation (e.g. `50 NIGHT`). Contributors see the exact reward amount before claiming a task.

## Reward Lifecycle States
1. **UNFUNDED**: Contribution created with predefined reward amount.
2. **FUNDED**: Publisher commits funds to reward state.
3. **RELEASABLE**: Set automatically when publisher executes `acceptContribution()` after reviewing a merged PR.
4. **RELEASED**: Contributor or authorized wallet executes `releaseReward()`, transferring assets to contributor's wallet address.

## Transaction Progression UX
Every reward release follows a 5-step transparent transaction workflow:
- **Step 1**: Contribution Accepted ✓
- **Step 2**: Preparing Reward Parameters ✓
- **Step 3**: Wallet Authorization → Awaiting 1AM signature
- **Step 4**: Transfer Submitted → Broadcasting ZK transaction to Preprod network
- **Step 5**: Transfer Confirmed ✓ Assets credited to contributor account; 64-character transaction reference displayed.
