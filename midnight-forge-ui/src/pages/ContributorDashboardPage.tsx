import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Grid, Button, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CodeIcon from '@mui/icons-material/Code';
import { StatusBadge, Footer, ProjectCard, EmptyState } from '../components';
import { useWallet } from '../hooks/useWallet';
import { useProjects } from '../contexts';
import type { Contribution } from '../types/marketplace';

export const ContributorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, account, connect } = useWallet();
  const { projects } = useProjects();

  const claimedTasks: Contribution[] = [];
  const reviewTasks: Contribution[] = [];
  const completedTasks: Contribution[] = [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0B0C10' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Back Link */}
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
              CONTRIBUTOR PORTAL
            </Typography>
            <Typography variant="h2" color="text.primary" sx={{ mt: 0.5, fontWeight: 800 }}>
              Contributor Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              Track active claims, pull request reviews, and earned Midnight token rewards.
            </Typography>
          </Box>

          {!isConnected && (
            <Button variant="contained" onClick={() => connect()} sx={{ fontWeight: 700 }}>
              Connect Wallet
            </Button>
          )}
        </Box>

        {/* Wallet Address Banner */}
        {isConnected && account && (
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '10px',
              backgroundColor: '#131620',
              border: '1px solid #1E2332',
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Connected Wallet Address:{' '}
              <strong style={{ color: '#F8FAFC', fontFamily: 'monospace' }}>{account.address}</strong>
            </Typography>
            <Chip
              label="1AM Active"
              size="small"
              sx={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', fontWeight: 700 }}
            />
          </Paper>
        )}

        {/* Summary Stat Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #1E2332' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <HourglassEmptyIcon sx={{ color: '#F59E0B' }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Active Claims
                </Typography>
              </Box>
              <Typography variant="h4" color="text.primary" sx={{ fontWeight: 800 }}>
                {claimedTasks.length}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #1E2332' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <TaskAltIcon sx={{ color: '#3B82F6' }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Pending Reviews
                </Typography>
              </Box>
              <Typography variant="h4" color="text.primary" sx={{ fontWeight: 800 }}>
                {reviewTasks.length}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #1E2332' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <MonetizationOnIcon sx={{ color: '#10B981' }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Total Rewards Earned
                </Typography>
              </Box>
              <Typography variant="h4" color="#10B981" sx={{ fontWeight: 800 }}>
                4,500 tNIGHT
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Section 1: Discover Ecosystem Projects & Opportunities */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" color="text.primary" sx={{ fontWeight: 800, mb: 1 }}>
            Ecosystem Repositories & Contribution Opportunities ({projects.length})
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Discover open-source Midnight projects published by the community. Click any project to inspect tasks and contribute.
          </Typography>

          {projects.length > 0 ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {projects.map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
            </Box>
          ) : (
            <EmptyState
              title="No Ecosystem Projects Found"
              description="No open-source repositories have been published on Midnight Network yet. Check back soon or publish your own project!"
              actionLabel="Publish New Project"
              onAction={() => navigate('/publish')}
            />
          )}
        </Box>

        {/* Section 2: Active Claims */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" color="text.primary" sx={{ fontWeight: 800, mb: 3 }}>
            Active Claimed Tasks ({claimedTasks.length})
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {claimedTasks.map((task) => (
              <Paper
                key={task.contributionId}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '12px',
                  backgroundColor: '#131620',
                  border: '1px solid #1E2332',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="caption" color="#60A5FA" sx={{ fontWeight: 700 }}>
                    {task.projectName}
                  </Typography>
                  <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mt: 0.5 }}>
                    {task.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    Claimed on {task.claimedAt} • Difficulty: {task.difficulty}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <StatusBadge status={task.status} />
                  <Typography variant="subtitle1" color="#10B981" sx={{ fontWeight: 700 }}>
                    {task.rewardAmount}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/contributions/${task.contributionId}`)}
                    sx={{ borderColor: '#262D3D', color: '#F8FAFC' }}
                  >
                    View Details
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Section 3: Completed & Rewarded Tasks */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" color="text.primary" sx={{ fontWeight: 800, mb: 3 }}>
            Completed & Rewarded Contributions ({completedTasks.length})
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {completedTasks.map((task) => (
              <Paper
                key={task.contributionId}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '12px',
                  backgroundColor: '#131620',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="caption" color="#60A5FA" sx={{ fontWeight: 700 }}>
                    {task.projectName}
                  </Typography>
                  <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mt: 0.5 }}>
                    {task.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    Completed on {task.updatedAt}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <StatusBadge status={task.status} />
                  <Typography variant="subtitle1" color="#10B981" sx={{ fontWeight: 800 }}>
                    + {task.rewardAmount}
                  </Typography>
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
