import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../hooks/useWallet';

const userJourneySteps = [
  {
    label: 'Discover the platform',
    description: 'Explore open-source projects and contribution opportunities.',
    icon: <ShieldOutlinedIcon />,
  },
  {
    label: 'Publish or explore',
    description: 'Create a project bounty or find work that fits your skills.',
    icon: <CodeRoundedIcon />,
  },
  {
    label: 'Connect your wallet',
    description: 'Connect your 1AM wallet to participate and claim rewards.',
    icon: <AccountBalanceWalletOutlinedIcon />,
  },
  {
    label: 'Contribute on GitHub',
    description: 'Submit a pull request and collaborate through peer review.',
    icon: <CodeRoundedIcon />,
  },
  {
    label: 'Earn NIGHT',
    description: 'Receive your on-chain reward after your contribution is merged.',
    icon: <MonetizationOnOutlinedIcon />,
  },
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, connect } = useWallet();

  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState('');

  const handleConnect = async () => {
    setConnectError('');
    setIsConnecting(true);

    try {
      await connect();
    } catch {
      setConnectError('Wallet connection failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Box
      component="section"
      aria-labelledby="hero-title"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 13 },
        color: '#F5F3FF',
        backgroundColor: '#08070D',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 18% 10%, rgba(124, 58, 237, 0.22), transparent 42%), radial-gradient(ellipse at 90% 70%, rgba(34, 211, 238, 0.10), transparent 35%)',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            alignItems: 'center',
            gap: { xs: 6, md: 8 },
          }}
        >
          <Box>
            <Chip
              icon={<ShieldOutlinedIcon />}
              label="MIDNIGHT NETWORK · ZK PRIVACY"
              sx={{
                mb: 3,
                height: 34,
                color: '#D9CCFF',
                backgroundColor: 'rgba(124, 58, 237, 0.12)',
                border: '1px solid rgba(167, 139, 250, 0.35)',
                borderRadius: 999,
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                '& .MuiChip-icon': { color: '#A78BFA', ml: 1 },
                '& .MuiChip-label': { px: 1.5 },
              }}
            />

            <Typography
              id="hero-title"
              component="h1"
              sx={{
                maxWidth: 680,
                mb: 2.5,
                fontSize: { xs: '2.8rem', sm: '4rem', md: '5rem' },
                fontWeight: 900,
                lineHeight: 0.98,
                letterSpacing: '-0.055em',
              }}
            >
              Build together.
              <Box
                component="span"
                sx={{
                  display: 'block',
                  color: '#A78BFA',
                }}
              >
                Earn on-chain.
              </Box>
            </Typography>

            <Typography
              component="p"
              sx={{
                maxWidth: 600,
                mb: 4,
                color: 'rgba(245,243,255,0.7)',
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.75,
              }}
            >
              Midnight Forge connects open-source maintainers with contributors.
              Publish a project, fund a NIGHT bounty, review pull requests, and
              reward merged work on-chain.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/explore')}
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  minHeight: 52,
                  px: 3,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                  fontWeight: 800,
                  boxShadow: '0 10px 30px rgba(109,40,217,0.25)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #A78BFA, #7C3AED)',
                  },
                }}
              >
                Explore projects
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/publish')}
                sx={{
                  minHeight: 52,
                  px: 3,
                  color: '#F5F3FF',
                  borderColor: 'rgba(255,255,255,0.24)',
                  borderRadius: 2,
                  fontWeight: 700,
                  '&:hover': {
                    borderColor: '#A78BFA',
                    backgroundColor: 'rgba(167,139,250,0.08)',
                  },
                }}
              >
                Publish a project
              </Button>

              {isConnected ? (
                <Chip
                  icon={<AccountBalanceWalletOutlinedIcon />}
                  label="Wallet connected"
                  color="success"
                  variant="outlined"
                  sx={{ minHeight: 40, borderRadius: 2 }}
                />
              ) : (
                <Button
                  variant="text"
                  size="large"
                  onClick={() => void handleConnect()}
                  disabled={isConnecting}
                  startIcon={<AccountBalanceWalletOutlinedIcon />}
                  sx={{
                    minHeight: 48,
                    px: 1.5,
                    color: '#D9CCFF',
                    fontWeight: 700,
                  }}
                >
                  {isConnecting ? 'Connecting…' : 'Connect wallet'}
                </Button>
              )}
            </Box>

            {connectError && (
              <Typography
                role="alert"
                sx={{ mt: 2, color: '#FDA4AF', fontSize: '0.875rem' }}
              >
                {connectError}
              </Typography>
            )}
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              color: '#F5F3FF',
              backgroundColor: 'rgba(18, 16, 27, 0.82)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 4,
              backdropFilter: 'blur(12px)',
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: '#A78BFA',
                fontWeight: 800,
                letterSpacing: '0.14em',
              }}
            >
              The workflow
            </Typography>

            <Typography
              component="h2"
              sx={{ mt: 0.5, mb: 3, fontSize: '1.35rem', fontWeight: 800 }}
            >
              From idea to reward
            </Typography>

            <Box
              component="ol"
              aria-label="Midnight Forge contribution workflow"
              sx={{
                display: 'grid',
                gap: 1,
                p: 0,
                m: 0,
                listStyle: 'none',
              }}
            >
              {userJourneySteps.map((step, index) => (
                <Box component="li" key={step.label}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr',
                      alignItems: 'start',
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 2.5,
                      transition: 'background-color 180ms ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.05)',
                      },
                      '@media (prefers-reduced-motion: reduce)': {
                        transition: 'none',
                      },
                    }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{
                        display: 'grid',
                        placeItems: 'center',
                        width: 40,
                        height: 40,
                        color: '#C4B5FD',
                        backgroundColor: 'rgba(124,58,237,0.16)',
                        border: '1px solid rgba(167,139,250,0.22)',
                        borderRadius: 2,
                        '& svg': { fontSize: 20 },
                      }}
                    >
                      {step.icon}
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          mb: 0.35,
                          color: '#F5F3FF',
                          fontSize: '0.95rem',
                          fontWeight: 750,
                        }}
                      >
                        <Box
                          component="span"
                          sx={{ mr: 1, color: '#A78BFA', fontFamily: 'monospace' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </Box>
                        {step.label}
                      </Typography>

                      <Typography
                        sx={{
                          color: 'rgba(245,243,255,0.58)',
                          fontSize: '0.82rem',
                          lineHeight: 1.55,
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

