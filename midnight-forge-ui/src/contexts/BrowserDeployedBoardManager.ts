// This file is part of midnightntwrk/example-bboard.
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

import {
  BBoardAPI,
  type BBoardCircuitKeys,
  type BBoardProviders,
  type DeployedBBoardAPI,
} from '../../../api/src/index';
import { type ContractAddress, fromHex, toHex } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  filter,
  firstValueFrom,
  interval,
  map,
  type Observable,
  take,
  tap,
  throwError,
  timeout,
} from 'rxjs';
import { pipe as fnPipe } from 'fp-ts/function';
import { type Logger } from 'pino';
import { ConnectedAPI, type InitialAPI } from '@midnight-ntwrk/dapp-connector-api';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import semver from 'semver';
import {
  Binding,
  FinalizedTransaction,
  Proof,
  SignatureEnabled,
  Transaction,
  TransactionId,
} from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { MidnightForgePrivateState as BBoardPrivateState } from '../../../contract/src/index.js';
import { inMemoryPrivateStateProvider } from '../in-memory-private-state-provider';
import { NetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import type { UnboundTransaction } from '@midnight-ntwrk/midnight-js-types';
import { getContractAddress, getNetworkId } from '../config';
import { contractService, type TxProgress } from '../services/contract/contractService';

/**
 * An in-progress bulletin board deployment.
 */
export interface InProgressBoardDeployment {
  readonly status: 'in-progress';
}

/**
 * A deployed bulletin board deployment.
 */
export interface DeployedBoardDeployment {
  readonly status: 'deployed';

  /**
   * The {@link DeployedBBoardAPI} instance when connected to an on network bulletin board contract.
   */
  readonly api: DeployedBBoardAPI;
}

/**
 * A failed bulletin board deployment.
 */
export interface FailedBoardDeployment {
  readonly status: 'failed';

  /**
   * The error that caused the deployment to fail.
   */
  readonly error: Error;
}

/**
 * A bulletin board deployment.
 */
export type BoardDeployment = InProgressBoardDeployment | DeployedBoardDeployment | FailedBoardDeployment;

/**
 * Provides access to bulletin board deployments.
 */
export interface DeployedBoardAPIProvider {
  /**
   * Gets the observable set of board deployments.
   *
   * @remarks
   * This property represents an observable array of {@link BoardDeployment}, each also an
   * observable. Changes to the array will be emitted as boards are resolved (deployed or joined),
   * while changes to each underlying board can be observed via each item in the array.
   */
  readonly boardDeployments$: Observable<Array<Observable<BoardDeployment>>>;
  registerProject(
    params: Parameters<DeployedBBoardAPI['registerProject']>[0],
    onProgress?: (progress: TxProgress) => void,
  ): Promise<string>;

  /**
   * Joins or deploys a bulletin board contract.
   *
   * @param contractAddress An optional contract address to use when resolving.
   * @returns An observable board deployment.
   *
   * @remarks
   * For a given `contractAddress`, the method will attempt to find and join the identified bulletin board
   * contract; otherwise it will attempt to deploy a new one.
   */
  readonly resolve: (contractAddress?: ContractAddress) => Observable<BoardDeployment>;
}

/**
 * A {@link DeployedBoardAPIProvider} that manages bulletin board deployments in a browser setting.
 *
 * @remarks
 * {@link BrowserDeployedBoardManager} configures and manages a connection to the Midnight Lace
 * wallet, along with a collection of additional providers that work in a web-browser setting.
 */
export class BrowserDeployedBoardManager implements DeployedBoardAPIProvider {
  readonly #boardDeploymentsSubject: BehaviorSubject<Array<BehaviorSubject<BoardDeployment>>>;
  #initializedProviders: Promise<BBoardProviders> | undefined;

  /**
   * Initializes a new {@link BrowserDeployedBoardManager} instance.
   *
   * @param logger The `pino` logger to for logging.
   */
  constructor(private readonly logger: Logger) {
    this.#boardDeploymentsSubject = new BehaviorSubject<Array<BehaviorSubject<BoardDeployment>>>([]);
    this.boardDeployments$ = this.#boardDeploymentsSubject;
  }

  /** @inheritdoc */
  readonly boardDeployments$: Observable<Array<Observable<BoardDeployment>>>;

  async registerProject(
    params: Parameters<DeployedBBoardAPI['registerProject']>[0],
    onProgress?: (progress: TxProgress) => void,
  ): Promise<string> {
    const contractAddress = getContractAddress();
    if (!contractAddress) {
      const error = new Error('No deployed Midnight Forge Preprod contract is configured. Set VITE_MIDNIGHT_FORGE_CONTRACT_ADDRESS.');
      onProgress?.({ step: 'failed', error: error.message, message: error.message });
      throw error;
    }

    onProgress?.({ step: 'approving', message: 'Requesting 1AM wallet confirmation...' });
    try {
      const deployment = await firstValueFrom(
        this.resolve(contractAddress).pipe(
          filter((item): item is DeployedBoardDeployment | FailedBoardDeployment =>
            item.status === 'deployed' || item.status === 'failed',
          ),
          map((item) => {
            if (item.status === 'failed') {
              throw item.error;
            }
            return item;
          }),
          timeout({
            first: 180_000,
            with: () =>
              throwError(
                () =>
                  new Error(
                    `Timed out initializing the Midnight contract client for ${getContractAddress()} on ${getNetworkId()}. Check the wallet network and indexer configuration.`,
                  ),
              ),
          }),
        ),
      );
      onProgress?.({ step: 'submitting', message: 'Submitting registerProject transaction to Midnight Preprod...' });
      const txHash = await deployment.api.registerProject(params);
      onProgress?.({ step: 'confirming', txHash, message: 'Awaiting block confirmation on Midnight Network...' });
      return txHash;
    } catch (err: unknown) {
      this.logger.error({ err }, 'Midnight contract execution failed');
      const errorMessage = err instanceof Error ? err.message : String(err);
      onProgress?.({ step: 'failed', error: errorMessage, message: errorMessage });
      throw err;
    }
  }

  /** @inheritdoc */
  resolve(contractAddress?: ContractAddress): Observable<BoardDeployment> {
    const deployments = this.#boardDeploymentsSubject.value;
    let deployment = deployments.find(
      (deployment) =>
        deployment.value.status === 'deployed' && deployment.value.api.deployedContractAddress === contractAddress,
    );

    if (deployment) {
      return deployment;
    }

    deployment = new BehaviorSubject<BoardDeployment>({
      status: 'in-progress',
    });

    if (contractAddress) {
      void this.joinDeployment(deployment, contractAddress);
    } else {
      void this.deployDeployment(deployment);
    }

    this.#boardDeploymentsSubject.next([...deployments, deployment]);

    return deployment;
  }

  private getProviders(): Promise<BBoardProviders> {
    // We use a cached `Promise` to hold the providers. This will:
    //
    // 1. Cache and re-use the providers (including the configured connector API), and
    // 2. Act as a synchronization point if multiple contract deploys or joins run concurrently.
    //    Concurrent calls to `getProviders()` will receive, and ultimately await, the same
    //    `Promise`.
    return this.#initializedProviders ?? (this.#initializedProviders = initializeProviders(this.logger));
  }

  private async deployDeployment(deployment: BehaviorSubject<BoardDeployment>): Promise<void> {
    try {
      const providers = await this.getProviders();
      this.logger.info('Deploying Midnight Forge contract on Midnight Network via 1AM wallet...');
      const api = await BBoardAPI.deploy(providers, this.logger);
      if (typeof window !== 'undefined' && api.deployedContractAddress) {
        localStorage.setItem('midnight_forge_deployed_contract_address', api.deployedContractAddress);
      }

      deployment.next({
        status: 'deployed',
        api,
      });
    } catch (error: unknown) {
      deployment.next({
        status: 'failed',
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }

  private async joinDeployment(
    deployment: BehaviorSubject<BoardDeployment>,
    contractAddress: ContractAddress,
  ): Promise<void> {
    try {
      const providers = await this.getProviders();
      const contractState = await providers.publicDataProvider.queryContractState(contractAddress);
      
      if (!contractState) {
        this.logger.info(
          { contractAddress },
          'No existing contract state found on network indexer for this address. Deploying contract on Preprod via 1AM wallet...',
        );
        const api = await BBoardAPI.deploy(providers, this.logger);
        if (typeof window !== 'undefined' && api.deployedContractAddress) {
          localStorage.setItem('midnight_forge_deployed_contract_address', api.deployedContractAddress);
        }
        deployment.next({
          status: 'deployed',
          api,
        });
        return;
      }

      const api = await BBoardAPI.join(providers, contractAddress, this.logger);
      if (typeof window !== 'undefined' && api.deployedContractAddress) {
        localStorage.setItem('midnight_forge_deployed_contract_address', api.deployedContractAddress);
      }

      deployment.next({
        status: 'deployed',
        api,
      });
    } catch (error: unknown) {
      const joinError = error instanceof Error ? error : new Error(String(error));
      this.logger.warn({ err: joinError, contractAddress }, 'Failed to join configured contract. Deploying contract via 1AM wallet...');
      try {
        const providers = await this.getProviders();
        const api = await BBoardAPI.deploy(providers, this.logger);
        if (typeof window !== 'undefined' && api.deployedContractAddress) {
          localStorage.setItem('midnight_forge_deployed_contract_address', api.deployedContractAddress);
        }
        deployment.next({
          status: 'deployed',
          api,
        });
      } catch (deployError: unknown) {
        const finalError = deployError instanceof Error ? deployError : new Error(String(deployError));
        this.logger.error({ err: finalError }, 'Failed to deploy Midnight Forge contract via 1AM wallet');
        deployment.next({
          status: 'failed',
          error: finalError,
        });
      }
    }
  }
}

/** @internal */
const initializeProviders = async (logger: Logger): Promise<BBoardProviders> => {
  const networkId = import.meta.env.VITE_NETWORK_ID as NetworkId;
  const connectedAPI = await connectToWallet(logger, networkId);
  const zkConfigPath = window.location.origin; // '../../../contract/src/managed/bboard';
  const keyMaterialProvider = new FetchZkConfigProvider<BBoardCircuitKeys>(zkConfigPath, fetch.bind(window));
  const config = await connectedAPI.getConfiguration();
  const expectedNetworkId = networkId.toLowerCase();
  const effectiveIndexerUri = config.indexerUri;
  const effectiveIndexerWsUri = config.indexerWsUri;
  const effectiveProverServerUri = config.proverServerUri;
  const indexerMatchesNetwork = [effectiveIndexerUri, effectiveIndexerWsUri]
    .filter((uri): uri is string => !!uri)
    .every((uri) => uri.toLowerCase().includes(expectedNetworkId));

  if (import.meta.env.DEV) {
    logger.info(
      {
        networkId,
        indexerUri: effectiveIndexerUri,
        indexerWsUri: effectiveIndexerWsUri,
        proverServerUri: effectiveProverServerUri,
        contractAddress: getContractAddress(),
      },
      'Effective Midnight transaction configuration',
    );
  }

  if (!indexerMatchesNetwork) {
    throw new Error(
      `Wallet indexer configuration does not match ${networkId}: indexer=${effectiveIndexerUri}, websocket=${effectiveIndexerWsUri}`,
    );
  }

  const inMemoryBBoardPrivateStateProvider = inMemoryPrivateStateProvider<string, BBoardPrivateState>();
  const shieldedAddresses = await connectedAPI.getShieldedAddresses();
  return {
    privateStateProvider: inMemoryBBoardPrivateStateProvider,
    zkConfigProvider: keyMaterialProvider,
    proofProvider: httpClientProofProvider(effectiveProverServerUri!, keyMaterialProvider),
    publicDataProvider: indexerPublicDataProvider(effectiveIndexerUri, effectiveIndexerWsUri),
    walletProvider: {
      getCoinPublicKey(): string {
        return shieldedAddresses.shieldedCoinPublicKey;
      },
      getEncryptionPublicKey(): string {
        return shieldedAddresses.shieldedEncryptionPublicKey;
      },
      balanceTx: async (tx: UnboundTransaction, ttl?: Date): Promise<FinalizedTransaction> => {
        try {
          logger.info({ tx, ttl }, 'Balancing transaction via wallet');
          const serializedTx = toHex(tx.serialize());
          const received = await connectedAPI.balanceUnsealedTransaction(serializedTx);
          return Transaction.deserialize<SignatureEnabled, Proof, Binding>(
            'signature',
            'proof',
            'binding',
            fromHex(received.tx),
          );
        } catch (e) {
          logger.error({ error: e }, 'Error balancing transaction via wallet');
          throw e;
        }
      },
    },
    midnightProvider: {
      submitTx: async (tx: FinalizedTransaction): Promise<TransactionId> => {
        const submittedTxId: unknown = await connectedAPI.submitTransaction(toHex(tx.serialize()));
        const txIdentifiers = tx.identifiers();
        const rawId = String(submittedTxId ?? '').trim();
        const txId = (rawId.length > 0 ? rawId : txIdentifiers[0]) as TransactionId;
        logger.info({ txIdentifiers, submittedTxId, txId }, 'Submitted transaction via 1AM wallet');
        return txId;
      },
    },
  };
};

/** @internal */
const isValidInitialAPI = (api: unknown): api is InitialAPI => {
  return !!api && typeof api === 'object' && 'connect' in api && typeof (api as InitialAPI).connect === 'function';
};

/** @internal */
const getFirstCompatibleWallet = (): InitialAPI | undefined => {
  if (typeof window === 'undefined' || !window.midnight) return undefined;
  const entries = Object.entries(window.midnight);

  for (const [key, wallet] of entries) {
    if (isValidInitialAPI(wallet)) {
      const normalizedKey = key.toLowerCase();
      const normalizedName = ((wallet as InitialAPI).name || '').toLowerCase();
      const normalizedRdns = ((wallet as InitialAPI).rdns || '').toLowerCase();
      if (
        normalizedKey.includes('1am') ||
        normalizedKey.includes('oneam') ||
        normalizedName.includes('1am') ||
        normalizedName.includes('one am') ||
        normalizedRdns.includes('1am') ||
        normalizedRdns.includes('oneam')
      ) {
        return wallet as InitialAPI;
      }
    }
  }

  for (const [, wallet] of entries) {
    if (isValidInitialAPI(wallet)) {
      return wallet as InitialAPI;
    }
  }

  return undefined;
};

/** @internal */
const connectToWallet = (logger: Logger, networkId: string): Promise<ConnectedAPI> => {
  return firstValueFrom(
    fnPipe(
      interval(100),
      map(() => getFirstCompatibleWallet()),
      tap((connectorAPI) => {
        logger.info(connectorAPI, 'Check for wallet connector API');
      }),
      filter((connectorAPI): connectorAPI is InitialAPI => !!connectorAPI),
      tap((connectorAPI) => {
        logger.info(connectorAPI, 'Compatible wallet connector API found. Connecting.');
      }),
      take(1),
      timeout({
        first: 2_000,
        with: () =>
          throwError(() => {
            logger.error('Could not find wallet connector API');

            return new Error('Could not find 1AM wallet. Extension installed?');
          }),
      }),
      concatMap(async (initialAPI) => {
        const connectedAPI = await initialAPI.connect(networkId);
        const connectionStatus = await connectedAPI.getConnectionStatus();
        logger.info(connectionStatus, 'Wallet connector API enabled status');
        return connectedAPI;
      }),
      timeout({
        first: 10_000,
        with: () =>
          throwError(() => {
            logger.error('Wallet connector API has failed to respond');

            return new Error('1AM wallet extension has failed to respond.');
          }),
      }),
      catchError((error, apis) =>
        error
          ? throwError(() => {
              logger.error('Unable to enable connector API ' + String(error));
              return new Error('Application is not authorized or 1AM wallet error');
            })
          : apis,
      ),
    ),
  );
};
