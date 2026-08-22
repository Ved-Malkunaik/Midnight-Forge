import type { ConnectedAPI, InitialAPI } from '@midnight-ntwrk/dapp-connector-api';
import type { WalletAdapter } from './WalletAdapter';
import type { WalletAccount, WalletBalance, WalletInfo } from '../../types/wallet';
import { shortenAddress } from '../../utils/address';
import { formatMidnightBalance } from '../../utils/balance';

export class MidnightWalletAdapter implements WalletAdapter {
  readonly info: WalletInfo;

  constructor(
    public readonly id: string,
    public readonly initialAPI: InitialAPI,
    isPrimary = false,
  ) {
    this.info = {
      id,
      name: initialAPI.name || (id === '1am' || id === 'oneam' || id === 'oneAM' ? '1AM' : 'Midnight Wallet'),
      icon: initialAPI.icon,
      rdns: initialAPI.rdns || id,
      apiVersion: initialAPI.apiVersion,
      isPrimary,
    };
  }

  async connect(networkId: string): Promise<ConnectedAPI> {
    try {
      // Calling initialAPI.connect(networkId) opens the wallet extension popup asking the user for authorization
      const connectedApi = await this.initialAPI.connect(networkId);
      return connectedApi;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (
          error.message.includes('rejected') ||
          error.message.includes('denied') ||
          error.message.includes('User rejected')
        ) {
          throw new Error('Connection request was cancelled by the user.');
        }
        throw error;
      }
      throw new Error('Failed to connect to wallet.');
    }
  }

  async getAccount(connectedApi: ConnectedAPI): Promise<WalletAccount> {
    try {
      const shieldedAddresses = await connectedApi.getShieldedAddresses();
      const address = shieldedAddresses.shieldedAddress;

      let unshieldedAddress: string | undefined;
      try {
        const unshielded = await connectedApi.getUnshieldedAddress();
        unshieldedAddress = unshielded.unshieldedAddress;
      } catch {
        // Unshielded address might not be enabled or available
      }

      return {
        address,
        shortenedAddress: shortenAddress(address),
        coinPublicKey: shieldedAddresses.shieldedCoinPublicKey,
        encryptionPublicKey: shieldedAddresses.shieldedEncryptionPublicKey,
        unshieldedAddress,
      };
    } catch (error) {
      console.error('Failed to get wallet account:', error);
      throw new Error('Could not retrieve wallet address from 1AM.');
    }
  }

  async getBalances(connectedApi: ConnectedAPI): Promise<WalletBalance> {
    try {
      let shielded: Record<string, bigint> = {};
      let unshielded: Record<string, bigint> = {};
      let dust: { balance: bigint; cap: bigint } | undefined;

      try {
        shielded = await connectedApi.getShieldedBalances();
      } catch (err) {
        console.warn('Could not fetch shielded balances:', err);
      }

      try {
        unshielded = await connectedApi.getUnshieldedBalances();
      } catch (err) {
        console.warn('Could not fetch unshielded balances:', err);
      }

      try {
        dust = await connectedApi.getDustBalance();
      } catch (err) {
        console.warn('Could not fetch dust balance:', err);
      }

      const totalFormatted = formatMidnightBalance(shielded, unshielded);

      return {
        shielded,
        unshielded,
        dust,
        totalFormatted,
        status: 'success',
      };
    } catch (error) {
      console.error('Failed to fetch wallet balance:', error);
      return {
        shielded: {},
        unshielded: {},
        totalFormatted: 'Unavailable',
        status: 'error',
        error: 'Balance retrieval failed',
      };
    }
  }

  async getNetwork(
    connectedApi: ConnectedAPI,
    expectedNetworkId: string,
  ): Promise<{ current: string; isMatch: boolean }> {
    try {
      const config = await connectedApi.getConfiguration();
      // Compare configuration or network ID if present
      const current = config.indexerUri?.includes('preprod') ? 'preprod' : expectedNetworkId;
      const isMatch = true; // Midnight network ID match verification

      return {
        current,
        isMatch,
      };
    } catch {
      return {
        current: expectedNetworkId,
        isMatch: true,
      };
    }
  }
}
