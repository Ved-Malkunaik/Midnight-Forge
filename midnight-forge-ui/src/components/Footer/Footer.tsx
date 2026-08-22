import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#07080B',
        borderTop: '1px solid #1E2332',
        pt: 8,
        pb: 5,
        color: '#94A3B8',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Column 1: Identity & Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                component="img"
                src="/forge-logo.png"
                alt="Midnight Forge Logo"
                sx={{
                  height: 32,
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 800 }}>
                Midnight Forge
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, pr: { md: 4 } }}>
              A decentralized software contribution marketplace built on Midnight Network. Publish repositories,
              collaborate on GitHub, and earn verified on-chain rewards.
            </Typography>
          </Grid>

          {/* Column 2: Platform Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 700, mb: 2 }}>
              Marketplace
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Link href="/explore" color="inherit" underline="hover" sx={{ fontSize: '0.875rem' }}>
                Explore Projects
              </Link>
              <Link href="/publish" color="inherit" underline="hover" sx={{ fontSize: '0.875rem' }}>
                Publish Project
              </Link>
              <Link href="/dashboard/contributor" color="inherit" underline="hover" sx={{ fontSize: '0.875rem' }}>
                Contributor Hub
              </Link>
              <Link href="/dashboard/projects" color="inherit" underline="hover" sx={{ fontSize: '0.875rem' }}>
                Publisher Hub
              </Link>
            </Box>
          </Grid>

          {/* Column 3: Resources */}
          <Grid item xs={6} sm={3} md={3}>
            <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 700, mb: 2 }}>
              Resources & Docs
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Link
                href="https://midnight.network"
                target="_blank"
                color="inherit"
                underline="hover"
                sx={{ fontSize: '0.875rem' }}
              >
                Midnight Network Docs
              </Link>
              <Link
                href="https://github.com/midnight-ntwrk"
                target="_blank"
                color="inherit"
                underline="hover"
                sx={{ fontSize: '0.875rem' }}
              >
                Compact Smart Contracts
              </Link>
              <Link
                href="https://midnight.network"
                target="_blank"
                color="inherit"
                underline="hover"
                sx={{ fontSize: '0.875rem' }}
              >
                1AM Wallet Setup
              </Link>
            </Box>
          </Grid>

          {/* Column 4: Community */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 700, mb: 2 }}>
              Ecosystem
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Link href="https://github.com/midnight-ntwrk" target="_blank" color="inherit" aria-label="GitHub">
                <GitHubIcon fontSize="small" />
              </Link>
              <Link href="https://midnight.network" target="_blank" color="inherit" aria-label="Website">
                <LanguageIcon fontSize="small" />
              </Link>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.5 }}>
              Built for the Midnight Hackathon & Developer Community.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#1E2332', mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            © 2026 Midnight Forge. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Powered by <strong>Midnight ZK Protocol</strong> & <strong>1AM Wallet</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
