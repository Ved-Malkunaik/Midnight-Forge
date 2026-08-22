/**
 * Formats a Midnight address (e.g. Bech32m string like mn1...) into a shortened display string.
 * Format: prefix...suffix (e.g. mn1a2b...89ef)
 */
export const shortenAddress = (address: string, leadingChars = 6, trailingChars = 4): string => {
  if (!address) return '';
  if (address.length <= leadingChars + trailingChars) {
    return address;
  }
  return `${address.slice(0, leadingChars)}...${address.slice(-trailingChars)}`;
};

/**
 * Copies a string to clipboard and returns success status.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for non-HTTPS or legacy environments
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
