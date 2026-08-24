export interface AppConfig {
  networkId: string;
  loggingLevel: string;
  contractAddress: string;
  apiBaseUrl: string;
  googleFormUrl: string;
}

export const config: AppConfig = {
  networkId: (import.meta.env.VITE_NETWORK_ID as string) || 'preprod',
  loggingLevel: (import.meta.env.VITE_LOGGING_LEVEL as string) || 'info',
  contractAddress:
    (import.meta.env.VITE_MIDNIGHT_FORGE_CONTRACT_ADDRESS as string) ||
    '0200546febbb7a49324ecd734514cb7df13986d4c7ac5bef1860639087892788ab5e',
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3001',
  googleFormUrl:
    (import.meta.env.VITE_GOOGLE_FORM_URL as string) ||
    'https://docs.google.com/forms/d/e/1FAIpQLSc_midnight_forge_feedback/viewform',
};

export const getContractAddress = (): string => config.contractAddress;
export const getNetworkId = (): string => config.networkId;
export const getApiBaseUrl = (): string => config.apiBaseUrl;
export const getGoogleFormUrl = (): string => config.googleFormUrl;
