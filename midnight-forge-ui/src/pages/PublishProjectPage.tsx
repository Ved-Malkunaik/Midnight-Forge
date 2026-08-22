import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, TextField, Button, MenuItem, Alert, Chip, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PublishIcon from '@mui/icons-material/Publish';
import { Footer } from '../components';
import { useWallet } from '../hooks/useWallet';

const categories = ['DApps', 'Core Protocol', 'Tooling & CLI', 'SDK & Libraries', 'Infrastructure'];

export const PublishProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, connect } = useWallet();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [category, setCategory] = useState('DApps');
  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>(['TypeScript', 'React']);

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setTechnologies(technologies.filter((t) => t !== techToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !shortDesc.trim() || !githubUrl.trim()) {
      setErrorMsg('Please fill in all required fields (Project Name, Short Description, and GitHub Repository).');
      return;
    }

    if (!githubUrl.includes('github.com')) {
      setErrorMsg('Please enter a valid GitHub repository URL (e.g. https://github.com/org/repo).');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0B0C10' }}>
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Back Link */}
        <Button
          startIcon={<ArrowBackIcon fontSize="small" />}
          onClick={() => navigate('/explore')}
          sx={{ color: '#94A3B8', mb: 4, '&:hover': { color: '#F8FAFC' } }}
        >
          Back to Explore
        </Button>

        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="caption" color="#60A5FA" sx={{ fontWeight: 700, letterSpacing: '0.08em' }}>
            PUBLISHER PORTAL
          </Typography>
          <Typography variant="h2" color="text.primary" sx={{ mt: 0.5, fontWeight: 800 }}>
            Publish a New Project
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Register your open-source repository on Midnight Forge to find active contributors and manage reward pools.
          </Typography>
        </Box>

        {/* Wallet Warning if Disconnected */}
        {!isConnected && (
          <Alert
            severity="warning"
            action={
              <Button color="inherit" size="small" onClick={() => connect()}>
                Connect 1AM Wallet
              </Button>
            }
            sx={{ mb: 4, borderRadius: '8px' }}
          >
            You are browsing anonymously. Connecting a 1AM wallet is required before finalizing publication.
          </Alert>
        )}

        {submitted ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: '16px',
              backgroundColor: '#131620',
              border: '1px solid #10B981',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 56, color: '#10B981', mb: 2 }} />
            <Typography variant="h4" color="text.primary" sx={{ fontWeight: 800, mb: 1 }}>
              Project Published Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
              Your repository <strong>{name}</strong> is now registered on Midnight Forge. You can now add contribution
              opportunities.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="contained" onClick={() => navigate('/explore')}>
                View in Marketplace
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard/projects')}
                sx={{ borderColor: '#262D3D', color: '#F8FAFC' }}
              >
                Go to Publisher Dashboard
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: '16px',
              backgroundColor: '#131620',
              border: '1px solid #1E2332',
            }}
          >
            {errorMsg && (
              <Alert severity="error" sx={{ mb: 4, borderRadius: '8px' }}>
                {errorMsg}
              </Alert>
            )}

            {/* Section 1: Project Information */}
            <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 3 }}>
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

            <Divider sx={{ borderColor: '#1E2332', my: 4 }} />

            {/* Section 2: Repository Links */}
            <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 3 }}>
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

            <Divider sx={{ borderColor: '#1E2332', my: 4 }} />

            {/* Section 3: Tech Stack Tags */}
            <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 3 }}>
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
                <Button variant="outlined" onClick={handleAddTech} sx={{ borderColor: '#262D3D', color: '#F8FAFC' }}>
                  Add Tag
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    onDelete={() => handleRemoveTech(tech)}
                    sx={{ backgroundColor: '#1E2332', color: '#60A5FA' }}
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{ borderColor: '#1E2332', my: 4 }} />

            {/* Submit CTA */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/explore')}
                sx={{ borderColor: '#262D3D', color: '#94A3B8' }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<PublishIcon />}
                sx={{ px: 4, fontWeight: 700 }}
              >
                Publish Project
              </Button>
            </Box>
          </Paper>
        )}
      </Container>

      <Footer />
    </Box>
  );
};
