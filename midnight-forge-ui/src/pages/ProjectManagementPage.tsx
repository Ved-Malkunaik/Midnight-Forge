import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import VerifiedIcon from '@mui/icons-material/Verified';
import { mockContributions } from '../data/mockContributions';
import { useProjects } from '../contexts';
import { EmptyState, StatusBadge, Footer } from '../components';
import type { DifficultyLevel, ContributionStatus } from '../types/marketplace';
import { dataService } from '../services/dataService';
import { contractService, type TxProgress } from '../services/contract/contractService';

export const ProjectManagementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [taskStatuses, setTaskStatuses] = useState<Record<string, ContributionStatus>>({
    'contrib-1': 'OPEN',
    'contrib-2': 'CLAIMED',
    'contrib-3': 'PR_SUBMITTED',
    'contrib-4': 'MERGED',
    'contrib-5': 'REWARDED',
  });
  const project = projects.find((p) => p.projectId === id);
  if (!project) {
    return (
      <EmptyState
        title="PROJECT NOT FOUND"
        description="This project is no longer available."
        actionLabel="BACK TO EXPLORE"
        onAction={() => navigate('/explore')}
      />
    );
  }

  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskReward, setTaskReward] = useState('2,000 tNIGHT');
  const [taskDifficulty, setTaskDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [txProgress, setTxProgress] = useState<TxProgress>({ step: 'idle' });

  const handleCreateTask = async () => {
    if (!taskTitle.trim() || !taskDesc.trim()) return;
    try {
      await contractService.createContribution(
        {
          projectId: project.projectId,
          title: taskTitle,
          description: taskDesc,
          difficulty: taskDifficulty,
          rewardAmount: taskReward,
        },
        (prog) => setTxProgress(prog),
      );

      const newContrib = {
        contributionId: `contrib-${Date.now()}`,
        projectId: project.projectId,
        projectName: project.name,
        title: taskTitle.trim(),
        description: taskDesc.trim(),
        difficulty: taskDifficulty,
        rewardAmount: taskReward.trim(),
        status: 'OPEN' as const,
        requirements: ['Implement requested changes', 'Submit PR reference for review'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      void dataService.saveContribution(newContrib);

      setDialogOpen(false);
      setTaskTitle('');
      setTaskDesc('');
    } catch {
      setTxProgress({ step: 'failed' });
    }
  };

  const handleMarkMerged = async (contribId: string) => {
    try {
      await contractService.markContributionMerged(contribId, (prog) => setTxProgress(prog));
      setTaskStatuses((prev) => ({ ...prev, [contribId]: 'MERGED' }));
      const all = await dataService.getContributions();
      const existing = all.find((c) => c.contributionId === contribId);
      if (existing) {
        void dataService.saveContribution({ ...existing, status: 'MERGED', updatedAt: new Date().toISOString() });
      }
    } catch {
      setTxProgress({ step: 'failed' });
    }
  };

  const handleAcceptContribution = async (contribId: string) => {
    try {
      await contractService.acceptContribution(contribId, (prog) => setTxProgress(prog));
      setTaskStatuses((prev) => ({ ...prev, [contribId]: 'ACCEPTED' }));
      const all = await dataService.getContributions();
      const existing = all.find((c) => c.contributionId === contribId);
      if (existing) {
        void dataService.saveContribution({ ...existing, status: 'ACCEPTED', updatedAt: new Date().toISOString() });
      }
    } catch {
      setTxProgress({ step: 'failed' });
    }
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000000' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Back Link */}
        <Button
          startIcon={<ArrowBackIcon fontSize="small" />}
          onClick={() => navigate(`/projects/${project.projectId}`)}
          sx={{ color: '#FFFFFF', mb: 4, borderRadius: 0, fontWeight: 700 }}
        >
          BACK TO PROJECT DETAILS
        </Button>

        {/* Page Header */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.6)' }}>
              PROJECT MANAGEMENT WORKSPACE
            </Typography>
            <Typography variant="h2" color="#FFFFFF" sx={{ mt: 0.5, fontWeight: 900, textTransform: 'uppercase' }}>
              {project.name} Workspace
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, color: 'rgba(255, 255, 255, 0.75)' }}>
              Manage task opportunities, review pull request submissions, and release Midnight rewards.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{ fontWeight: 800, px: 3, py: 1.2, borderRadius: 0 }}
          >
            CREATE OPPORTUNITY
          </Button>
        </Box>

        {/* Contribution Opportunities List */}
        <Paper
          elevation={0}
          sx={{ p: 4, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF', mb: 5 }}
        >
          <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
            Active Tasks & Pull Requests ({mockContributions.length})
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {mockContributions.map((task) => {
              const status = taskStatuses[task.contributionId] || task.status;

              return (
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
                    <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
                      {task.title}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'rgba(255, 255, 255, 0.6)' }}>
                      Difficulty: {task.difficulty} • Bounty: {task.rewardAmount}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StatusBadge status={status} />

                    {status === 'PR_SUBMITTED' && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<MergeTypeIcon />}
                        onClick={() => void handleMarkMerged(task.contributionId)}
                        sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0, fontWeight: 700 }}
                      >
                        MARK MERGED
                      </Button>
                    )}

                    {status === 'MERGED' && (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<VerifiedIcon />}
                        onClick={() => void handleAcceptContribution(task.contributionId)}
                        sx={{ borderRadius: 0, fontWeight: 800 }}
                      >
                        ACCEPT CONTRIBUTION
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/contributions/${task.contributionId}`)}
                      sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0, fontWeight: 700 }}
                    >
                      MANAGE TASK
                    </Button>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        </Paper>

        {/* Create Opportunity Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase' }}>Create Contribution Opportunity</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1, backgroundColor: '#000000' }}>
            <TextField
              label="Task Title *"
              placeholder="e.g. Add ZK Proof Verification Circuit"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Task Description *"
              placeholder="Describe requirements, acceptance criteria, and guidance..."
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              fullWidth
              multiline
              rows={3}
              required
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Difficulty"
                select
                value={taskDifficulty}
                onChange={(e) => setTaskDifficulty(e.target.value as DifficultyLevel)}
                fullWidth
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
              </TextField>
              <TextField
                label="Predefined Reward Amount *"
                value={taskReward}
                onChange={(e) => setTaskReward(e.target.value)}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, backgroundColor: '#000000' }}>
            <Button onClick={() => setDialogOpen(false)} sx={{ color: '#FFFFFF', borderRadius: 0 }}>
              CANCEL
            </Button>
            <Button variant="contained" onClick={() => void handleCreateTask()} startIcon={<CheckCircleIcon />} sx={{ borderRadius: 0, fontWeight: 800 }}>
              CREATE TASK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Transaction Progress Dialog */}
        <Dialog open={txProgress.step !== 'idle' && txProgress.step !== 'confirmed' && txProgress.step !== 'failed'}>
          <DialogTitle sx={{ fontWeight: 900, textAlign: 'center', color: '#FFFFFF', textTransform: 'uppercase' }}>Executing Midnight Transaction</DialogTitle>
          <DialogContent sx={{ p: 4, textAlign: 'center', minWidth: 320, backgroundColor: '#000000' }}>
            <CircularProgress size={48} sx={{ color: '#FFFFFF', mb: 3 }} />
            <Typography variant="body1" color="#FFFFFF" sx={{ fontWeight: 700, mb: 1 }}>
              {txProgress.message || 'Processing...'}
            </Typography>
          </DialogContent>
        </Dialog>
      </Container>

      <Footer />
    </Box>
  );
};

