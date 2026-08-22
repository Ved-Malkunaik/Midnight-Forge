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
 * Midnight Forge common types and abstractions.
 *
 * @module
 */

import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import type { MidnightForgePrivateState, Contract, Witnesses } from '../../contract/src/index';

export const midnightForgePrivateStateKey = 'midnightForgePrivateState';
export type PrivateStateId = typeof midnightForgePrivateStateKey;

export type PrivateStates = {
  readonly midnightForgePrivateState: MidnightForgePrivateState;
};

export type MidnightForgeContract = Contract<MidnightForgePrivateState, Witnesses<MidnightForgePrivateState>>;

export type MidnightForgeCircuitKeys = Exclude<keyof MidnightForgeContract['impureCircuits'], number | symbol>;

export type MidnightForgeProviders = MidnightProviders<
  MidnightForgeCircuitKeys,
  PrivateStateId,
  MidnightForgePrivateState
>;

export type DeployedMidnightForgeContract = FoundContract<MidnightForgeContract>;

export type MidnightForgeDerivedState = {
  state: number;
  message?: string;
  isOwner?: boolean;
};

export type BBoardCircuitKeys = MidnightForgeCircuitKeys;
export type BBoardProviders = MidnightForgeProviders;
export type BBoardDerivedState = MidnightForgeDerivedState;

