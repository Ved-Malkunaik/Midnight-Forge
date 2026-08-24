# Midnight Forge — User & Developer Guide

## Overview
Midnight Forge is a decentralized software contribution marketplace built on the Midnight Network. It enables software authors to publish repositories, invite contributors, track pull requests, and release predefined Midnight token rewards.

## Prerequisites
- Node.js v20+ or v24+
- 1AM / Midnight Lace Wallet browser extension
- Midnight Preprod Network configuration

## User Flow

### 1. Publishing a Software Project
1. Navigate to `/publish`.
2. Connect your 1AM wallet.
3. Enter Project Name, Category, Summary, GitHub Repository URL (`https://github.com/org/repo`), and Technology Tags.
4. Click **Publish Project**.
5. Approve the zero-knowledge proof transaction in your 1AM wallet.
6. Once confirmed on-chain, your project appears in the marketplace (`/explore`).

### 2. Creating Contribution Opportunities
1. Navigate to your project management workspace (`/projects/:id/manage`).
2. Click **Create Opportunity**.
3. Specify Task Title, Requirements, Difficulty, and Predefined Reward Amount (e.g. `50 NIGHT`).
4. Click **Create Task**. The contract initializes the task in the `OPEN` state.

### 3. Claiming & Contributing
1. As a contributor, browse `/explore` and open a task at `/contributions/:id`.
2. Click **Claim Contribution** and approve with your 1AM wallet.
3. Work on GitHub, open a Pull Request, and submit the PR reference on Midnight Forge.
4. The real-time GitHub PR tracker displays your PR status (`OPEN` → `IN_REVIEW` → `APPROVED` → `MERGED`).

### 4. Publisher Acceptance & Reward Release
1. Once the PR is merged on GitHub, the project owner reviews the submission and clicks **Mark Merged** and **Accept Contribution**.
2. On acceptance, the contribution state becomes `ACCEPTED` and the reward state becomes `RELEASABLE`.
3. The publisher authorizes reward release, triggering the Midnight asset transfer to the contributor's wallet.
4. Confirmed transaction hash details and updated wallet balances appear in the contributor dashboard (`/dashboard/contributor`).

### 5. Providing Feedback
1. Visit `/feedback` to submit experience ratings, bug reports, and suggestions to the Midnight Forge team via Google Forms.
