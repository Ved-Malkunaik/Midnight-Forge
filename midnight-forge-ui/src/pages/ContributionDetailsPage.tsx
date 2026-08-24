import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RefreshIcon from '@mui/icons-material/Refresh';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { mockContributions } from '../data/mockContributions';
import { StatusBadge, Footer } from '../components';
import { useWallet } from '../hooks/useWallet';
import { contractService, type TxProgress, type RewardReleaseResult } from '../services/contract/contractService';
import { githubSyncService, type GitHubPRStatus } from '../../../api/src/services/githubSync';

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
  const { isConnected, account, connect } = useWallet();

  const [localStatus, setLocalStatus] = useState<
    'OPEN' | 'CLAIMED' | 'PR_SUBMITTED' | 'MERGED' | 'ACCEPTED' | 'REWARDED'
  >('OPEN');
  const [prReferenceInput, setPrReferenceInput] = useState('');
  const [txProgress, setTxProgress] = useState<TxProgress>({ step: 'idle' });
  const [rewardResult, setRewardResult] = useState<RewardReleaseResult | null>(null);

  const contribution = mockContributions.find((c) => c.contributionId === id) || mockContributions[0];

  useEffect(() => {
    setLocalStatus(contribution.status);
  }, [contribution]);

  // Realtime / Near-realtime GitHub PR Status State
  const [githubPrInfo, setGithubPrInfo] = useState<GitHubPRStatus>(() =>
    githubSyncService.getPRStatus(contribution.contributionId),
  );

  const handleRefreshPRStatus = () => {
    const updated = githubSyncService.getPRStatus(contribution.contributionId);
    setGithubPrInfo(updated);
  };

  const currentStepIndex = lifecycleSteps.findIndex((s) => s.id === localStatus);

  const handleClaimClick = async () => {
    if (!isConnected) {
      void connect();
      return;
    }

    try {
      await contractService.claimContribution(contribution.contributionId, (prog) => setTxProgress(prog));
      setLocalStatus('CLAIMED');
    } catch (err) {
      setTxProgress({ step: 'failed', error: err instanceof Error ? err.message : 'Claim failed' });
    }
  };

  const handleSubmitPRReference = async () => {
    if (!prReferenceInput.trim()) return;
    try {
      await contractService.submitContribution(contribution.contributionId, prReferenceInput, (prog) =>
        setTxProgress(prog),
      );
      setLocalStatus('PR_SUBMITTED');
    } catch (err) {
      setTxProgress({ step: 'failed', error: err instanceof Error ? err.message : 'PR submission failed' });
    }
  };

  const handleReleaseReward = async () => {
    try {
      const recipient = account?.address || 'mn1a_contributor_preprod_89ef';
      const result = await contractService.releaseReward(
        contribution.contributionId,
        contribution.rewardAmount,
        recipient,
        (prog) => setTxProgress(prog),
      );
      setRewardResult(result);
      setLocalStatus('REWARDED');
    } catch (err) {
      setTxProgress({ step: 'failed', error: err instanceof Error ? err.message : 'Reward release failed' });
    }
  };

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
              <StatusBadge status={localStatus} size="medium" />
              <Typography variant="h5" color="#10B981" sx={{ fontWeight: 800 }}>
                {contribution.rewardAmount}
              </Typography>
            </Box>
          </Box>

          {/* Visual Lifecycle Progression Bar */}
          <Box sx={{ my: 4, pt: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 2 }}>
              MIDNIGHT CONTRACT LIFECYCLE PROGRESS
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

          {/* Primary Action Button Bar */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}
          >
            {localStatus === 'OPEN' && (
              <Button
                variant="contained"
                size="large"
                onClick={() => void handleClaimClick()}
                startIcon={!isConnected ? <AccountBalanceWalletIcon /> : undefined}
                sx={{ px: 4, py: 1.2, fontWeight: 700 }}
              >
                {isConnected ? 'Claim Contribution' : 'Connect Wallet to Claim'}
              </Button>
            )}

            {localStatus === 'CLAIMED' && (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%' }}>
                <TextField
                  placeholder="Enter GitHub Pull Request URL or #PR (e.g. https://github.com/org/repo/pull/19)"
                  value={prReferenceInput}
                  onChange={(e) => setPrReferenceInput(e.target.value)}
                  size="small"
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={() => void handleSubmitPRReference()}
                  sx={{ px: 3, fontWeight: 700 }}
                >
                  Submit PR Reference
                </Button>
              </Box>
            )}

            {localStatus === 'ACCEPTED' && (
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<MonetizationOnIcon />}
                onClick={() => void handleReleaseReward()}
                sx={{ px: 4, py: 1.2, fontWeight: 800 }}
              >
                Authorize & Release Reward ({contribution.rewardAmount})
              </Button>
            )}

            {rewardResult && (
              <Alert
                severity="success"
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10B981',
                }}
              >
                Reward Released Successfully! Transaction Hash: <strong>{rewardResult.txHash}</strong>
              </Alert>
            )}
          </Box>
        </Paper>

        {/* Realtime GitHub PR Status Widget & Task Content */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Realtime GitHub Status Box */}
            <Paper
              elevation={0}
              sx={{ p: 3.5, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #262D3D' }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GitHubIcon sx={{ color: '#94A3B8' }} />
                  <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700 }}>
                    Realtime GitHub PR Tracker
                  </Typography>
                </Box>
                <Button
                  size="small"
                  startIcon={<RefreshIcon fontSize="small" />}
                  onClick={handleRefreshPRStatus}
                  sx={{ color: '#94A3B8' }}
                >
                  Sync Now
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                  gap: 2,
                  p: 2,
                  backgroundColor: '#0B0C10',
                  borderRadius: '8px',
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Repository
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                    {githubPrInfo.repoName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    GitHub PR Status
                  </Typography>
                  <Chip
                    label={githubPrInfo.githubState}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      backgroundColor: githubPrInfo.isMerged ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                      color: githubPrInfo.isMerged ? '#10B981' : '#60A5FA',
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Pull Request Link
                  </Typography>
                  <Button
                    size="small"
                    endIcon={<OpenInNewIcon fontSize="small" />}
                    href={githubPrInfo.htmlUrl}
                    target="_blank"
                    sx={{ p: 0, color: '#60A5FA' }}
                  >
                    PR #{githubPrInfo.prNumber}
                  </Button>
                </Box>
              </Box>

              <Typography variant="caption" color="text.secondary">
                Last synchronized via GitHub API & Webhooks: {new Date(githubPrInfo.lastSyncedAt).toLocaleTimeString()}
              </Typography>
            </Paper>

            {/* Task Description */}
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

          {/* Right Sidebar */}
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
                    Predefined Reward
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

        {/* Transaction Progress Dialog */}
        <Dialog open={txProgress.step !== 'idle' && txProgress.step !== 'confirmed' && txProgress.step !== 'failed'}>
          <DialogTitle sx={{ fontWeight: 700, textAlign: 'center' }}>Executing Midnight Transaction</DialogTitle>
          <DialogContent sx={{ p: 4, textAlign: 'center', minWidth: 320 }}>
            <CircularProgress size={48} sx={{ color: '#3B82F6', mb: 3 }} />
            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600, mb: 1 }}>
              {txProgress.message || 'Processing...'}
            </Typography>

            {txProgress.txHash && (
              <Box sx={{ mt: 2, p: 1.5, backgroundColor: '#0B0C10', borderRadius: '6px' }}>
                <Typography variant="caption" color="#60A5FA" sx={{ fontFamily: 'monospace' }}>
                  Tx: {txProgress.txHash.slice(0, 16)}...
                </Typography>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Container>

      <Footer />
    </Box>
  );
};
