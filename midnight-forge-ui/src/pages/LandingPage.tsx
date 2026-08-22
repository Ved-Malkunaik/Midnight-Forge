import React from 'react';
import { Box, Container, Typography, Button, Paper, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PublishIcon from '@mui/icons-material/Publish';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import { HeroSection, FeaturedProjects, Footer, ContributionCard } from '../components';
import { mockContributions } from '../data/mockContributions';
import { useWallet } from '../hooks/useWallet';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, connect } = useWallet();

  const handlePublishClick = () => {
    if (!isConnected) {
      void connect();
    } else {
      navigate('/publish');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Projects */}
      <FeaturedProjects />

      {/* 3. How It Works Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#07080B', borderVertical: '1px solid #1E2332' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 700, mx: 'auto' }}>
            <Chip
              label="WORKFLOW & PROCESS"
              size="small"
              sx={{
                mb: 2,
                height: 22,
                fontSize: '0.675rem',
                fontWeight: 700,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#60A5FA',
                border: '1px solid rgba(59, 130, 246, 0.25)',
              }}
            />
            <Typography variant="h2" color="text.primary" sx={{ fontWeight: 800, mb: 1.5 }}>
              How Midnight Forge Works
            </Typography>
            <Typography variant="body1" color="text.secondary">
              A transparent, 4-step workflow bridging open-source software collaboration with Midnight on-chain rewards.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {[
              {
                step: '01',
                title: 'Publish Project',
                icon: <PublishIcon sx={{ color: '#3B82F6' }} />,
                desc: 'Describe your repository, specify technological stack, and list improvement opportunities for contributors.',
              },
              {
                step: '02',
                title: 'Discover & Claim',
                icon: <SearchIcon sx={{ color: '#3B82F6' }} />,
                desc: 'Contributors browse opportunities freely, connecting 1AM wallet only when claiming a specific task.',
              },
              {
                step: '03',
                title: 'Contribute on GitHub',
                icon: <CodeIcon sx={{ color: '#3B82F6' }} />,
                desc: 'Work through GitHub, submit pull requests, and participate in peer code reviews.',
              },
              {
                step: '04',
                title: 'Verify & Earn',
                icon: <VerifiedIcon sx={{ color: '#10B981' }} />,
                desc: 'Merged pull requests trigger automated verification, releasing pre-funded Midnight token rewards.',
              },
            ].map((s) => (
              <Paper
                key={s.step}
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: '12px',
                  backgroundColor: '#131620',
                  border: '1px solid #1E2332',
                  position: 'relative',
                }}
              >
                <Typography
                  variant="caption"
                  color="#3B82F6"
                  sx={{ fontWeight: 900, fontSize: '0.875rem', display: 'block', mb: 2, fontFamily: 'monospace' }}
                >
                  {s.step}
                </Typography>
                <Box sx={{ mb: 1.5 }}>{s.icon}</Box>
                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem' }}>
                  {s.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {s.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 4. Why Midnight Forge Section */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h2" color="text.primary" sx={{ fontWeight: 800, mb: 1 }}>
              Why Build on Midnight Forge?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Designed for open-source developers who value transparency, zero-knowledge privacy, and fair rewards.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: '12px',
                backgroundColor: '#131620',
                border: '1px solid #1E2332',
              }}
            >
              <SecurityIcon sx={{ color: '#3B82F6', fontSize: 32, mb: 2 }} />
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
                Zero-Knowledge Privacy
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Protect sensitive project data and contributor metadata using Midnight’s ZK protocol features.
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: '12px',
                backgroundColor: '#131620',
                border: '1px solid #1E2332',
              }}
            >
              <CodeIcon sx={{ color: '#3B82F6', fontSize: 32, mb: 2 }} />
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
                Native GitHub Workflow
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                No complex new IDEs or platforms. Work directly where code lives using standard pull requests.
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: '12px',
                backgroundColor: '#131620',
                border: '1px solid #1E2332',
              }}
            >
              <PeopleIcon sx={{ color: '#3B82F6', fontSize: 32, mb: 2 }} />
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
                Fluid Developer Roles
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                A single 1AM wallet address allows you to publish projects today and contribute to others tomorrow.
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* 5. Open Contribution Opportunities Preview */}
      <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: '#07080B', borderTop: '1px solid #1E2332' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
            <Box>
              <Typography variant="caption" color="#60A5FA" sx={{ fontWeight: 700, letterSpacing: '0.08em' }}>
                HOT TASKS
              </Typography>
              <Typography variant="h2" color="text.primary" sx={{ mt: 0.5, fontWeight: 800 }}>
                Open Contribution Opportunities
              </Typography>
            </Box>
            <Button
              variant="text"
              onClick={() => navigate('/explore')}
              endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={{ color: '#94A3B8', '&:hover': { color: '#F8FAFC' } }}
            >
              Explore All Tasks
            </Button>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {mockContributions.slice(0, 3).map((contrib) => (
              <ContributionCard key={contrib.contributionId} contribution={contrib} />
            ))}
          </Box>
        </Container>
      </Box>

      {/* 6. CTA Banner */}
      <Box sx={{ py: { xs: 8, md: 10 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: '16px',
              backgroundColor: '#131620',
              border: '1px solid #262D3D',
              backgroundImage: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 60%)',
            }}
          >
            <Typography variant="h2" color="text.primary" sx={{ fontWeight: 800, mb: 2 }}>
              Ready to Forge Open-Source Software?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 540, mx: 'auto' }}>
              Publish your project to find active contributors, or explore open opportunities to earn Midnight rewards.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/explore')}
                sx={{ px: 3.5, py: 1.2, fontWeight: 700 }}
              >
                Browse Projects
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handlePublishClick}
                sx={{ px: 3.5, py: 1.2, fontWeight: 600, borderColor: '#262D3D', color: '#F8FAFC' }}
              >
                Publish Project
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* 7. Footer */}
      <Footer />
    </Box>
  );
};
