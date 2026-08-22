import type { ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';
import type { WalletAccount, WalletBalance, WalletInfo } from '../../types/wallet';

export interface WalletAdapter {
  readonly info: WalletInfo;

  /**
   * Connects to the wallet via the injected InitialAPI connector.
   * Prompts the wallet extension popup for user authorization.
   */
  connect(networkId: string): Promise<ConnectedAPI>;

  /**
   * Reads current wallet account details (shielded & unshielded addresses).
   */
  getAccount(connectedApi: ConnectedAPI): Promise<WalletAccount>;

  /**
   * Fetches current shielded and unshielded balances.
   */
  getBalances(connectedApi: ConnectedAPI): Promise<WalletBalance>;

  /**
   * Fetches current network ID / configuration.
   */
  getNetwork(connectedApi: ConnectedAPI, expectedNetworkId: string): Promise<{ current: string; isMatch: boolean }>;
}
