import React from 'react';
import { Box, Container, Typography, Button, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CodeIcon from '@mui/icons-material/Code';
import MonetaryIcon from '@mui/icons-material/MonetizationOnOutlined';
import { useWallet } from '../../hooks/useWallet';

export const HeroSection: React.FC = () => {
  const { isConnected, connect } = useWallet();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        borderBottom: '1px solid #1E2332',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
          {/* Badge */}
          <Chip
            icon={<ShieldOutlinedIcon sx={{ fontSize: '14px !important', color: '#60A5FA' }} />}
            label="POWERED BY MIDNIGHT NETWORK & 1AM WALLET"
            sx={{
              mb: 3,
              px: 1.5,
              py: 0.5,
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
              color: '#60A5FA',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              fontSize: '0.725rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          />

          {/* Headline */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              mb: 2.5,
              color: '#F8FAFC',
            }}
          >
            Build. Contribute.{' '}
            <Box component="span" sx={{ color: '#3B82F6' }}>
              Verify. Earn.
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              color: '#94A3B8',
              lineHeight: 1.6,
              mb: 4.5,
              maxWidth: 680,
              mx: 'auto',
            }}
          >
            Midnight Forge is a decentralized software contribution marketplace. Publish repositories, claim task
            opportunities, and earn rewards backed by zero-knowledge privacy guarantees.
          </Typography>

          {/* Primary Call to Action */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component="a"
              href="#explore"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 3.5,
                py: 1.4,
                fontSize: '0.95rem',
                fontWeight: 700,
              }}
            >
              Explore Projects
            </Button>

            {!isConnected && (
              <Button
                variant="outlined"
                size="large"
                onClick={() => connect()}
                sx={{
                  px: 3.5,
                  py: 1.4,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  borderColor: '#262D3D',
                  color: '#F8FAFC',
                }}
              >
                Connect 1AM Wallet
              </Button>
            )}
          </Box>

          {/* Feature Highlights Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 3,
              mt: 8,
              textAlign: 'left',
            }}
          >
            <Box
              sx={{
                p: 3,
                borderRadius: '10px',
                backgroundColor: '#131620',
                border: '1px solid #1E2332',
              }}
            >
              <CodeIcon sx={{ color: '#3B82F6', mb: 1.5, fontSize: 28 }} />
              <Typography variant="subtitle2" color="text.primary" sx={{ mb: 0.5, fontWeight: 700 }}>
                Public Exploration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Browse repositories and contribution requests freely without connecting your wallet.
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
                borderRadius: '10px',
                backgroundColor: '#131620',
                border: '1px solid #1E2332',
              }}
            >
              <ShieldOutlinedIcon sx={{ color: '#3B82F6', mb: 1.5, fontSize: 28 }} />
              <Typography variant="subtitle2" color="text.primary" sx={{ mb: 0.5, fontWeight: 700 }}>
                1AM Integration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                First-class 1AM wallet authorization for claiming contributions and smart contract actions.
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
                borderRadius: '10px',
                backgroundColor: '#131620',
                border: '1px solid #1E2332',
              }}
            >
              <MonetaryIcon sx={{ color: '#3B82F6', mb: 1.5, fontSize: 28 }} />
              <Typography variant="subtitle2" color="text.primary" sx={{ mb: 0.5, fontWeight: 700 }}>
                Verified Rewards
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Automated contract settlements releasing rewards upon accepted code review.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
