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

import {
  createCircuitContext,
  createConstructorContext,
  dummyContractAddress,
  CircuitContext,
} from "@midnight-ntwrk/compact-runtime";
import {
  Contract,
  Ledger,
  MidnightForgePrivateState,
  createMidnightForgePrivateState,
  witnesses as baseWitnesses,
  Difficulty,
  ledger,
} from "../index.js";

import { encodeCoinPublicKey } from "@midnight-ntwrk/ledger-v8";

export class MidnightForgeSimulator {
  private contract: Contract<MidnightForgePrivateState>;
  private circuitContext: CircuitContext<MidnightForgePrivateState>;
  private coinPublicKey: ReturnType<typeof encodeCoinPublicKey>;
  private contractAddress: string;

  constructor(initialSecretKey: Uint8Array) {
    const privateState = createMidnightForgePrivateState(initialSecretKey);
    this.contract = new Contract<MidnightForgePrivateState>(baseWitnesses);
    this.contractAddress = dummyContractAddress();
    this.coinPublicKey = encodeCoinPublicKey("00".repeat(32));

    const constructorCtx = createConstructorContext(privateState, this.coinPublicKey as any);
    const constructorRes = this.contract.initialState(constructorCtx);

    this.circuitContext = createCircuitContext(
      this.contractAddress,
      this.coinPublicKey as any,
      constructorRes.currentContractState.data,
      privateState,
    );
  }

  public getLedger(): Ledger {
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public switchActor(secretKey: Uint8Array): void {
    const newPrivateState = createMidnightForgePrivateState(secretKey);
    this.circuitContext = createCircuitContext(
      this.contractAddress,
      this.coinPublicKey as any,
      this.circuitContext.currentQueryContext.state,
      newPrivateState,
    );
  }

  public registerProject(
    projectId: Uint8Array,
    name: string,
    description: string,
    githubRepository: string,
    deploymentUrl: string,
    improvementAreas: string,
    createdAt: bigint,
    actorSecretKey?: Uint8Array,
  ) {
    if (actorSecretKey) {
      this.switchActor(actorSecretKey);
    }
    const res = this.contract.impureCircuits.registerProject(
      this.circuitContext,
      projectId,
      name,
      description,
      githubRepository,
      deploymentUrl,
      improvementAreas,
      createdAt,
    );
    this.circuitContext = res.context;
    return res.result;
  }

  public updateProject(
    projectId: Uint8Array,
    name: string,
    description: string,
    githubRepository: string,
    deploymentUrl: string,
    improvementAreas: string,
    actorSecretKey?: Uint8Array,
  ) {
    if (actorSecretKey) {
      this.switchActor(actorSecretKey);
    }
    const res = this.contract.impureCircuits.updateProject(
      this.circuitContext,
      projectId,
      name,
      description,
      githubRepository,
      deploymentUrl,
      improvementAreas,
    );
    this.circuitContext = res.context;
    return res.result;
  }

  public getProject(projectId: Uint8Array, actorSecretKey?: Uint8Array) {
    if (actorSecretKey) {
      this.switchActor(actorSecretKey);
    }
    const res = this.contract.impureCircuits.getProject(
      this.circuitContext,
      projectId,
    );
    this.circuitContext = res.context;
    return res.result;
  }

  public createContribution(
    contributionId: Uint8Array,
    projectId: Uint8Array,
    title: string,
    description: string,
    difficulty: Difficulty,
    rewardAmount: bigint,
    githubIssueReference: string,
    githubPrReference: string,
    actorSecretKey?: Uint8Array,
  ) {
    if (actorSecretKey) {
      this.switchActor(actorSecretKey);
    }
    const res = this.contract.impureCircuits.createContribution(
      this.circuitContext,
      contributionId,
      projectId,
      title,
      description,
      difficulty,
      rewardAmount,
      githubIssueReference,
      githubPrReference,
    );
    this.circuitContext = res.context;
    return res.result;
  }

  public claimContribution(
    contributionId: Uint8Array,
    actorSecretKey?: Uint8Array,
  ) {
    if (actorSecretKey) {
      this.switchActor(actorSecretKey);
    }
    const res = this.contract.impureCircuits.claimContribution(
      this.circuitContext,
      contributionId,
    );
    this.circuitContext = res.context;
    return res.result;
  }

  public submitContribution(
    contributionId: Uint8Array,
    githubPrReference: string,
    actorSecretKey?: Uint8Array,
  ) {
    if (actorSecretKey) {
      this.switchActor(actorSecretKey);
    }
    const res = this.contract.impureCircuits.submitContribution(
      this.circuitContext,
      contributionId,
      githubPrReference,
    );
    this.circuitContext = res.context;
    return res.result;
  }

  public markContributionMerged(
    contributionId: Uint8Array,
    actorSecretKey?: Uint8Array,
  ) {
    if (actorSecretKey) {
      this.switchActor(actorSecretKey);
    }
    const res = this.contract.impureCircuits.markContributionMerged(
      this.circuitContext,
      contributionId,
    );
    this.circuitContext = res.context;
    return res.result;
  }

  public acceptContribution(
    contributionId: Uint8Array,
    actorSecretKey?: Uint8Array,
  ) {
    if (actorSecretKey) {
      this.switchActor(actorSecretKey);
    }
    const res = this.contract.impureCircuits.acceptContribution(
      this.circuitContext,
      contributionId,
    );
    this.circuitContext = res.context;
    return res.result;
  }

  public fundReward(
    contributionId: Uint8Array,
    actorSecretKey?: Uint8Array,
  ) {
    if (actorSecretKey) {
      this.switchActor(actorSecretKey);
    }
    const res = this.contract.impureCircuits.fundReward(
      this.circuitContext,
      contributionId,
    );
    this.circuitContext = res.context;
    return res.result;
  }

  public releaseReward(
    contributionId: Uint8Array,
    actorSecretKey?: Uint8Array,
  ) {
    if (actorSecretKey) {
      this.switchActor(actorSecretKey);
    }
    const res = this.contract.impureCircuits.releaseReward(
      this.circuitContext,
      contributionId,
    );
    this.circuitContext = res.context;
    return res.result;
  }

  public getContribution(contributionId: Uint8Array, actorSecretKey?: Uint8Array) {
    if (actorSecretKey) {
      this.switchActor(actorSecretKey);
    }
    const res = this.contract.impureCircuits.getContribution(
      this.circuitContext,
      contributionId,
    );
    this.circuitContext = res.context;
    return res.result;
  }
}
