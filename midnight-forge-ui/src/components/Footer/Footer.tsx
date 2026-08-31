import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000000',
        borderTop: '1px solid #FFFFFF',
        pt: 8,
        pb: 5,
        color: 'rgba(255, 255, 255, 0.7)',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Column 1: Identity & Description */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
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
              <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
                MIDNIGHT FORGE
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.6, pr: { md: 4 }, color: 'rgba(255, 255, 255, 0.7)' }}>
              A decentralized software contribution marketplace built on Midnight Network. Publish repositories,
              collaborate on GitHub, and earn verified on-chain rewards.
            </Typography>
          </Grid>

          {/* Column 2: Platform Links */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" color="#FFFFFF" sx={{ fontWeight: 800, mb: 2, textTransform: 'uppercase' }}>
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
          <Grid size={{ xs: 6, sm: 3, md: 3 }}>
            <Typography variant="subtitle2" color="#FFFFFF" sx={{ fontWeight: 800, mb: 2, textTransform: 'uppercase' }}>
              Explorers & Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Link
                href="https://explorer.1am.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                underline="hover"
                sx={{ fontSize: '0.875rem', fontFamily: 'monospace' }}
              >
                1AM Block Explorer ↗
              </Link>
              <Link
                href="https://explorer.preprod.midnight.network/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                underline="hover"
                sx={{ fontSize: '0.875rem', fontFamily: 'monospace' }}
              >
                Midnight Explorer (Preprod) ↗
              </Link>
              <Link href="/feedback" color="inherit" underline="hover" sx={{ fontSize: '0.875rem' }}>
                Provide Feedback
              </Link>
              <Link
                href="https://midnight.network"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                underline="hover"
                sx={{ fontSize: '0.875rem' }}
              >
                Midnight Network Docs ↗
              </Link>
            </Box>
          </Grid>

          {/* Column 4: Community */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" color="#FFFFFF" sx={{ fontWeight: 800, mb: 2, textTransform: 'uppercase' }}>
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
            <Typography variant="caption" sx={{ display: 'block', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.5)' }}>
              Built for the Midnight Hackathon & Developer Community.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            © 2026 Midnight Forge. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            POWERED BY <strong>MIDNIGHT ZK PROTOCOL</strong> & <strong>1AM WALLET</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

