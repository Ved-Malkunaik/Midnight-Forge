import type { InitialAPI } from '@midnight-ntwrk/dapp-connector-api';
import { MidnightWalletAdapter } from './MidnightWalletAdapter';
import type { WalletAdapter } from './WalletAdapter';

/**
 * Checks if a given object is a valid Midnight connector InitialAPI instance.
 */
const isValidInitialAPI = (api: unknown): api is InitialAPI => {
  return !!api && typeof api === 'object' && 'connect' in api && typeof (api as InitialAPI).connect === 'function';
};

/**
 * Checks if a wallet key or InitialAPI corresponds to the 1AM wallet.
 */
export const is1AMWallet = (key: string, api?: InitialAPI): boolean => {
  const normalizedKey = key.toLowerCase();
  if (normalizedKey.includes('1am') || normalizedKey.includes('oneam')) {
    return true;
  }
  if (api) {
    const normalizedName = (api.name || '').toLowerCase();
    const normalizedRdns = (api.rdns || '').toLowerCase();
    return (
      normalizedName.includes('1am') ||
      normalizedName.includes('one am') ||
      normalizedRdns.includes('1am') ||
      normalizedRdns.includes('oneam')
    );
  }
  return false;
};

/**
 * Scans `window.midnight` and returns all available wallet adapters.
 * Ensures 1AM is positioned first as the primary wallet option.
 */
export const getAvailableWallets = (): WalletAdapter[] => {
  if (typeof window === 'undefined' || !window.midnight) {
    return [];
  }

  const adapters: WalletAdapter[] = [];
  const entries = Object.entries(window.midnight);

  for (const [key, api] of entries) {
    if (isValidInitialAPI(api)) {
      const primary = is1AMWallet(key, api);
      adapters.push(new MidnightWalletAdapter(key, api, primary));
    }
  }

  // Sort adapters so 1AM is always first (primary option)
  return adapters.sort((a, b) => {
    if (a.info.isPrimary && !b.info.isPrimary) return -1;
    if (!a.info.isPrimary && b.info.isPrimary) return 1;
    return 0;
  });
};

/**
 * Gets the primary wallet adapter (1AM) or the first available wallet adapter.
 */
export const getPrimaryWallet = (): WalletAdapter | null => {
  const wallets = getAvailableWallets();
  if (wallets.length === 0) return null;
  const primary1am = wallets.find((w) => w.info.isPrimary);
  return primary1am || wallets[0];
};
