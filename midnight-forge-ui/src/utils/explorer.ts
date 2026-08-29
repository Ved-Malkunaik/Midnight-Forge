export const ONE_AM_EXPLORER_BASE = 'https://explorer.1am.xyz';
export const MIDNIGHT_EXPLORER_BASE = 'https://explorer.preprod.midnight.network';

/**
 * Returns the trackable transaction URL on 1AM Explorer.
 * Format: https://explorer.1am.xyz/tx/<txHash> or https://explorer.1am.xyz/
 */
export const getOneAmExplorerTxUrl = (txHash?: string): string => {
  if (!txHash) return ONE_AM_EXPLORER_BASE;
  let cleanHash = txHash.trim();
  if (cleanHash.startsWith('0x') || cleanHash.startsWith('0X')) {
    cleanHash = cleanHash.slice(2);
  }
  return `${ONE_AM_EXPLORER_BASE}/tx/${cleanHash}`;
};

/**
 * Returns the trackable transaction URL on Midnight Preprod Explorer (Night Scan).
 * Format: https://explorer.preprod.midnight.network/transactions/<txHash> or https://explorer.preprod.midnight.network/
 */
export const getMidnightExplorerTxUrl = (txHash?: string): string => {
  if (!txHash) return MIDNIGHT_EXPLORER_BASE;
  let cleanHash = txHash.trim();
  if (cleanHash.startsWith('0x') || cleanHash.startsWith('0X')) {
    cleanHash = cleanHash.slice(2);
  }
  return `${MIDNIGHT_EXPLORER_BASE}/transactions/${cleanHash}`;
};
