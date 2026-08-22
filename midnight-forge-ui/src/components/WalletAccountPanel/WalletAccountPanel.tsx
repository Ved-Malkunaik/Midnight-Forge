import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress,
  Chip,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import LogoutIcon from '@mui/icons-material/Logout';
import RefreshIcon from '@mui/icons-material/Refresh';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useWallet } from '../../hooks/useWallet';
import { copyToClipboard } from '../../utils/address';

interface WalletAccountPanelProps {
  open: boolean;
  onClose: () => void;
}

export const WalletAccountPanel: React.FC<WalletAccountPanelProps> = ({ open, onClose }) => {
  const { account, balance, network, activeWallet, disconnect, refreshBalance } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    if (account?.address) {
      const success = await copyToClipboard(account.address);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth aria-labelledby="wallet-panel-title">
      <DialogTitle
        id="wallet-panel-title"
        sx={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          pb: 1,
          pt: 2.5,
          px: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '6px',
              backgroundColor: '#1E2332',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              color: '#3B82F6',
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          >
            1AM
          </Box>
          <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700 }}>
            {activeWallet?.name || '1AM Wallet'}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close account panel"
          sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3, pt: 1 }}>
        {/* Network Mismatch Warning */}
        {network && !network.isMatch && (
          <Alert severity="warning" icon={<WarningAmberIcon />} sx={{ mb: 2, borderRadius: '8px' }}>
            Network mismatch. Connected to <strong>{network.current}</strong>, expected{' '}
            <strong>{network.expected}</strong>.
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Address Card */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: '10px',
              backgroundColor: '#0F121C',
              border: '1px solid #1E2332',
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, fontWeight: 600, display: 'block' }}>
              Wallet Address
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                {account?.shortenedAddress || 'No Address'}
              </Typography>
              <Tooltip title={copied ? 'Copied!' : 'Copy Address'}>
                <IconButton onClick={handleCopyAddress} size="small" sx={{ color: copied ? '#10B981' : '#94A3B8' }}>
                  {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>

          {/* Balance & Network Card */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: '10px',
              backgroundColor: '#0F121C',
              border: '1px solid #1E2332',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Balance
              </Typography>
              <IconButton onClick={refreshBalance} size="small" sx={{ color: 'text.secondary', p: 0.5 }}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              {balance.status === 'loading' ? <CircularProgress size={16} sx={{ color: '#3B82F6', mr: 1 }} /> : null}
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700 }}>
                {balance.totalFormatted}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2,
                pt: 1.5,
                borderTop: '1px solid #1E2332',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Network
              </Typography>
              <Chip
                label={network?.current || 'Preprod'}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10B981',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
              />
            </Box>
          </Paper>

          {/* Disconnect Button */}
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleDisconnect}
            startIcon={<LogoutIcon />}
            sx={{
              mt: 1,
              py: 1.2,
              borderColor: 'rgba(239, 68, 68, 0.3)',
              color: '#EF4444',
              '&:hover': {
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
              },
            }}
          >
            Disconnect Wallet
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
