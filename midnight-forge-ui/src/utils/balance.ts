/**
 * Formats a raw bigint balance into a human readable token string.
 * Native Midnight tokens typically use 6 or 8 decimals (or standard bigint representations).
 */
export const formatTokenAmount = (amount: bigint, decimals = 6): string => {
  if (amount === 0n) return '0';

  const divisor = 10n ** BigInt(decimals);
  const integerPart = amount / divisor;
  const remainder = amount % divisor;

  if (remainder === 0n) {
    return integerPart.toLocaleString();
  }

  const remainderStr = remainder.toString().padStart(decimals, '0').replace(/0+$/, '');
  return `${integerPart.toLocaleString()}.${remainderStr}`;
};

/**
 * Calculates and formats total available balance from shielded and unshielded balance records.
 */
export const formatMidnightBalance = (
  shielded: Record<string, bigint> = {},
  unshielded: Record<string, bigint> = {},
  tokenSymbol = 'tNIGHT',
): string => {
  let totalBigInt = 0n;

  Object.values(shielded).forEach((val) => {
    if (typeof val === 'bigint') {
      totalBigInt += val;
    }
  });

  Object.values(unshielded).forEach((val) => {
    if (typeof val === 'bigint') {
      totalBigInt += val;
    }
  });

  if (totalBigInt === 0n) {
    return `0 ${tokenSymbol}`;
  }

  return `${formatTokenAmount(totalBigInt)} ${tokenSymbol}`;
};
