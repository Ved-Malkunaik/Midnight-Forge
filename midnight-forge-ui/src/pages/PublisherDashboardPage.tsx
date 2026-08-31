import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Grid, Button, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useProjects } from '../contexts';
import { Footer, EmptyState } from '../components';
import { useWallet } from '../hooks/useWallet';

export const PublisherDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, connect } = useWallet();
  const { projects } = useProjects();

  const handlePublishClick = () => {
    if (!isConnected) {
      void connect();
    } else {
      navigate('/publish');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000000' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon fontSize="small" />}
          onClick={() => navigate('/explore')}
          sx={{ color: '#FFFFFF', mb: 4, borderRadius: 0, fontWeight: 700 }}
        >
          BACK TO EXPLORE
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
            <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.6)' }}>
              PUBLISHER MANAGEMENT
            </Typography>
            <Typography variant="h2" color="#FFFFFF" sx={{ mt: 0.5, fontWeight: 900, textTransform: 'uppercase' }}>
              Publisher Hub
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, color: 'rgba(255, 255, 255, 0.75)' }}>
              Manage your published software repositories, open task opportunities, and reward distributions.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handlePublishClick}
            sx={{ fontWeight: 800, px: 3, py: 1.2, borderRadius: 0 }}
          >
            PUBLISH NEW PROJECT
          </Button>
        </Box>

        {/* Overview Stats */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>
                PROJECTS OWNED
              </Typography>
              <Typography variant="h4" color="#FFFFFF" sx={{ fontWeight: 900, mt: 1, fontFamily: 'monospace' }}>
                {projects.length}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>
                TOTAL ACTIVE TASKS
              </Typography>
              <Typography variant="h4" color="#FFFFFF" sx={{ fontWeight: 900, mt: 1, fontFamily: 'monospace' }}>
                {projects.reduce((acc, p) => acc + (p.openTaskCount || 0), 0)}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>
                TOTAL DISBURSED REWARDS
              </Typography>
              <Typography variant="h4" color="#FFFFFF" sx={{ fontWeight: 900, mt: 1, fontFamily: 'monospace' }}>
                0 tNIGHT
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Projects List */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" color="#FFFFFF" sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
            Your Published Repositories
          </Typography>

          {projects.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {projects.map((project) => (
                <Paper
                  key={project.projectId}
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 0,
                    backgroundColor: '#000000',
                    border: '1px solid #FFFFFF',
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
                        <GitHubIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.7)' }}>
                          {project.githubRepository.replace('https://github.com/', '')}
                        </Typography>
                      </Box>
                      <Typography variant="h5" color="#FFFFFF" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
                        {project.name}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<SettingsIcon fontSize="small" />}
                        onClick={() => navigate(`/projects/${project.projectId}/manage`)}
                        sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0, fontWeight: 700 }}
                      >
                        MANAGE PROJECT
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon fontSize="small" />}
                        onClick={() => navigate(`/projects/${project.projectId}/manage`)}
                        sx={{ borderRadius: 0, fontWeight: 800 }}
                      >
                        ADD OPPORTUNITY
                      </Button>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.75)' }}>
                    {project.shortDescription}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 4, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.2)', flexWrap: 'wrap' }}>
                    <Box>
                      <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
                        OPEN TASKS
                      </Typography>
                      <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                        {project.openTaskCount}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
                        REWARD POOL
                      </Typography>
                      <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                        {project.rewardPool}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
                        STATUS
                      </Typography>
                      <Chip
                        label={project.status}
                        size="small"
                        sx={{ mt: 0.5, fontWeight: 800, backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #FFFFFF', borderRadius: 0 }}
                      />
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <EmptyState
              title="NO PUBLISHED REPOSITORIES YET"
              description="You haven't registered any repositories on Midnight Network. Publish your first project to start creating contribution opportunities."
              actionLabel="PUBLISH NEW PROJECT"
              onAction={handlePublishClick}
            />
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

