import React from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';

/**
 * Main application layout for Midnight Forge featuring sticky navbar and main content area.
 */
export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0B0C10' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, position: 'relative' }}>
        {children}
      </Box>
    </Box>
  );
};
