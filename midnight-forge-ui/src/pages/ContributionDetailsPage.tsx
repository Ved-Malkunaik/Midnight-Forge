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
import { getOneAmExplorerTxUrl, getMidnightExplorerTxUrl } from '../utils/explorer';
import { dataService } from '../services/dataService';
import type { Contribution } from '../types/marketplace';

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

  const [currentContribution, setCurrentContribution] = useState<Contribution>(() => {
    return mockContributions.find((c) => c.contributionId === id) || mockContributions[0];
  });
  const [localStatus, setLocalStatus] = useState<
    'OPEN' | 'CLAIMED' | 'PR_SUBMITTED' | 'MERGED' | 'ACCEPTED' | 'REWARDED'
  >('OPEN');
  const [prReferenceInput, setPrReferenceInput] = useState('');
  const [txProgress, setTxProgress] = useState<TxProgress>({ step: 'idle' });
  const [rewardResult, setRewardResult] = useState<RewardReleaseResult | null>(null);

  useEffect(() => {
    void dataService.getContributions().then((all) => {
      const found = all.find((c) => c.contributionId === id);
      if (found) {
        setCurrentContribution(found);
        setLocalStatus(found.status);
      }
    });
  }, [id]);

  const contribution = currentContribution;

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
      const updated = {
        ...contribution,
        status: 'CLAIMED' as const,
        claimedAt: new Date().toISOString(),
        claimedByWallet: account?.address || '1AM Connected Wallet',
      };
      setCurrentContribution(updated);
      void dataService.saveContribution(updated);
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
      const updated = {
        ...contribution,
        status: 'PR_SUBMITTED' as const,
        prUrl: prReferenceInput.startsWith('http') ? prReferenceInput : `https://github.com/midnight-ntwrk/repository/pull/${prReferenceInput.replace(/[^0-9]/g, '')}`,
        updatedAt: new Date().toISOString(),
      };
      setCurrentContribution(updated);
      void dataService.saveContribution(updated);
    } catch (err) {
      setTxProgress({ step: 'failed', error: err instanceof Error ? err.message : 'PR submission failed' });
    }
  };

  const handleReleaseReward = async () => {
    try {
      const recipient = account?.address || contribution.claimedByWallet || 'mn1a_contributor_preprod_89ef';
      const result = await contractService.releaseReward(
        contribution.contributionId,
        contribution.rewardAmount,
        recipient,
        (prog) => setTxProgress(prog),
      );
      setRewardResult(result);
      setLocalStatus('REWARDED');

      const updated = {
        ...contribution,
        status: 'REWARDED' as const,
        updatedAt: new Date().toISOString(),
      };
      setCurrentContribution(updated);
      void dataService.saveContribution(updated);
      void dataService.saveReward({
        rewardId: `reward-${Date.now()}`,
        contributionId: contribution.contributionId,
        publisherWallet: account?.address || 'Publisher Wallet',
        contributorWallet: recipient,
        amount: contribution.rewardAmount,
        status: 'CONFIRMED',
        txHash: result.txHash,
        confirmedAt: new Date().toISOString(),
      });
    } catch (err) {
      setTxProgress({ step: 'failed', error: err instanceof Error ? err.message : 'Reward release failed' });
    }
  };


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

        {/* Header Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 0,
            backgroundColor: '#000000',
            border: '1px solid #FFFFFF',
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
              <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.6)' }}>
                {contribution.projectName.toUpperCase()}
              </Typography>
              <Typography variant="h2" color="#FFFFFF" sx={{ mt: 0.5, fontWeight: 900, textTransform: 'uppercase' }}>
                {contribution.title}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <StatusBadge status={localStatus} size="medium" />
              <Typography variant="h5" color="#FFFFFF" sx={{ fontWeight: 900, fontFamily: 'monospace' }}>
                {contribution.rewardAmount}
              </Typography>
            </Box>
          </Box>

          {/* Visual Lifecycle Progression Bar */}
          <Box sx={{ my: 4, pt: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', mb: 2, color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.08em' }}>
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
                      borderRadius: 0,
                      textAlign: 'center',
                      backgroundColor: isCurrent ? '#FFFFFF' : '#000000',
                      color: isCurrent ? '#000000' : '#FFFFFF',
                      border: '1px solid #FFFFFF',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 900,
                        display: 'block',
                        color: isCurrent ? '#000000' : isPassed ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.75rem',
                      }}
                    >
                      {step.label.toUpperCase()}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 3 }} />

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
                sx={{ px: 4, py: 1.2, fontWeight: 800, borderRadius: 0 }}
              >
                {isConnected ? 'CLAIM CONTRIBUTION' : 'CONNECT WALLET TO CLAIM'}
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
                  sx={{ px: 3, fontWeight: 800, borderRadius: 0 }}
                >
                  SUBMIT PR REFERENCE
                </Button>
              </Box>
            )}

            {localStatus === 'ACCEPTED' && (
              <Button
                variant="contained"
                size="large"
                startIcon={<MonetizationOnIcon />}
                onClick={() => void handleReleaseReward()}
                sx={{ px: 4, py: 1.2, fontWeight: 900, borderRadius: 0 }}
              >
                CONFIRM & RELEASE REWARD ({contribution.rewardAmount})
              </Button>
            )}

            {rewardResult && (
              <Box
                sx={{
                  width: '100%',
                  p: 2.5,
                  borderRadius: 0,
                  backgroundColor: '#000000',
                  border: '1px solid #FFFFFF',
                }}
              >
                <Typography variant="body1" color="#FFFFFF" sx={{ fontWeight: 800, mb: 1, textTransform: 'uppercase' }}>
                  ✓ Reward Released Successfully!
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all', mb: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
                  Tx Reference: {rewardResult.txHash}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<OpenInNewIcon fontSize="small" />}
                    href={getOneAmExplorerTxUrl(rewardResult.txHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0, fontWeight: 700 }}
                  >
                    1AM BLOCK EXPLORER ↗
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<OpenInNewIcon fontSize="small" />}
                    href={getMidnightExplorerTxUrl(rewardResult.txHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0, fontWeight: 700 }}
                  >
                    MIDNIGHT EXPLORER (PREPROD) ↗
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Realtime GitHub PR Status Widget & Task Content */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Realtime GitHub Status Box */}
            <Paper
              elevation={0}
              sx={{ p: 3.5, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GitHubIcon sx={{ color: '#FFFFFF' }} />
                  <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
                    Realtime GitHub PR Tracker
                  </Typography>
                </Box>
                <Button
                  size="small"
                  startIcon={<RefreshIcon fontSize="small" />}
                  onClick={handleRefreshPRStatus}
                  sx={{ color: '#FFFFFF', border: '1px solid #FFFFFF', borderRadius: 0, fontWeight: 700 }}
                >
                  SYNC NOW
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                  gap: 2,
                  p: 2,
                  backgroundColor: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 0,
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
                    REPOSITORY
                  </Typography>
                  <Typography variant="body2" color="#FFFFFF" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                    {githubPrInfo.repoName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700, mb: 0.5 }}>
                    GITHUB PR STATUS
                  </Typography>
                  <Chip
                    label={githubPrInfo.githubState}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      border: '1px solid #FFFFFF',
                      borderRadius: 0,
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
                    PULL REQUEST LINK
                  </Typography>
                  <Button
                    size="small"
                    endIcon={<OpenInNewIcon fontSize="small" />}
                    href={githubPrInfo.htmlUrl}
                    target="_blank"
                    sx={{ p: 0, color: '#FFFFFF', fontFamily: 'monospace', fontWeight: 800 }}
                  >
                    PR #{githubPrInfo.prNumber} ↗
                  </Button>
                </Box>
              </Box>

              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Last synchronized via GitHub API & Webhooks: {new Date(githubPrInfo.lastSyncedAt).toLocaleTimeString()}
              </Typography>
            </Paper>

            {/* Task Description */}
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 900, mb: 2, textTransform: 'uppercase' }}>
                Task Description
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3, color: 'rgba(255, 255, 255, 0.8)' }}>
                {contribution.description}
              </Typography>

              <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 800, mb: 1.5, textTransform: 'uppercase' }}>
                Requirements & Acceptance Criteria:
              </Typography>

              <List disablePadding>
                {contribution.requirements.map((req: string, idx: number) => (
                  <ListItem key={idx} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32, color: '#FFFFFF' }}>
                      <CheckCircleOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={req}
                      slotProps={{ primary: { variant: 'body2', color: 'rgba(255, 255, 255, 0.8)' } }}
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
              sx={{ p: 3, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 900, mb: 2, textTransform: 'uppercase' }}>
                Opportunity Overview
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
                    DIFFICULTY
                  </Typography>
                  <Chip
                    label={contribution.difficulty.toUpperCase()}
                    size="small"
                    sx={{ mt: 0.5, fontWeight: 800, backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #FFFFFF', borderRadius: 0 }}
                  />
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
                    PREDEFINED BOUNTY
                  </Typography>
                  <Typography variant="subtitle2" color="#FFFFFF" sx={{ fontWeight: 900, fontFamily: 'monospace' }}>
                    {contribution.rewardAmount}
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                {contribution.githubIssueUrl && (
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href={contribution.githubIssueUrl}
                    target="_blank"
                    sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', fontWeight: 800, borderRadius: 0 }}
                  >
                    VIEW GITHUB ISSUE ↗
                  </Button>
                )}
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Transaction Progress Dialog */}
        <Dialog open={txProgress.step !== 'idle' && txProgress.step !== 'confirmed' && txProgress.step !== 'failed'}>
          <DialogTitle sx={{ fontWeight: 900, textAlign: 'center', color: '#FFFFFF', textTransform: 'uppercase' }}>Executing Midnight Transaction</DialogTitle>
          <DialogContent sx={{ p: 4, textAlign: 'center', minWidth: 320, backgroundColor: '#000000' }}>
            <CircularProgress size={48} sx={{ color: '#FFFFFF', mb: 3 }} />
            <Typography variant="body1" color="#FFFFFF" sx={{ fontWeight: 700, mb: 1 }}>
              {txProgress.message || 'Processing...'}
            </Typography>

            {txProgress.txHash && (
              <Box sx={{ mt: 2, p: 1.5, backgroundColor: '#000000', border: '1px solid #FFFFFF', borderRadius: 0 }}>
                <Typography variant="caption" color="#FFFFFF" sx={{ fontFamily: 'monospace' }}>
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

