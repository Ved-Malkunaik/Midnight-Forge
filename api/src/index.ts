// This file is part of midnight-forge.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Provides types and utilities for working with Midnight Forge contracts & GitHub sync.
 *
 * @packageDocumentation
 */

import { type ContractAddress, toHex } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { type Logger } from 'pino';
import {
  type MidnightForgeContract,
  type MidnightForgeProviders,
  type DeployedMidnightForgeContract,
  midnightForgePrivateStateKey,
} from './common-types.js';
import { CompiledMidnightForgeContractContract } from '../../contract/src/index.js';
import * as utils from './utils/index.js';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { MidnightForgePrivateState, createMidnightForgePrivateState } from '../../contract/src/witnesses.js';

import { type Observable } from 'rxjs';
import { type MidnightForgeDerivedState } from './common-types.js';
import { ledger } from '../../contract/src/managed/midnight-forge/contract/index.js';

export interface DeployedMidnightForgeAPI {
  readonly deployedContractAddress: ContractAddress;
  readonly state$?: Observable<MidnightForgeDerivedState>;
  registerProject(params: {
    name: string;
    description: string;
    githubRepository: string;
    deploymentUrl?: string;
    improvementAreas: string[];
  }): Promise<string>;
  getProjects?(): Promise<Array<{
    projectId: string;
    owner: string;
    name: string;
    description: string;
    githubRepository: string;
    deploymentUrl: string;
    improvementAreas: string;
    createdAt: bigint;
  }>>;
  post?(message: string): Promise<void>;
  takeDown?(): Promise<void>;
}

export class MidnightForgeAPI implements DeployedMidnightForgeAPI {
  private constructor(
    public readonly deployedContract: DeployedMidnightForgeContract,
    private readonly providers: MidnightForgeProviders,
    private readonly logger?: Logger,
  ) {
    this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
    providers.privateStateProvider.setContractAddress(this.deployedContractAddress);
  }

  readonly deployedContractAddress: ContractAddress;

  async registerProject(params: {
    name: string;
    description: string;
    githubRepository: string;
    deploymentUrl?: string;
    improvementAreas: string[];
  }): Promise<string> {
    const projectId = utils.randomBytes(32);
    const transaction = await this.deployedContract.callTx.registerProject(
      projectId,
      params.name,
      params.description,
      params.githubRepository,
      params.deploymentUrl ?? '',
      params.improvementAreas.join(', '),
      BigInt(Date.now()),
    );

    console.log('[TX_TRACE] Step 5 - Transaction Submitted to Ledger. Public TxId:', transaction.public.txId);
    console.log('[TX_TRACE] Step 6 - Polling Indexer for Block Confirmation & Contract State...');

    let state = await this.providers.publicDataProvider.queryContractState(this.deployedContractAddress);
    let attempts = 0;
    const maxAttempts = 15;
    while (attempts < maxAttempts) {
      attempts++;
      if (state && state.data) {
        const projects = ledger(state.data).projects;
        if (projects.member(projectId)) {
          console.log(`[TX_TRACE] Step 7 SUCCESS - Project indexed on attempt ${attempts}!`, {
            txId: transaction.public.txId,
            contractAddress: this.deployedContractAddress,
            projectId: toHex(projectId),
          });
          const project = projects.lookup(projectId);
          if (
            project.name !== params.name ||
            project.description !== params.description ||
            project.githubRepository !== params.githubRepository ||
            project.deploymentUrl !== (params.deploymentUrl ?? '') ||
            project.improvementAreas !== params.improvementAreas.join(', ')
          ) {
            console.error('[TX_TRACE] Step 7 ERROR - Indexed project payload mismatch!');
            throw new Error('registerProject was finalized, but the indexed project data does not match the submitted data.');
          }
          return transaction.public.txId;
        }
      }
      console.log(`[TX_TRACE] Indexer poll attempt ${attempts}/${maxAttempts}: not indexed yet. Retrying in 3s...`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      state = await this.providers.publicDataProvider.queryContractState(this.deployedContractAddress);
    }

    console.error('[TX_TRACE] Step 6 ERROR - Transaction submitted but contract state not updated on indexer after 45s', {
      txId: transaction.public.txId,
      contractAddress: this.deployedContractAddress,
    });
    throw new Error('registerProject was submitted, but the contract state is not available from the indexer after 45 seconds.');
  }

  async getProjects(): Promise<Array<{
    projectId: string;
    owner: string;
    name: string;
    description: string;
    githubRepository: string;
    deploymentUrl: string;
    improvementAreas: string;
    createdAt: bigint;
  }>> {
    const state = await this.providers.publicDataProvider.queryContractState(this.deployedContractAddress);
    if (!state) return [];
    const projectsMap = ledger(state.data).projects;
    const result: Array<{
      projectId: string;
      owner: string;
      name: string;
      description: string;
      githubRepository: string;
      deploymentUrl: string;
      improvementAreas: string;
      createdAt: bigint;
    }> = [];
    for (const [key, proj] of projectsMap) {
      result.push({
        projectId: toHex(key),
        owner: toHex(proj.owner),
        name: proj.name,
        description: proj.description,
        githubRepository: proj.githubRepository,
        deploymentUrl: proj.deploymentUrl,
        improvementAreas: proj.improvementAreas,
        createdAt: proj.createdAt,
      });
    }
    return result;
  }

  static async deploy(providers: MidnightForgeProviders, logger?: Logger): Promise<MidnightForgeAPI> {
    logger?.info('Deploying Midnight Forge contract...');

    const deployedContract = await deployContract(providers, {
      compiledContract: CompiledMidnightForgeContractContract,
      privateStateId: midnightForgePrivateStateKey,
      initialPrivateState: createMidnightForgePrivateState(utils.randomBytes(32)),
    });

    logger?.info(`Midnight Forge contract deployed at address: ${deployedContract.deployTxData.public.contractAddress}`);

    return new MidnightForgeAPI(deployedContract, providers, logger);
  }

  static async join(
    providers: MidnightForgeProviders,
    contractAddress: ContractAddress,
    logger?: Logger,
  ): Promise<MidnightForgeAPI> {
    logger?.info({ joinContract: { contractAddress } });

    const deployedContract = await findDeployedContract<MidnightForgeContract>(providers, {
      contractAddress,
      compiledContract: CompiledMidnightForgeContractContract,
      privateStateId: midnightForgePrivateStateKey,
      initialPrivateState: await MidnightForgeAPI.getPrivateState(providers, contractAddress),
    });

    return new MidnightForgeAPI(deployedContract, providers, logger);
  }

  private static async getPrivateState(
    providers: MidnightForgeProviders,
    contractAddress: ContractAddress,
  ): Promise<MidnightForgePrivateState> {
    providers.privateStateProvider.setContractAddress(contractAddress);
    const existingPrivateState = await providers.privateStateProvider.get(midnightForgePrivateStateKey);
    return existingPrivateState ?? createMidnightForgePrivateState(utils.randomBytes(32));
  }
}

export * as utils from './utils/index.js';
export * from './common-types.js';
export * from './services/githubSync.js';

export type BBoardAPI = MidnightForgeAPI;
export const BBoardAPI = MidnightForgeAPI;
export type DeployedBBoardAPI = DeployedMidnightForgeAPI;
