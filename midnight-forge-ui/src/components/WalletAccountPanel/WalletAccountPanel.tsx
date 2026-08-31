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
          backgroundColor: '#000000',
          color: '#FFFFFF',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 0,
              backgroundColor: '#FFFFFF',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              fontWeight: 900,
              fontSize: '0.75rem',
              fontFamily: 'monospace',
            }}
          >
            1AM
          </Box>
          <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
            {activeWallet?.name || '1AM Wallet'}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close account panel"
          sx={{ color: '#FFFFFF' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3, pt: 1, backgroundColor: '#000000' }}>
        {/* Network Mismatch Warning */}
        {network && !network.isMatch && (
          <Alert severity="warning" icon={<WarningAmberIcon />} sx={{ mb: 2, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF', color: '#FFFFFF' }}>
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
              borderRadius: 0,
              backgroundColor: '#000000',
              border: '1px solid #FFFFFF',
            }}
          >
            <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 800, display: 'block', color: 'rgba(255, 255, 255, 0.6)' }}>
              CONNECTED WALLET ADDRESS
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="#FFFFFF" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                {account?.shortenedAddress || 'No Address'}
              </Typography>
              <Tooltip title={copied ? 'Copied!' : 'Copy Address'}>
                <IconButton onClick={() => void handleCopyAddress()} size="small" sx={{ color: '#FFFFFF' }}>
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
              borderRadius: 0,
              backgroundColor: '#000000',
              border: '1px solid #FFFFFF',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>
                ACCOUNT BALANCE
              </Typography>
              <IconButton onClick={() => void refreshBalance()} size="small" sx={{ color: '#FFFFFF', p: 0.5 }}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              {balance.status === 'loading' ? <CircularProgress size={16} sx={{ color: '#FFFFFF', mr: 1 }} /> : null}
              <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 900, fontFamily: 'monospace' }}>
                {balance.totalFormatted}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                mt: 2,
                pt: 1.5,
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700 }}>
                NETWORK
              </Typography>
              <Chip
                label={(network?.current || 'PREPROD').toUpperCase()}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  borderRadius: 0,
                }}
              />
            </Box>
          </Paper>

          {/* Disconnect Button */}
          <Button
            variant="outlined"
            fullWidth
            onClick={() => void handleDisconnect()}
            startIcon={<LogoutIcon />}
            sx={{
              mt: 1,
              py: 1.2,
              borderColor: '#FFFFFF',
              color: '#FFFFFF',
              borderRadius: 0,
              fontWeight: 800,
              '&:hover': {
                backgroundColor: '#FFFFFF',
                color: '#000000',
              },
            }}
          >
            DISCONNECT WALLET
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

