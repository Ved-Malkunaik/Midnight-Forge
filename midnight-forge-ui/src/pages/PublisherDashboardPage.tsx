import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Grid, Button, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useProjects } from '../contexts';
import { Footer } from '../components';
import { useWallet } from '../hooks/useWallet';

export const PublisherDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, connect } = useWallet();
  const { projects } = useProjects();

  const handlePublishClick = () => {
    if (!isConnected) {
      connect();
    } else {
      navigate('/publish');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0B0C10' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon fontSize="small" />}
          onClick={() => navigate('/explore')}
          sx={{ color: '#94A3B8', mb: 4, '&:hover': { color: '#F8FAFC' } }}
        >
          Back to Explore
        </Button>

        {/* Dashboard Header */}
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="caption" color="#60A5FA" sx={{ fontWeight: 700, letterSpacing: '0.08em' }}>
              PUBLISHER MANAGEMENT
            </Typography>
            <Typography variant="h2" color="text.primary" sx={{ mt: 0.5, fontWeight: 800 }}>
              Publisher Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              Manage your published software repositories, open task opportunities, and reward distributions.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handlePublishClick}
            sx={{ fontWeight: 700, px: 3, py: 1.2 }}
          >
            Publish New Project
          </Button>
        </Box>

        {/* Overview Stats */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #1E2332' }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Projects Owned
              </Typography>
              <Typography variant="h4" color="text.primary" sx={{ fontWeight: 800, mt: 1 }}>
                {projects.length}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #1E2332' }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Total Active Tasks
              </Typography>
              <Typography variant="h4" color="text.primary" sx={{ fontWeight: 800, mt: 1 }}>
                20
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #1E2332' }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Total Disbursed Rewards
              </Typography>
              <Typography variant="h4" color="#10B981" sx={{ fontWeight: 800, mt: 1 }}>
                107,500 tNIGHT
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Projects List */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" color="text.primary" sx={{ fontWeight: 800, mb: 3 }}>
            Your Published Repositories
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {projects.map((project) => (
              <Paper
                key={project.projectId}
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: '12px',
                  backgroundColor: '#131620',
                  border: '1px solid #1E2332',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <GitHubIcon sx={{ fontSize: 16, color: '#94A3B8' }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                        {project.githubRepository.replace('https://github.com/', '')}
                      </Typography>
                    </Box>
                    <Typography variant="h5" color="text.primary" sx={{ fontWeight: 800 }}>
                      {project.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<SettingsIcon fontSize="small" />}
                      onClick={() => navigate(`/projects/${project.projectId}/manage`)}
                      sx={{ borderColor: '#262D3D', color: '#F8FAFC' }}
                    >
                      Manage Project
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddIcon fontSize="small" />}
                      onClick={() => navigate(`/projects/${project.projectId}/manage`)}
                    >
                      Add Opportunity
                    </Button>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {project.shortDescription}
                </Typography>

                <Box sx={{ display: 'flex', gap: 4, pt: 2, borderTop: '1px solid #1E2332', flexWrap: 'wrap' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Open Opportunities
                    </Typography>
                    <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700 }}>
                      {project.openTaskCount}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Completed Contributions
                    </Typography>
                    <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700 }}>
                      {project.completedTaskCount}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Reward Pool
                    </Typography>
                    <Typography variant="subtitle1" color="#10B981" sx={{ fontWeight: 700 }}>
                      {project.rewardPool}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Status
                    </Typography>
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{ mt: 0.5, fontWeight: 700, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}
                    />
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};
