import React from 'react';
import { Box, Container, Typography, Button, Chip, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CodeIcon from '@mui/icons-material/Code';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../hooks/useWallet';

const userJourneySteps = [
  { label: 'WHAT IS MIDNIGHT FORGE?', desc: 'Decentralized Open-Source Platform' },
  { label: 'WHAT CAN I DO HERE?', desc: 'Publish Projects or Discover Tasks' },
  { label: 'PUBLISH / EXPLORE', desc: 'Set NIGHT Bounties or Find Work' },
  { label: 'BECOME A CONTRIBUTOR', desc: 'Connect 1AM Wallet & Claim' },
  { label: 'CONTRIBUTE VIA GITHUB', desc: 'Open Pull Request & Peer Review' },
  { label: 'EARN NIGHT', desc: 'On-Chain Token Release on Merge' },
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, connect } = useWallet();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        borderBottom: '1px solid #FFFFFF',
        backgroundColor: '#000000',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
          {/* Top Badge */}
          <Chip
            icon={<ShieldOutlinedIcon sx={{ fontSize: '14px !important', color: '#FFFFFF' }} />}
            label="MIDNIGHT NETWORK • 1AM WALLET • ZK PRIVACY"
            sx={{
              mb: 3,
              px: 1.5,
              py: 0.5,
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '1px solid #FFFFFF',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              borderRadius: 0,
            }}
          />

          {/* Main Headline */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', sm: '3.75rem', md: '4.5rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              mb: 2.5,
              color: '#FFFFFF',
              textTransform: 'uppercase',
            }}
          >
            Build. Contribute. <br />
            Verify. Earn.
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 1.6,
              mb: 4.5,
              maxWidth: 720,
              mx: 'auto',
            }}
          >
            Midnight Forge connects open-source software publishers with technical contributors. Publish repositories,
            create contribution opportunities with NIGHT token bounties, track GitHub PRs, and transfer rewards on-chain.
          </Typography>

          {/* Primary Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 7 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/explore')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.4,
                fontSize: '0.9375rem',
                fontWeight: 800,
                borderRadius: 0,
              }}
            >
              EXPLORE PROJECTS
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/publish')}
              sx={{
                px: 4,
                py: 1.4,
                fontSize: '0.9375rem',
                fontWeight: 700,
                borderRadius: 0,
              }}
            >
              PUBLISH PROJECT
            </Button>

            {!isConnected && (
              <Button
                variant="outlined"
                size="large"
                onClick={() => void connect()}
                startIcon={<AccountBalanceWalletIcon />}
                sx={{
                  px: 4,
                  py: 1.4,
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  borderRadius: 0,
                }}
              >
                CONNECT 1AM WALLET
              </Button>
            )}
          </Box>

          {/* User Journey Step Banner */}
          <Box sx={{ mb: 4, textAlign: 'left' }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 800, letterSpacing: '0.1em', display: 'block', mb: 2 }}>
              THE MIDNIGHT FORGE WORKFLOW
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              {userJourneySteps.map((step, idx) => (
                <Paper
                  key={idx}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: '1px solid #FFFFFF',
                    backgroundColor: '#000000',
                    borderRadius: 0,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#FFFFFF',
                      color: '#000000',
                      '& .MuiTypography-root': {
                        color: '#000000',
                      },
                    },
                  }}
                >
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', fontWeight: 900, fontSize: '0.75rem', display: 'block', mb: 0.5 }}>
                    0{idx + 1} • {step.label}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem' }}>
                    {step.desc}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

