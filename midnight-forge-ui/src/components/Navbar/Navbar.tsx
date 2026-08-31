import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
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
          variant="outlined"
          disabled
          startIcon={<CircularProgress size={14} sx={{ color: '#FFFFFF' }} />}
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.4)',
            color: 'rgba(255, 255, 255, 0.7)',
            px: 2,
            py: 0.8,
            fontSize: '0.8125rem',
            borderRadius: 0,
          }}
        >
          CONNECTING...
        </Button>
      );
    }

    if (isConnected && account) {
      return (
        <Button
          variant="outlined"
          onClick={handleWalletClick}
          sx={{
            borderColor: '#FFFFFF',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            px: 2,
            py: 0.8,
            fontSize: '0.8125rem',
            borderRadius: 0,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: '#000000',
            },
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              backgroundColor: '#FFFFFF',
              borderRadius: 0,
              mr: 1,
            }}
          />
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.8125rem' }}>
            1AM • {account.shortenedAddress}
          </Typography>
        </Button>
      );
    }

    if (status === 'ERROR') {
      return (
        <Button
          variant="outlined"
          onClick={handleWalletClick}
          sx={{
            borderColor: '#FFFFFF',
            color: '#FFFFFF',
            px: 2,
            py: 0.8,
            fontSize: '0.8125rem',
            borderRadius: 0,
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: '#000000',
            },
          }}
        >
          RETRY CONNECTION
        </Button>
      );
    }

    return (
      <Button
        variant="contained"
        onClick={() => void connect()}
        startIcon={<AccountBalanceWalletIcon fontSize="small" />}
        sx={{
          px: 2.5,
          py: 0.8,
          fontWeight: 700,
          fontSize: '0.8125rem',
          letterSpacing: '0.05em',
          borderRadius: 0,
        }}
      >
        CONNECT WALLET
      </Button>
    );
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#000000',
          borderBottom: '1px solid #FFFFFF',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            maxWidth: '1280px',
            width: '100%',
            mx: 'auto',
            px: { xs: 2, sm: 4 },
            py: 1.5,
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
                height: 32,
                width: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
              }}
            />
            <Box>
              <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                MIDNIGHT FORGE
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: '0.625rem', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.6)', display: 'block' }}
              >
                OPEN-SOURCE CONTRIBUTION PLATFORM
              </Typography>
            </Box>
            <Chip
              label="PREPROD"
              size="small"
              sx={{
                ml: 1,
                height: 20,
                fontSize: '0.625rem',
                fontWeight: 800,
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: '1px solid #FFFFFF',
                borderRadius: 0,
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            />
          </Box>

          {/* CENTER: Navigation Links (Desktop) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1,
              mx: 'auto',
            }}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: isActive ? '#000000' : '#FFFFFF',
                    backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? '#FFFFFF' : 'transparent',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    letterSpacing: '0.03em',
                    px: 2,
                    py: 0.6,
                    borderRadius: 0,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#FFFFFF',
                      color: '#000000',
                      borderColor: '#FFFFFF',
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* RIGHT: Wallet Button & Mobile Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{renderWalletButton()}</Box>

            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ display: { xs: 'flex', md: 'none' }, color: '#FFFFFF', borderRadius: 0 }}
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
              backgroundColor: '#000000',
              borderLeft: '1px solid #FFFFFF',
              p: 3,
              borderRadius: 0,
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="img" src="/forge-logo.png" alt="Logo" sx={{ height: 24, width: 'auto', filter: 'brightness(0) invert(1)' }} />
            <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 800 }}>
              MIDNIGHT FORGE
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileOpen(false)} size="small" sx={{ color: '#FFFFFF' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <List sx={{ mb: 3 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  setMobileOpen(false);
                  navigate(item.path);
                }}
                sx={{
                  border: '1px solid #FFFFFF',
                  borderRadius: 0,
                  py: 1.2,
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                    '& .MuiListItemText-primary': {
                      color: '#000000',
                    },
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: { fontWeight: 700, color: '#FFFFFF', fontSize: '0.875rem' },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ pt: 2, borderTop: '1px solid #FFFFFF' }}>{renderWalletButton()}</Box>
      </Drawer>

      {/* Wallet Connection Dialog */}
      <WalletModal open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />

      {/* Connected Account Drawer / Modal */}
      <WalletAccountPanel open={accountPanelOpen} onClose={() => setAccountPanelOpen(false)} />
    </>
  );
};

