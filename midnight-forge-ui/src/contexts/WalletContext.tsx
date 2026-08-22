import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';
import type {
  WalletAccount,
  WalletBalance,
  WalletContextType,
  WalletError,
  WalletInfo,
  WalletNetwork,
  WalletStatus,
} from '../types/wallet';
import { getAvailableWallets, getPrimaryWallet } from '../services/wallet/walletRegistry';
import type { WalletAdapter } from '../services/wallet/WalletAdapter';

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

const LOCAL_STORAGE_WALLETT_KEY = 'midnight_forge_connected_wallet_id';

const DEFAULT_NETWORK_ID = (import.meta.env.VITE_NETWORK_ID as string) || 'preprod';

const initialBalanceState: WalletBalance = {
  shielded: {},
  unshielded: {},
  totalFormatted: '0 tNIGHT',
  status: 'idle',
};

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<WalletStatus>('DISCONNECTED');
  const [account, setAccount] = useState<WalletAccount | null>(null);
  const [balance, setBalance] = useState<WalletBalance>(initialBalanceState);
  const [network, setNetwork] = useState<WalletNetwork | null>(null);
  const [error, setError] = useState<WalletError | null>(null);
  const [activeAdapter, setActiveAdapter] = useState<WalletAdapter | null>(null);
  const [connectedApi, setConnectedApi] = useState<ConnectedAPI | null>(null);
  const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([]);

  // Scan available injected wallets
  const refreshAvailableWallets = useCallback(() => {
    const adapters = getAvailableWallets();
    setAvailableWallets(adapters.map((a) => a.info));
  }, []);

  useEffect(() => {
    refreshAvailableWallets();
    const timer = setTimeout(refreshAvailableWallets, 1000);
    return () => clearTimeout(timer);
  }, [refreshAvailableWallets]);

  const clearError = useCallback(() => {
    setError(null);
    if (status === 'ERROR') {
      setStatus('DISCONNECTED');
    }
  }, [status]);

  const fetchBalanceInternal = useCallback(async (adapter: WalletAdapter, api: ConnectedAPI) => {
    setBalance((prev) => ({ ...prev, status: 'loading' }));
    try {
      const bal = await adapter.getBalances(api);
      setBalance(bal);
    } catch (err) {
      setBalance({
        shielded: {},
        unshielded: {},
        totalFormatted: 'Unavailable',
        status: 'error',
        error: err instanceof Error ? err.message : 'Balance load failed',
      });
    }
  }, []);

  const connect = useCallback(
    async (walletId?: string) => {
      clearError();
      setStatus('CONNECTING');

      try {
        const availableAdapters = getAvailableWallets();

        let adapter: WalletAdapter | undefined;
        if (walletId) {
          adapter = availableAdapters.find((a) => a.info.id === walletId);
        } else {
          adapter = getPrimaryWallet() || undefined;
        }

        if (!adapter) {
          throw new Error('1AM Wallet extension not found. Please install the 1AM browser extension.');
        }

        setActiveAdapter(adapter);

        const api = await adapter.connect(DEFAULT_NETWORK_ID);
        setConnectedApi(api);

        const walletAccount = await adapter.getAccount(api);
        setAccount(walletAccount);

        const netInfo = await adapter.getNetwork(api, DEFAULT_NETWORK_ID);
        setNetwork({
          current: netInfo.current,
          expected: DEFAULT_NETWORK_ID,
          isMatch: netInfo.isMatch,
        });

        await fetchBalanceInternal(adapter, api);

        setStatus('CONNECTED');
        localStorage.setItem(LOCAL_STORAGE_WALLETT_KEY, adapter.info.id);
      } catch (err: unknown) {
        console.error('Wallet connection error:', err);
        const userMsg = err instanceof Error ? err.message : 'Failed to connect to wallet. Please try again.';

        setError({
          message: userMsg,
          raw: err,
        });
        setStatus('ERROR');
        setAccount(null);
        setConnectedApi(null);
        setActiveAdapter(null);
      }
    },
    [clearError, fetchBalanceInternal],
  );

  // eslint-disable-next-line @typescript-eslint/require-await
  const disconnect = useCallback(async () => {
    setStatus('DISCONNECTING');
    localStorage.removeItem(LOCAL_STORAGE_WALLETT_KEY);
    setAccount(null);
    setConnectedApi(null);
    setActiveAdapter(null);
    setBalance(initialBalanceState);
    setNetwork(null);
    setError(null);
    setStatus('DISCONNECTED');
  }, []);

  const refreshBalance = useCallback(async () => {
    if (activeAdapter && connectedApi) {
      await fetchBalanceInternal(activeAdapter, connectedApi);
    }
  }, [activeAdapter, connectedApi, fetchBalanceInternal]);

  const value: WalletContextType = useMemo(
    () => ({
      status,
      account,
      balance,
      network,
      error,
      activeWallet: activeAdapter ? activeAdapter.info : null,
      availableWallets,
      isConnecting: status === 'CONNECTING',
      isConnected: status === 'CONNECTED',
      connect,
      disconnect,
      refreshBalance,
      clearError,
    }),
    [
      status,
      account,
      balance,
      network,
      error,
      activeAdapter,
      availableWallets,
      connect,
      disconnect,
      refreshBalance,
      clearError,
    ],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
