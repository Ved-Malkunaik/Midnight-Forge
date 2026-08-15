// This file is part of midnight-forge.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { describe, it, expect, beforeEach } from "vitest";
import { MidnightForgeSimulator } from "./midnight-forge-simulator.js";
import { Difficulty, ContributionStatus, RewardState } from "../index.js";
import { randomBytes } from "./utils.js";

describe("Midnight Forge Compact Smart Contract", () => {
  // Test secret keys for different actors
  const publisherSecretKey = randomBytes(32);
  const contributorSecretKey = randomBytes(32);
  const attackerSecretKey = randomBytes(32);

  let simulator: MidnightForgeSimulator;

  beforeEach(() => {
    simulator = new MidnightForgeSimulator(publisherSecretKey);
  });

  /* ======================================================================
   * 1. PROJECT REGISTRY TESTS
   * ====================================================================== */
  describe("Project Registry", () => {
    it("should allow a user to register a new project", () => {
      const projectId = randomBytes(32);
      const createdAt = 1700000000n;

      simulator.registerProject(
        projectId,
        "Midnight Forge",
        "Decentralized contribution platform",
        "https://github.com/midnight-ntwrk/midnight-forge",
        "https://forge.midnight.network",
        "Smart contracts, UI, API",
        createdAt,
        publisherSecretKey,
      );

      const project = simulator.getProject(projectId);
      expect(project.name).toBe("Midnight Forge");
      expect(project.description).toBe("Decentralized contribution platform");
      expect(project.githubRepository).toBe("https://github.com/midnight-ntwrk/midnight-forge");
      expect(project.deploymentUrl).toBe("https://forge.midnight.network");
      expect(project.improvementAreas).toBe("Smart contracts, UI, API");
      expect(project.createdAt).toBe(createdAt);
      expect(project.owner.length).toBe(32);
    });

    it("should allow the project owner to update project details", () => {
      const projectId = randomBytes(32);

      simulator.registerProject(
        projectId,
        "Midnight Forge",
        "Initial description",
        "https://github.com/midnight-ntwrk/midnight-forge",
        "https://forge.midnight.network",
        "Initial areas",
        1700000000n,
        publisherSecretKey,
      );

      simulator.updateProject(
        projectId,
        "Midnight Forge v2",
        "Updated description",
        "https://github.com/midnight-ntwrk/midnight-forge-v2",
        "https://v2.forge.midnight.network",
        "Privacy, ZKIR, Indexer",
        publisherSecretKey,
      );

      const updatedProject = simulator.getProject(projectId);
      expect(updatedProject.name).toBe("Midnight Forge v2");
      expect(updatedProject.description).toBe("Updated description");
      expect(updatedProject.githubRepository).toBe("https://github.com/midnight-ntwrk/midnight-forge-v2");
    });

    it("should reject project updates from non-owner actors", () => {
      const projectId = randomBytes(32);

      simulator.registerProject(
        projectId,
        "Midnight Forge",
        "Original description",
        "https://github.com/midnight-ntwrk/midnight-forge",
        "https://forge.midnight.network",
        "Areas",
        1700000000n,
        publisherSecretKey,
      );

      expect(() => {
        simulator.updateProject(
          projectId,
          "Hacked Name",
          "Hacked description",
          "https://github.com/attacker/repo",
          "https://hacked.com",
          "Hacked areas",
          attackerSecretKey,
        );
      }).toThrow("only the project owner can update the project");
    });

    it("should reject registering duplicate project IDs", () => {
      const projectId = randomBytes(32);

      simulator.registerProject(
        projectId,
        "Project Alpha",
        "Desc",
        "https://github.com/org/alpha",
        "https://alpha.org",
        "Areas",
        1700000000n,
        publisherSecretKey,
      );

      expect(() => {
        simulator.registerProject(
          projectId,
          "Project Alpha Duplicate",
          "Desc",
          "https://github.com/org/alpha",
          "https://alpha.org",
          "Areas",
          1700000000n,
          publisherSecretKey,
        );
      }).toThrow("project already exists");
    });
  });

  /* ======================================================================
   * 2. CONTRIBUTION REGISTRY TESTS
   * ====================================================================== */
  describe("Contribution Registry", () => {
    let projectId: Uint8Array;

    beforeEach(() => {
      projectId = randomBytes(32);
      simulator.registerProject(
        projectId,
        "Midnight Forge",
        "Decentralized contribution platform",
        "https://github.com/midnight-ntwrk/midnight-forge",
        "https://forge.midnight.network",
        "Smart contracts",
        1700000000n,
        publisherSecretKey,
      );
    });

    it("should allow the project owner to create a contribution opportunity", () => {
      const contributionId = randomBytes(32);

      simulator.createContribution(
        contributionId,
        projectId,
        "Implement Compact Circuits",
        "Write Compact smart contract logic and privacy circuits",
        Difficulty.HIGH,
        5000n,
        "issue-101",
        "",
        publisherSecretKey,
      );

      const contrib = simulator.getContribution(contributionId);
      expect(contrib.title).toBe("Implement Compact Circuits");
      expect(contrib.difficulty).toBe(Difficulty.HIGH);
      expect(contrib.rewardAmount).toBe(5000n);
      expect(contrib.status).toBe(ContributionStatus.OPEN);
      expect(contrib.rewardState).toBe(RewardState.UNFUNDED);
      expect(contrib.githubIssueReference).toBe("issue-101");
    });

    it("should prevent non-owners from creating contributions for a project", () => {
      const contributionId = randomBytes(32);

      expect(() => {
        simulator.createContribution(
          contributionId,
          projectId,
          "Unauthorized Contribution",
          "Description",
          Difficulty.LOW,
          1000n,
          "issue-999",
          "",
          attackerSecretKey,
        );
      }).toThrow("only the project owner can create a contribution");
    });

    it("should allow a contributor to claim an OPEN contribution", () => {
      const contributionId = randomBytes(32);

      simulator.createContribution(
        contributionId,
        projectId,
        "Fix ZK Witness",
        "Bug in local secret key witness",
        Difficulty.MEDIUM,
        2500n,
        "issue-202",
        "",
        publisherSecretKey,
      );

      simulator.claimContribution(contributionId, contributorSecretKey);

      const contrib = simulator.getContribution(contributionId);
      expect(contrib.status).toBe(ContributionStatus.CLAIMED);
      expect(contrib.claimedBy.length).toBe(32);
    });

    it("should prevent project owner from claiming their own contribution (self-dealing guard)", () => {
      const contributionId = randomBytes(32);

      simulator.createContribution(
        contributionId,
        projectId,
        "Fix Bug",
        "Description",
        Difficulty.LOW,
        1000n,
        "issue-303",
        "",
        publisherSecretKey,
      );

      expect(() => {
        simulator.claimContribution(contributionId, publisherSecretKey);
      }).toThrow("project owner cannot claim their own contribution");
    });

    it("should prevent a second contributor from claiming an already CLAIMED contribution", () => {
      const contributionId = randomBytes(32);

      simulator.createContribution(
        contributionId,
        projectId,
        "Exclusive Task",
        "Description",
        Difficulty.HIGH,
        3000n,
        "issue-404",
        "",
        publisherSecretKey,
      );

      simulator.claimContribution(contributionId, contributorSecretKey);

      expect(() => {
        simulator.claimContribution(contributionId, attackerSecretKey);
      }).toThrow("contribution is not open");
    });
  });

  /* ======================================================================
   * 3. CONTRIBUTION LIFECYCLE & ACCEPTANCE TESTS
   * ====================================================================== */
  describe("Contribution Lifecycle & Acceptance", () => {
    let projectId: Uint8Array;
    let contributionId: Uint8Array;

    beforeEach(() => {
      projectId = randomBytes(32);
      contributionId = randomBytes(32);

      simulator.registerProject(
        projectId,
        "Midnight Forge",
        "Platform",
        "https://github.com/midnight-ntwrk/midnight-forge",
        "https://forge.midnight.network",
        "Circuits",
        1700000000n,
        publisherSecretKey,
      );

      simulator.createContribution(
        contributionId,
        projectId,
        "Add Tests",
        "Write full test suite",
        Difficulty.MEDIUM,
        2000n,
        "issue-555",
        "",
        publisherSecretKey,
      );
    });

    it("should progress through full valid lifecycle: OPEN -> CLAIMED -> PR_SUBMITTED -> MERGED -> ACCEPTED -> REWARDED", () => {
      // 1. Contributor claims contribution (OPEN -> CLAIMED)
      simulator.claimContribution(contributionId, contributorSecretKey);
      let contrib = simulator.getContribution(contributionId);
      expect(contrib.status).toBe(ContributionStatus.CLAIMED);

      // 2. Contributor submits PR reference (CLAIMED -> PR_SUBMITTED)
      simulator.submitContribution(contributionId, "pr-42", contributorSecretKey);
      contrib = simulator.getContribution(contributionId);
      expect(contrib.status).toBe(ContributionStatus.PR_SUBMITTED);
      expect(contrib.githubPrReference).toBe("pr-42");

      // 3. Project owner marks PR merged (PR_SUBMITTED -> MERGED)
      simulator.markContributionMerged(contributionId, publisherSecretKey);
      contrib = simulator.getContribution(contributionId);
      expect(contrib.status).toBe(ContributionStatus.MERGED);

      // 4. Project owner accepts contribution (MERGED -> ACCEPTED, RewardState -> RELEASABLE)
      simulator.acceptContribution(contributionId, publisherSecretKey);
      contrib = simulator.getContribution(contributionId);
      expect(contrib.status).toBe(ContributionStatus.ACCEPTED);
      expect(contrib.rewardState).toBe(RewardState.RELEASABLE);

      // 5. Contributor releases reward (ACCEPTED -> REWARDED, RewardState -> RELEASED)
      simulator.releaseReward(contributionId, contributorSecretKey);
      contrib = simulator.getContribution(contributionId);
      expect(contrib.status).toBe(ContributionStatus.REWARDED);
      expect(contrib.rewardState).toBe(RewardState.RELEASED);
    });

    it("should prevent submitting PR reference by non-claimant", () => {
      simulator.claimContribution(contributionId, contributorSecretKey);

      expect(() => {
        simulator.submitContribution(contributionId, "pr-attacker", attackerSecretKey);
      }).toThrow("only the claimant can submit a pull request reference");
    });

    it("should prevent marking contribution merged by non-owner", () => {
      simulator.claimContribution(contributionId, contributorSecretKey);
      simulator.submitContribution(contributionId, "pr-42", contributorSecretKey);

      expect(() => {
        simulator.markContributionMerged(contributionId, attackerSecretKey);
      }).toThrow("only the project owner can mark a contribution as merged");
    });

    it("should prevent accepting contribution before it is merged", () => {
      simulator.claimContribution(contributionId, contributorSecretKey);
      simulator.submitContribution(contributionId, "pr-42", contributorSecretKey);

      expect(() => {
        simulator.acceptContribution(contributionId, publisherSecretKey);
      }).toThrow("contribution must be merged before it can be accepted");
    });

    it("should prevent accepting contribution by non-owner", () => {
      simulator.claimContribution(contributionId, contributorSecretKey);
      simulator.submitContribution(contributionId, "pr-42", contributorSecretKey);
      simulator.markContributionMerged(contributionId, publisherSecretKey);

      expect(() => {
        simulator.acceptContribution(contributionId, attackerSecretKey);
      }).toThrow("only the project owner can accept a contribution");
    });
  });

  /* ======================================================================
   * 4. REWARD MANAGEMENT & PROTECTION TESTS
   * ====================================================================== */
  describe("Reward Management & Protection", () => {
    let projectId: Uint8Array;
    let contributionId: Uint8Array;

    beforeEach(() => {
      projectId = randomBytes(32);
      contributionId = randomBytes(32);

      simulator.registerProject(
        projectId,
        "Midnight Forge",
        "Platform",
        "https://github.com/midnight-ntwrk/midnight-forge",
        "https://forge.midnight.network",
        "Escrow",
        1700000000n,
        publisherSecretKey,
      );

      simulator.createContribution(
        contributionId,
        projectId,
        "Security Audit",
        "Perform zero knowledge proof security audit",
        Difficulty.EXPERT,
        10000n,
        "issue-777",
        "",
        publisherSecretKey,
      );
    });

    it("should allow project owner to fund reward", () => {
      simulator.fundReward(contributionId, publisherSecretKey);
      const contrib = simulator.getContribution(contributionId);
      expect(contrib.rewardState).toBe(RewardState.FUNDED);
    });

    it("should reject double funding of a reward", () => {
      simulator.fundReward(contributionId, publisherSecretKey);
      expect(() => {
        simulator.fundReward(contributionId, publisherSecretKey);
      }).toThrow("reward is already funded");
    });

    it("should prevent releasing reward before acceptance", () => {
      simulator.claimContribution(contributionId, contributorSecretKey);
      simulator.submitContribution(contributionId, "pr-777", contributorSecretKey);
      simulator.markContributionMerged(contributionId, publisherSecretKey);

      // Status is MERGED, not ACCEPTED
      expect(() => {
        simulator.releaseReward(contributionId, contributorSecretKey);
      }).toThrow("contribution must be accepted before the reward can be released");
    });

    it("should prevent non-claimant from releasing reward", () => {
      simulator.claimContribution(contributionId, contributorSecretKey);
      simulator.submitContribution(contributionId, "pr-777", contributorSecretKey);
      simulator.markContributionMerged(contributionId, publisherSecretKey);
      simulator.acceptContribution(contributionId, publisherSecretKey);

      expect(() => {
        simulator.releaseReward(contributionId, attackerSecretKey);
      }).toThrow("only the contributing claimant can receive the reward");
    });

    it("should prevent double release of a reward", () => {
      simulator.claimContribution(contributionId, contributorSecretKey);
      simulator.submitContribution(contributionId, "pr-777", contributorSecretKey);
      simulator.markContributionMerged(contributionId, publisherSecretKey);
      simulator.acceptContribution(contributionId, publisherSecretKey);

      // First release succeeds
      simulator.releaseReward(contributionId, contributorSecretKey);

      // Second release fails
      expect(() => {
        simulator.releaseReward(contributionId, contributorSecretKey);
      }).toThrow("contribution must be accepted before the reward can be released");
    });
  });

  /* ======================================================================
   * 5. PRIVACY MODEL & AUTHORIZATION TESTS
   * ====================================================================== */
  describe("Privacy & Resource Authorization", () => {
    it("should derive unique, non-clashing dApp user keys for different secret keys", () => {
      const projId1 = randomBytes(32);
      const projId2 = randomBytes(32);

      simulator.registerProject(
        projId1,
        "Project 1",
        "Desc",
        "Repo 1",
        "Url 1",
        "Area 1",
        1000n,
        publisherSecretKey,
      );

      simulator.registerProject(
        projId2,
        "Project 2",
        "Desc",
        "Repo 2",
        "Url 2",
        "Area 2",
        1000n,
        contributorSecretKey,
      );

      const p1 = simulator.getProject(projId1);
      const p2 = simulator.getProject(projId2);

      expect(p1.owner).not.toEqual(p2.owner);
      expect(p1.owner.length).toBe(32);
      expect(p2.owner.length).toBe(32);
    });
  });
});
