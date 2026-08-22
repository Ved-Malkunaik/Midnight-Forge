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
        }}
      >
        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700 }}>
          Connect Wallet
        </Typography>
        <IconButton
          onClick={handleClose}
          size="small"
          aria-label="Close wallet modal"
          sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3, pt: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          Select a supported Midnight wallet to connect to Midnight Forge.
        </Typography>

        {error && (
          <Alert severity="error" onClose={clearError} sx={{ mb: 2.5, borderRadius: '8px' }}>
            {error.message}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {/* 1AM Wallet Option (Primary) */}
          <Paper
            elevation={0}
            onClick={() => !isConnecting && handleSelectWallet(primaryWallet?.id || '1am')}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              cursor: isConnecting ? 'not-allowed' : 'pointer',
              borderRadius: '10px',
              border: '1px solid',
              borderColor: primaryWallet?.isPrimary ? '#3B82F6' : '#262D3D',
              backgroundColor: primaryWallet?.isPrimary ? 'rgba(59, 130, 246, 0.04)' : '#131620',
              transition: 'all 0.15s ease-in-out',
              '&:hover': {
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  backgroundColor: '#1E2332',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  color: '#3B82F6',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                1AM
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 700 }}>
                    1AM Wallet
                  </Typography>
                  <Chip
                    label="Primary"
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(59, 130, 246, 0.15)',
                      color: '#60A5FA',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Official Midnight Desktop & Browser Wallet
                </Typography>
              </Box>
            </Box>

            {isConnecting ? (
              <CircularProgress size={20} sx={{ color: '#3B82F6' }} />
            ) : (
              <CheckCircleIcon sx={{ color: primaryWallet?.isPrimary ? '#3B82F6' : 'text.secondary', fontSize: 20 }} />
            )}
          </Paper>

          {/* Secondary Wallets if present */}
          {availableWallets
            .filter((w) => w.id !== primaryWallet?.id && !w.isPrimary)
            .map((w) => (
              <Paper
                key={w.id}
                elevation={0}
                onClick={() => !isConnecting && handleSelectWallet(w.id)}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  cursor: isConnecting ? 'not-allowed' : 'pointer',
                  borderRadius: '10px',
                  border: '1px solid #262D3D',
                  backgroundColor: '#131620',
                  '&:hover': {
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AccountBalanceWalletIcon sx={{ color: 'text.secondary' }} />
                  <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 600 }}>
                    {w.name}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  v{w.apiVersion}
                </Typography>
              </Paper>
            ))}

          {!hasInjectedWallets && (
            <Box
              sx={{
                p: 2,
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                mt: 1,
              }}
            >
              <Typography variant="body2" color="error.main" sx={{ mb: 0.5, fontWeight: 600 }}>
                1AM Wallet Extension Not Detected
              </Typography>
              <Typography variant="caption" color="text.secondary" component="p" sx={{ mb: 1.5 }}>
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
                  borderColor: '#262D3D',
                  color: '#94A3B8',
                  fontSize: '0.75rem',
                }}
              >
                Download 1AM Wallet
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
