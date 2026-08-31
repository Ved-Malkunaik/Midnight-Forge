import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Alert,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PublishIcon from '@mui/icons-material/Publish';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Footer } from '../components';
import { useWallet } from '../hooks/useWallet';
import { useDeployedBoardContext } from '../hooks/useDeployedBoardContext';
import { useProjects } from '../contexts';
import type { Project } from '../types/marketplace';
import type { TxProgress } from '../services/contract/contractService';
import { shortenAddress } from '../utils/address';
import { getOneAmExplorerTxUrl, getMidnightExplorerTxUrl } from '../utils/explorer';

const categories = ['DApps', 'Core Protocol', 'Tooling & CLI', 'SDK & Libraries', 'Infrastructure'];

export const PublishProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, connect, account } = useWallet();
  const { addProject, refreshProjects } = useProjects();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [category, setCategory] = useState('DApps');
  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>(['TypeScript', 'React']);

  const [txProgress, setTxProgress] = useState<TxProgress>({ step: 'idle' });
  const [errorMsg, setErrorMsg] = useState('');
  const deployedBoard = useDeployedBoardContext();

  const handleAddTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setTechnologies(technologies.filter((t) => t !== techToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !shortDesc.trim() || !githubUrl.trim()) {
      setErrorMsg('Please fill in all required fields (Project Name, Short Description, and GitHub Repository).');
      return;
    }

    if (!githubUrl.includes('github.com')) {
      setErrorMsg('Please enter a valid GitHub repository URL (e.g. https://github.com/org/repo).');
      return;
    }

    if (deploymentUrl.trim()) {
      try {
        const deploymentUrlWithProtocol = /^https?:\/\//i.test(deploymentUrl.trim())
          ? deploymentUrl.trim()
          : `https://${deploymentUrl.trim()}`;
        const parsedDeploymentUrl = new URL(deploymentUrlWithProtocol);
        if (!['http:', 'https:'].includes(parsedDeploymentUrl.protocol)) {
          throw new Error('invalid protocol');
        }
        setDeploymentUrl(parsedDeploymentUrl.toString().replace(/\/$/, ''));
      } catch {
        setErrorMsg('Please enter a valid live app URL.');
        return;
      }
    }

    if (!isConnected) {
      try {
        await connect();
      } catch (err: unknown) {
        setErrorMsg(err instanceof Error ? err.message : '1AM Wallet connection failed.');
        return;
      }
    }

    setErrorMsg('');
    setTxProgress({ step: 'approving', message: 'Requesting 1AM wallet confirmation...' });
    try {
      const txHash = await deployedBoard.registerProject(
        {
          name,
          description: fullDesc || shortDesc,
          githubRepository: githubUrl,
          deploymentUrl,
          improvementAreas: technologies,
        },
        (progress) => setTxProgress(progress),
      );

      const publishedProject: Project = {
        projectId: `project-${Date.now()}`,
        owner: account?.address || 'Connected 1AM Wallet',
        publisherName: account?.address ? `Publisher (${shortenAddress(account.address)})` : 'Connected Publisher',
        name: name.trim(),
        shortDescription: shortDesc.trim(),
        fullDescription: fullDesc.trim() || shortDesc.trim(),
        githubRepository: githubUrl.trim(),
        deploymentUrl: deploymentUrl.trim() || undefined,
        category: category as Project['category'],
        technologies,
        improvementAreas: technologies,
        createdAt: new Date().toISOString(),
        status: 'ACTIVE',
        rewardPool: '0 tNIGHT',
        openTaskCount: 0,
        completedTaskCount: 0,
      };
      addProject(publishedProject);
      void refreshProjects();
      setTxProgress({ step: 'confirmed', txHash, message: 'Project registered successfully on-chain!' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed on Midnight Network.';
      setErrorMsg(`Transaction failed: ${msg}. The project was not published.`);
      setTxProgress({ step: 'failed', error: msg, message: msg });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000000' }}>
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Back Link */}
        <Button
          startIcon={<ArrowBackIcon fontSize="small" />}
          onClick={() => navigate('/explore')}
          sx={{ color: '#FFFFFF', mb: 4, borderRadius: 0, fontWeight: 700 }}
        >
          BACK TO EXPLORE
        </Button>

        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.6)' }}>
            PUBLISHER PORTAL
          </Typography>
          <Typography variant="h2" color="#FFFFFF" sx={{ mt: 0.5, fontWeight: 900, textTransform: 'uppercase' }}>
            Publish a New Project
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.75)' }}>
            Register your software repository on Midnight Network to create active contribution opportunities with NIGHT token bounties.
          </Typography>
        </Box>

        {/* Wallet Warning if Disconnected */}
        {!isConnected && (
          <Alert
            severity="warning"
            action={
              <Button color="inherit" size="small" onClick={() => void connect()} sx={{ borderRadius: 0, fontWeight: 800 }}>
                CONNECT 1AM WALLET
              </Button>
            }
            sx={{ mb: 4, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF', color: '#FFFFFF' }}
          >
            Connecting a 1AM wallet is required before finalizing project publication on Midnight Preprod.
          </Alert>
        )}

        {txProgress.step === 'confirmed' ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 0,
              backgroundColor: '#000000',
              border: '1px solid #FFFFFF',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 56, color: '#FFFFFF', mb: 2 }} />
            <Typography variant="h4" color="#FFFFFF" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase' }}>
              Project Published & Confirmed On-Chain!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, maxWidth: 540, mx: 'auto', color: 'rgba(255, 255, 255, 0.75)' }}>
              Your repository <strong>{name}</strong> is now registered on Midnight Forge Preprod.
            </Typography>

            {txProgress.txHash && (
              <Box sx={{ mb: 4, p: 3, backgroundColor: '#000000', borderRadius: 0, border: '1px solid #FFFFFF' }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>
                  MIDNIGHT TRANSACTION REFERENCE
                </Typography>
                <Typography variant="body2" color="#FFFFFF" sx={{ fontFamily: 'monospace', wordBreak: 'break-all', mb: 2, fontWeight: 700 }}>
                  {txProgress.txHash}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap', mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<OpenInNewIcon fontSize="small" />}
                    href={getOneAmExplorerTxUrl(txProgress.txHash)}
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
                    href={getMidnightExplorerTxUrl(txProgress.txHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0, fontWeight: 700 }}
                  >
                    MIDNIGHT EXPLORER (PREPROD) ↗
                  </Button>
                </Box>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="contained" onClick={() => navigate('/explore')} sx={{ borderRadius: 0, fontWeight: 800 }}>
                VIEW IN MARKETPLACE
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard/projects')}
                sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0, fontWeight: 700 }}
              >
                GO TO PUBLISHER HUB
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper
            component="form"
            noValidate
            onSubmit={(e) => void handleSubmit(e)}
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 0,
              backgroundColor: '#000000',
              border: '1px solid #FFFFFF',
            }}
          >
            {errorMsg && (
              <Alert severity="error" sx={{ mb: 4, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF', color: '#FFFFFF' }}>
                {errorMsg}
              </Alert>
            )}

            {/* Section 1: Project Information */}
            <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
              1. Project Information
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
              <TextField
                label="Project Name *"
                placeholder="e.g. GridShare Network Engine"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />

              <TextField
                label="Category *"
                select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Short Summary *"
                placeholder="One sentence explaining what your project does..."
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                required
                fullWidth
                multiline
                rows={2}
              />

              <TextField
                label="Full Project Description"
                placeholder="Describe your project architecture, goals, and technical background..."
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                fullWidth
                multiline
                rows={4}
              />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 4 }} />

            {/* Section 2: Repository Links */}
            <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
              2. Repository & Demo Links
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
              <TextField
                label="GitHub Repository URL *"
                placeholder="https://github.com/org/repository"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                required
                fullWidth
              />

              <TextField
                label="Live DApp / Website URL (Optional)"
                placeholder="https://my-dapp.com"
                value={deploymentUrl}
                onChange={(e) => setDeploymentUrl(e.target.value)}
                fullWidth
              />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 4 }} />

            {/* Section 3: Tech Stack Tags */}
            <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 900, mb: 3, textTransform: 'uppercase' }}>
              3. Technologies & Stack
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  label="Add Technology Tag"
                  placeholder="e.g. Rust, Compact, TypeScript"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  size="small"
                  sx={{ flexGrow: 1 }}
                />
                <Button variant="outlined" onClick={handleAddTech} sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0, fontWeight: 700 }}>
                  ADD TAG
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    onDelete={() => handleRemoveTech(tech)}
                    sx={{ backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #FFFFFF', borderRadius: 0 }}
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 4 }} />

            {/* Submit CTA */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/explore')}
                sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0 }}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<PublishIcon />}
                disabled={txProgress.step !== 'idle' && txProgress.step !== 'failed'}
                sx={{ px: 4, fontWeight: 800, borderRadius: 0 }}
              >
                {isConnected ? 'PUBLISH PROJECT' : 'CONNECT WALLET TO PUBLISH'}
              </Button>
            </Box>
          </Paper>
        )}

        {/* Transaction Progress Dialog */}
        <Dialog open={txProgress.step !== 'idle' && txProgress.step !== 'confirmed' && txProgress.step !== 'failed'}>
          <DialogTitle sx={{ fontWeight: 900, textAlign: 'center', color: '#FFFFFF', textTransform: 'uppercase' }}>Executing Midnight Transaction</DialogTitle>
          <DialogContent sx={{ p: 4, textAlign: 'center', minWidth: 320, backgroundColor: '#000000' }}>
            <CircularProgress size={48} sx={{ color: '#FFFFFF', mb: 3 }} />
            <Typography variant="body1" color="#FFFFFF" sx={{ fontWeight: 700, mb: 1 }}>
              {txProgress.message || 'Processing...'}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 800 }}>
              STEP: {txProgress.step.toUpperCase()}
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

