import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useWallet } from '../../hooks/useWallet';

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ open, onClose }) => {
  const { availableWallets, isConnecting, error, connect, clearError } = useWallet();

  const handleSelectWallet = async (walletId?: string) => {
    try {
      await connect(walletId);
      onClose();
    } catch {
      // Error handled via useWallet error state
    }
  };

  const handleClose = () => {
    clearError();
    onClose();
  };

  const primaryWallet = availableWallets.find((w) => w.isPrimary) || availableWallets[0];
  const hasInjectedWallets = availableWallets.length > 0;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth aria-labelledby="wallet-modal-title">
      <DialogTitle
        id="wallet-modal-title"
        sx={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          pb: 1,
          pt: 2.5,
          px: 3,
          backgroundColor: '#000000',
          color: '#FFFFFF',
        }}
      >
        <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
          Connect 1AM Wallet
        </Typography>
        <IconButton
          onClick={handleClose}
          size="small"
          aria-label="Close wallet modal"
          sx={{ color: '#FFFFFF' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3, pt: 1, backgroundColor: '#000000' }}>
        <Typography variant="body2" sx={{ mb: 2.5, color: 'rgba(255, 255, 255, 0.75)' }}>
          Select a supported Midnight wallet connector to access Midnight Forge.
        </Typography>

        {error && (
          <Alert severity="error" onClose={clearError} sx={{ mb: 2.5, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF', color: '#FFFFFF' }}>
            {error.message}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {/* 1AM Wallet Option (Primary) */}
          <Paper
            elevation={0}
            onClick={() => !isConnecting && void handleSelectWallet(primaryWallet?.id || '1am')}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              cursor: isConnecting ? 'not-allowed' : 'pointer',
              borderRadius: 0,
              border: '1px solid #FFFFFF',
              backgroundColor: '#000000',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                '& .MuiTypography-root, & .MuiBox-root, & .MuiChip-root': {
                  color: '#000000',
                },
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 0,
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                }}
              >
                1AM
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle2" color="#FFFFFF" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
                    1AM Wallet
                  </Typography>
                  <Chip
                    label="PRIMARY"
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      backgroundColor: '#FFFFFF',
                      color: '#000000',
                      borderRadius: 0,
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Official Midnight Desktop & Browser Wallet
                </Typography>
              </Box>
            </Box>

            {isConnecting ? (
              <CircularProgress size={20} sx={{ color: '#FFFFFF' }} />
            ) : (
              <CheckCircleIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
            )}
          </Paper>

          {/* Secondary Wallets if present */}
          {availableWallets
            .filter((w) => w.id !== primaryWallet?.id && !w.isPrimary)
            .map((w) => (
              <Paper
                key={w.id}
                elevation={0}
                onClick={() => !isConnecting && void handleSelectWallet(w.id)}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  cursor: isConnecting ? 'not-allowed' : 'pointer',
                  borderRadius: 0,
                  border: '1px solid #FFFFFF',
                  backgroundColor: '#000000',
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AccountBalanceWalletIcon sx={{ color: '#FFFFFF' }} />
                  <Typography variant="subtitle2" color="#FFFFFF" sx={{ fontWeight: 800 }}>
                    {w.name}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.6)' }}>
                  v{w.apiVersion}
                </Typography>
              </Paper>
            ))}

          {!hasInjectedWallets && (
            <Box
              sx={{
                p: 2,
                borderRadius: 0,
                backgroundColor: '#000000',
                border: '1px solid #FFFFFF',
                mt: 1,
              }}
            >
              <Typography variant="body2" color="#FFFFFF" sx={{ mb: 0.5, fontWeight: 800, textTransform: 'uppercase' }}>
                1AM Wallet Extension Not Detected
              </Typography>
              <Typography variant="caption" sx={{ mb: 1.5, display: 'block', color: 'rgba(255, 255, 255, 0.7)' }}>
                To connect to Midnight Forge, please install and enable the official 1AM browser extension.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                endIcon={<OpenInNewIcon fontSize="small" />}
                href="https://midnight.network"
                target="_blank"
                rel="noreferrer"
                sx={{
                  borderColor: '#FFFFFF',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  borderRadius: 0,
                  fontWeight: 800,
                }}
              >
                DOWNLOAD 1AM WALLET ↗
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

