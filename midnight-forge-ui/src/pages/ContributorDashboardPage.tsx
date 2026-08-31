import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Grid, Button, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { StatusBadge, Footer, ProjectCard, EmptyState } from '../components';
import { useWallet } from '../hooks/useWallet';
import { useProjects } from '../contexts';
import { dataService } from '../services/dataService';
import type { Contribution } from '../types/marketplace';

export const ContributorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, account, connect } = useWallet();
  const { projects } = useProjects();

  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    void dataService.getContributions().then(setContributions);
  }, []);

  const claimedTasks = contributions.filter((c) => c.status === 'CLAIMED');
  const reviewTasks = contributions.filter((c) => c.status === 'PR_SUBMITTED' || c.status === 'MERGED' || c.status === 'ACCEPTED');
  const completedTasks = contributions.filter((c) => c.status === 'REWARDED');

  const totalEarnings = completedTasks.reduce((sum, c) => {
    const raw = parseInt(c.rewardAmount.replace(/[^0-9]/g, ''), 10) || 0;
    return sum + raw;
  }, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000000' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Back Link */}
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
              CONTRIBUTOR PORTAL
            </Typography>
            <Typography variant="h2" color="#FFFFFF" sx={{ mt: 0.5, fontWeight: 900, textTransform: 'uppercase' }}>
              Contributor Hub
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, color: 'rgba(255, 255, 255, 0.75)' }}>
              Track active task claims, pull request reviews, and earned Midnight token rewards.
            </Typography>
          </Box>

          {!isConnected && (
            <Button variant="contained" onClick={() => void connect()} sx={{ fontWeight: 800, px: 3, py: 1, borderRadius: 0 }}>
              CONNECT 1AM WALLET
            </Button>
          )}
        </Box>

        {/* Wallet Address Banner */}
        {isConnected && account && (
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 0,
              backgroundColor: '#000000',
              border: '1px solid #FFFFFF',
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
            }}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              CONNECTED 1AM WALLET:{' '}
              <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>{account.address}</strong>
            </Typography>
            <Chip
              label="1AM CONNECTED"
              size="small"
              sx={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 800, borderRadius: 0 }}
            />
          </Paper>
        )}

        {/* Summary Stat Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <HourglassEmptyIcon sx={{ color: '#FFFFFF' }} />
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>
                  ACTIVE CLAIMS
                </Typography>
              </Box>
              <Typography variant="h4" color="#FFFFFF" sx={{ fontWeight: 900, fontFamily: 'monospace' }}>
                {claimedTasks.length}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <TaskAltIcon sx={{ color: '#FFFFFF' }} />
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>
                  PENDING REVIEWS
                </Typography>
              </Box>
              <Typography variant="h4" color="#FFFFFF" sx={{ fontWeight: 900, fontFamily: 'monospace' }}>
                {reviewTasks.length}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <MonetizationOnIcon sx={{ color: '#FFFFFF' }} />
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>
                  TOTAL REWARDS EARNED
                </Typography>
              </Box>
              <Typography variant="h4" color="#FFFFFF" sx={{ fontWeight: 900, fontFamily: 'monospace' }}>
                {totalEarnings.toLocaleString()} tNIGHT
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Section 1: Discover Ecosystem Projects & Opportunities */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" color="#FFFFFF" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase' }}>
            Ecosystem Repositories & Opportunities ({projects.length})
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.75)' }}>
            Discover open-source Midnight projects published by the community. Click any project to inspect tasks and contribute via GitHub.
          </Typography>

          {projects.length > 0 ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {projects.map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
            </Box>
          ) : (
            <EmptyState
              title="NO ECOSYSTEM PROJECTS FOUND"
              description="No open-source repositories have been published on Midnight Network yet. Check back soon or publish your own project!"
              actionLabel="PUBLISH NEW PROJECT"
              onAction={() => navigate('/publish')}
            />
          )}
        </Box>

        {/* Section 2: Active Claims */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" color="#FFFFFF" sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
            Active Claimed Tasks ({claimedTasks.length})
          </Typography>

          {claimedTasks.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {claimedTasks.map((task) => (
                <Paper
                  key={task.contributionId}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 0,
                    backgroundColor: '#000000',
                    border: '1px solid #FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="#FFFFFF" sx={{ fontWeight: 800 }}>
                      {task.projectName.toUpperCase()}
                    </Typography>
                    <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 800, mt: 0.5 }}>
                      {task.title}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'rgba(255, 255, 255, 0.6)' }}>
                      Claimed on {task.claimedAt ? new Date(task.claimedAt).toLocaleDateString() : 'Recent'} • Difficulty: {task.difficulty}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StatusBadge status={task.status} />
                    <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                      {task.rewardAmount}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/contributions/${task.contributionId}`)}
                      sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0, fontWeight: 700 }}
                    >
                      VIEW DETAILS
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <EmptyState
              title="NO ACTIVE TASK CLAIMS"
              description="You have no active claims. Browse available opportunities in the marketplace to start contributing!"
              actionLabel="EXPLORE OPPORTUNITIES"
              onAction={() => navigate('/explore')}
            />
          )}
        </Box>

        {/* Section 3: Completed & Rewarded Tasks */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" color="#FFFFFF" sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
            Completed & Rewarded Contributions ({completedTasks.length})
          </Typography>

          {completedTasks.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {completedTasks.map((task) => (
                <Paper
                  key={task.contributionId}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 0,
                    backgroundColor: '#000000',
                    border: '1px solid #FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="#FFFFFF" sx={{ fontWeight: 800 }}>
                      {task.projectName.toUpperCase()}
                    </Typography>
                    <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 800, mt: 0.5 }}>
                      {task.title}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'rgba(255, 255, 255, 0.6)' }}>
                      Completed on {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : 'Recent'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StatusBadge status={task.status} />
                    <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 900, fontFamily: 'monospace' }}>
                      + {task.rewardAmount}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <EmptyState
              title="NO REWARDED CONTRIBUTIONS YET"
              description="Contributions with merged PRs and confirmed NIGHT token payouts will appear here."
            />
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};


