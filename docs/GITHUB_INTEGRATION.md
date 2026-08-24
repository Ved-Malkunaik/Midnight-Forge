# Midnight Forge — GitHub Integration & PR Synchronization

## Overview
GitHub is the primary platform for code collaboration. Midnight Forge connects to GitHub to monitor pull request progress and synchronize pull request status into the product in near-realtime.

## Data Mapping

```
Midnight Contribution ID ↔ GitHub Repo ↔ Issue ↔ PR Number ↔ Contributor Wallet ↔ Reward Amount ↔ Midnight Tx Hash
```

## Real-time PR Tracker
The product displays a dedicated GitHub PR Tracker widget on contribution detail pages:
- **Repository**: `org/repo`
- **GitHub PR Status**: `OPEN` | `IN_REVIEW` | `APPROVED` | `MERGED`
- **Pull Request Link**: Clickable link to GitHub PR
- **Last Synced**: Real-time timestamp

## Webhook & Idempotency Protection
The backend API accepts GitHub webhook events (`pull_request.opened`, `pull_request.closed`, `pull_request.review_submitted`).
To prevent duplicate processing:
- Each webhook carries a unique event ID (`X-GitHub-Delivery`).
- The API maintains an event cache to guarantee idempotent processing.
- GitHub merge events set the contribution UI state to `MERGED` but **do not** automatically transfer funds. Explicit publisher confirmation is required.
