import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useWallet } from '../../hooks/useWallet';
import { WalletModal } from '../WalletModal/WalletModal';
import { WalletAccountPanel } from '../WalletAccountPanel/WalletAccountPanel';

const navItems = [
  { label: 'Explore', path: '/explore' },
  { label: 'Publish', path: '/publish' },
  { label: 'Contributor Hub', path: '/dashboard/contributor' },
  { label: 'Publisher Hub', path: '/dashboard/projects' },
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, isConnecting, status, account, connect } = useWallet();
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [accountPanelOpen, setAccountPanelOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleWalletClick = () => {
    if (isConnected) {
      setAccountPanelOpen(true);
    } else if (!isConnecting) {
      setWalletModalOpen(true);
    }
  };

  const renderWalletButton = () => {
    if (isConnecting) {
      return (
        <Button
          variant="contained"
          disabled
          startIcon={<CircularProgress size={16} sx={{ color: '#94A3B8' }} />}
          sx={{
            backgroundColor: '#1E2332',
            color: '#94A3B8',
            px: 2,
            py: 0.8,
            fontSize: '0.875rem',
          }}
        >
          Connecting...
        </Button>
      );
    }

    if (isConnected && account) {
      return (
        <Button
          variant="outlined"
          onClick={handleWalletClick}
          sx={{
            borderColor: '#262D3D',
            backgroundColor: 'rgba(59, 130, 246, 0.06)',
            color: '#F8FAFC',
            px: 2,
            py: 0.8,
            fontSize: '0.875rem',
            gap: 1,
            '&:hover': {
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
            },
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 6px #10B981',
            }}
          />
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
            1AM • {account.shortenedAddress}
          </Typography>
        </Button>
      );
    }

    if (status === 'ERROR') {
      return (
        <Button
          variant="outlined"
          color="error"
          onClick={handleWalletClick}
          sx={{
            borderColor: 'rgba(239, 68, 68, 0.4)',
            color: '#EF4444',
            px: 2,
            py: 0.8,
            fontSize: '0.875rem',
          }}
        >
          Retry Connection
        </Button>
      );
    }

    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => void connect()}
        startIcon={<AccountBalanceWalletIcon fontSize="small" />}
        sx={{
          px: 2.2,
          py: 0.8,
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        Connect Wallet
      </Button>
    );
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#0B0C10',
          borderBottom: '1px solid #1E2332',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            maxWidth: '1280px',
            width: '100%',
            mx: 'auto',
            px: { xs: 2, sm: 4 },
            py: 1,
          }}
        >
          {/* LEFT: Logo & Wordmark */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            <Box
              component="img"
              src="/forge-logo.png"
              alt="Midnight Forge Logo"
              sx={{
                height: 36,
                width: 'auto',
                objectFit: 'contain',
              }}
            />
            <Box>
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                Midnight Forge
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}
              >
                OPEN-SOURCE CONTRIBUTION PLATFORM
              </Typography>
            </Box>
            <Chip
              label="Preprod"
              size="small"
              sx={{
                ml: 1,
                height: 18,
                fontSize: '0.625rem',
                fontWeight: 700,
                backgroundColor: '#1E2332',
                color: '#94A3B8',
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            />
          </Box>

          {/* CENTER: Navigation Links (Desktop) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 3,
              mx: 'auto',
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  color: '#94A3B8',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: '#F8FAFC',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* RIGHT: Wallet Button & Mobile Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{renderWalletButton()}</Box>

            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
              aria-label="Toggle navigation drawer"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: '#0B0C10',
              borderLeft: '1px solid #1E2332',
              p: 3,
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="img" src="/forge-logo.png" alt="Logo" sx={{ height: 24, width: 'auto' }} />
            <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700 }}>
              Midnight Forge
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileOpen(false)} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <List sx={{ mb: 3 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  setMobileOpen(false);
                  navigate(item.path);
                }}
                sx={{ borderRadius: '6px', py: 1.2 }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: { fontWeight: 600, color: 'text.primary' },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ pt: 2, borderTop: '1px solid #1E2332' }}>{renderWalletButton()}</Box>
      </Drawer>

      {/* Wallet Connection Dialog */}
      <WalletModal open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />

      {/* Connected Account Drawer / Modal */}
      <WalletAccountPanel open={accountPanelOpen} onClose={() => setAccountPanelOpen(false)} />
    </>
  );
};
