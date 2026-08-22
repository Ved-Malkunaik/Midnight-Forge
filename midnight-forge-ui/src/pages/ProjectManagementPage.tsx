import React, { useState } from 'react';
import { useParams, useNavigate } from 'react';
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
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { mockProjects } from '../data/mockProjects';
import { mockContributions } from '../data/mockContributions';
import { StatusBadge, Footer } from '../components';
import type { DifficultyLevel } from '../types/marketplace';

export const ProjectManagementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = mockProjects.find((p) => p.projectId === id) || mockProjects[0];
  const contributions = mockContributions.filter((c) => c.projectId === project.projectId);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskReward, setTaskReward] = useState('2,000 tNIGHT');
  const [taskDifficulty, setTaskDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [successAlert, setSuccessAlert] = useState(false);

  const handleCreateTask = () => {
    if (!taskTitle.trim() || !taskDesc.trim()) return;
    setSuccessAlert(true);
    setDialogOpen(false);
    setTaskTitle('');
    setTaskDesc('');
    setTimeout(() => setSuccessAlert(false), 4000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0B0C10' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Back Link */}
        <Button
          startIcon={<ArrowBackIcon fontSize="small" />}
          onClick={() => navigate(`/projects/${project.projectId}`)}
          sx={{ color: '#94A3B8', mb: 4, '&:hover': { color: '#F8FAFC' } }}
        >
          Back to Project Details
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
            <Typography variant="caption" color="#60A5FA" sx={{ fontWeight: 700, letterSpacing: '0.08em' }}>
              PROJECT MANAGEMENT
            </Typography>
            <Typography variant="h2" color="text.primary" sx={{ mt: 0.5, fontWeight: 800 }}>
              {project.name} Workspace
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              Manage task opportunities, review pull request submissions, and release Midnight rewards.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{ fontWeight: 700, px: 3, py: 1.2 }}
          >
            Create Opportunity
          </Button>
        </Box>

        {successAlert && (
          <Alert severity="success" sx={{ mb: 4, borderRadius: '8px' }}>
            New contribution opportunity created successfully! It is now visible to marketplace contributors.
          </Alert>
        )}

        {/* Contribution Opportunities List */}
        <Paper
          elevation={0}
          sx={{ p: 4, borderRadius: '16px', backgroundColor: '#131620', border: '1px solid #1E2332', mb: 5 }}
        >
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 3 }}>
            Active Tasks & Pull Requests ({contributions.length})
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {contributions.map((task) => (
              <Paper
                key={task.contributionId}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '10px',
                  backgroundColor: '#0F121C',
                  border: '1px solid #1E2332',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700 }}>
                    {task.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    Difficulty: {task.difficulty} • Reward: {task.rewardAmount}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <StatusBadge status={task.status} />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/contributions/${task.contributionId}`)}
                    sx={{ borderColor: '#262D3D', color: '#F8FAFC' }}
                  >
                    Manage Task
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </Paper>

        {/* Create Opportunity Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>Create Contribution Opportunity</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
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
                label="Reward Amount"
                value={taskReward}
                onChange={(e) => setTaskReward(e.target.value)}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setDialogOpen(false)} sx={{ color: '#94A3B8' }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleCreateTask} startIcon={<CheckCircleIcon />}>
              Create Task
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

      <Footer />
    </Box>
  );
};
