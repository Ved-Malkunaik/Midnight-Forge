// This file is part of midnight-forge.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Provides types and utilities for working with Midnight Forge contracts.
 *
 * @packageDocumentation
 */

import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
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

export interface DeployedMidnightForgeAPI {
  readonly deployedContractAddress: ContractAddress;
  readonly state$?: Observable<MidnightForgeDerivedState>;
  post?(message: string): Promise<void>;
  takeDown?(): Promise<void>;
}

export class MidnightForgeAPI implements DeployedMidnightForgeAPI {
  private constructor(
    public readonly deployedContract: DeployedMidnightForgeContract,
    providers: MidnightForgeProviders,
    private readonly logger?: Logger,
  ) {
    this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
    providers.privateStateProvider.setContractAddress(this.deployedContractAddress);
  }

  readonly deployedContractAddress: ContractAddress;

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

export type BBoardAPI = MidnightForgeAPI;
export const BBoardAPI = MidnightForgeAPI;
export type DeployedBBoardAPI = DeployedMidnightForgeAPI;

