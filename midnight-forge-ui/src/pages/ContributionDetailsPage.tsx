import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { mockContributions } from '../data/mockContributions';
import { StatusBadge, Footer } from '../components';
import { useWallet } from '../hooks/useWallet';

const lifecycleSteps = [
  { id: 'OPEN', label: 'Open' },
  { id: 'CLAIMED', label: 'Claimed' },
  { id: 'PR_SUBMITTED', label: 'PR Submitted' },
  { id: 'MERGED', label: 'Merged' },
  { id: 'ACCEPTED', label: 'Accepted' },
  { id: 'REWARDED', label: 'Rewarded' },
];

export const ContributionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isConnected, connect } = useWallet();

  const [claimedLocal, setClaimedLocal] = useState(false);
  const contribution = mockContributions.find((c) => c.contributionId === id) || mockContributions[0];

  const currentStatus = claimedLocal ? 'CLAIMED' : contribution.status;
  const currentStepIndex = lifecycleSteps.findIndex((s) => s.id === currentStatus);

  const handleClaimClick = () => {
    if (!isConnected) {
      void connect();
    } else {
      setClaimedLocal(true);
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

        {/* Header Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '16px',
            backgroundColor: '#131620',
            border: '1px solid #1E2332',
            mb: 5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="caption" color="#60A5FA" sx={{ fontWeight: 700, letterSpacing: '0.04em' }}>
                {contribution.projectName}
              </Typography>
              <Typography variant="h2" color="text.primary" sx={{ mt: 0.5, fontWeight: 800 }}>
                {contribution.title}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <StatusBadge status={currentStatus} size="medium" />
              <Typography variant="h5" color="#10B981" sx={{ fontWeight: 800 }}>
                {contribution.rewardAmount}
              </Typography>
            </Box>
          </Box>

          {/* Visual Lifecycle Progression Bar */}
          <Box sx={{ my: 4, pt: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 2 }}>
              CONTRIBUTION LIFECYCLE PROGRESS
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
                gap: 1.5,
              }}
            >
              {lifecycleSteps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <Box
                    key={step.id}
                    sx={{
                      p: 1.5,
                      borderRadius: '8px',
                      textAlign: 'center',
                      backgroundColor: isCurrent ? 'rgba(59, 130, 246, 0.15)' : isPassed ? '#1E2332' : '#0B0C10',
                      border: '1px solid',
                      borderColor: isCurrent ? '#3B82F6' : isPassed ? 'rgba(59, 130, 246, 0.3)' : '#1E2332',
                    }}
                  >
                    <Typography
                      variant="caption"
                      color={isCurrent ? '#60A5FA' : isPassed ? '#F8FAFC' : '#94A3B8'}
                      sx={{ fontWeight: isCurrent ? 700 : 500, display: 'block' }}
                    >
                      {step.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Divider sx={{ borderColor: '#1E2332', my: 3 }} />

          {/* Primary Claim Action Button */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}
          >
            {claimedLocal ? (
              <Alert
                severity="success"
                sx={{ borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}
              >
                You have successfully claimed this contribution! Work on GitHub and submit a PR to proceed.
              </Alert>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {isConnected
                  ? 'Claim this task to mark it as in-progress under your wallet address.'
                  : 'Connecting your 1AM wallet is required only when claiming this opportunity.'}
              </Typography>
            )}

            {!claimedLocal && (
              <Button
                variant="contained"
                size="large"
                onClick={handleClaimClick}
                startIcon={!isConnected ? <AccountBalanceWalletIcon /> : undefined}
                sx={{ px: 4, py: 1.2, fontWeight: 700 }}
              >
                {isConnected ? 'Claim Contribution' : 'Connect Wallet to Claim'}
              </Button>
            )}
          </Box>
        </Paper>

        {/* Task Details & Requirements */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Description Card */}
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #1E2332' }}
            >
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 2 }}>
                Task Description
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                {contribution.description}
              </Typography>

              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700, mb: 1.5 }}>
                Requirements & Acceptance Criteria:
              </Typography>

              <List disablePadding>
                {contribution.requirements.map((req, idx) => (
                  <ListItem key={idx} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32, color: '#3B82F6' }}>
                      <CheckCircleOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={req}
                      slotProps={{ primary: { variant: 'body2', color: 'text.secondary' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>

          {/* Right Sidebar: Details & Links */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #1E2332' }}
            >
              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700, mb: 2 }}>
                Opportunity Overview
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Difficulty
                  </Typography>
                  <Chip
                    label={contribution.difficulty}
                    size="small"
                    sx={{ mt: 0.5, fontWeight: 700, backgroundColor: '#1E2332', color: '#60A5FA' }}
                  />
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Reward Pool
                  </Typography>
                  <Typography variant="subtitle2" color="#10B981" sx={{ fontWeight: 700 }}>
                    {contribution.rewardAmount}
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: '#1E2332' }} />

                {contribution.githubIssueUrl && (
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href={contribution.githubIssueUrl}
                    target="_blank"
                    sx={{ borderColor: '#262D3D', color: '#F8FAFC', fontWeight: 600 }}
                  >
                    View GitHub Issue
                  </Button>
                )}
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};
