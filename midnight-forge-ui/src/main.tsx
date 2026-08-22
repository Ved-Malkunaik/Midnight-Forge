import './globals';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { setNetworkId, NetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './config/theme';
import '@midnight-ntwrk/dapp-connector-api';
import * as pino from 'pino';
import { DeployedBoardProvider, WalletProvider } from './contexts';

const networkId = (import.meta.env.VITE_NETWORK_ID as NetworkId) || 'preprod';
setNetworkId(networkId);

export const logger = pino.pino({
  level: (import.meta.env.VITE_LOGGING_LEVEL as string) || 'info',
});

logger.trace(`networkId = ${networkId}`);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WalletProvider>
        <DeployedBoardProvider logger={logger}>
          <App />
        </DeployedBoardProvider>
      </WalletProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
