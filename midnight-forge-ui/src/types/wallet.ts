export type WalletStatus = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR' | 'DISCONNECTING';

export interface WalletInfo {
  id: string;
  name: string;
  icon?: string;
  rdns: string;
  apiVersion: string;
  isPrimary?: boolean;
}

export interface WalletAccount {
  address: string;
  shortenedAddress: string;
  coinPublicKey?: string;
  encryptionPublicKey?: string;
  unshieldedAddress?: string;
}

export interface WalletBalance {
  shielded: Record<string, bigint>;
  unshielded: Record<string, bigint>;
  dust?: {
    balance: bigint;
    cap: bigint;
  };
  totalFormatted: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
}

export interface WalletNetwork {
  current: string;
  expected: string;
  isMatch: boolean;
}

export interface WalletError {
  message: string;
  code?: string;
  raw?: unknown;
}

export interface WalletContextType {
  status: WalletStatus;
  account: WalletAccount | null;
  balance: WalletBalance;
  network: WalletNetwork | null;
  error: WalletError | null;
  activeWallet: WalletInfo | null;
  availableWallets: WalletInfo[];
  isConnecting: boolean;
  isConnected: boolean;

  // Actions
  connect: (walletId?: string) => Promise<void>;
  disconnect: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  clearError: () => void;
}
