import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, TextField, Button, Rating, Alert, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Footer } from '../components';
import { useWallet } from '../hooks/useWallet';
import { getGoogleFormUrl } from '../config';

export const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, account } = useWallet();

  const [rating, setRating] = useState<number | null>(5);
  const [walletAddr, setWalletAddr] = useState(account?.address || '');
  const [easyNotes, setEasyNotes] = useState('');
  const [confusingNotes, setConfusingNotes] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const googleFormUrl = getGoogleFormUrl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            COMMUNITY & FEEDBACK
          </Typography>
          <Typography variant="h2" color="text.primary" sx={{ mt: 0.5, fontWeight: 800 }}>
            Midnight Forge Feedback
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Help us refine the Midnight Forge contribution marketplace. Share your experience, report bugs, or request
            features.
          </Typography>
        </Box>

        {/* Privacy Notice */}
        <Alert
          severity="info"
          sx={{ mb: 4, borderRadius: '8px', backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#60A5FA' }}
        >
          <strong>Privacy Notice:</strong> Feedback responses are collected via Google Forms. Your wallet address is
          included only if you explicitly confirm it in the form below. No automated secret or private key transmission
          occurs.
        </Alert>

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
              Thank You for Your Feedback!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
              Your responses have been prepared. Click below to confirm submission on the official Midnight Forge Google
              Form.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<OpenInNewIcon />}
                href={googleFormUrl}
                target="_blank"
                sx={{ px: 4, py: 1.2, fontWeight: 700 }}
              >
                Open Google Form to Finalize
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{ borderColor: '#262D3D', color: '#F8FAFC' }}
              >
                Return Home
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
            {/* Overall Rating */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
                1. How was your overall experience using Midnight Forge?
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                size="large"
                sx={{ color: '#F59E0B' }}
              />
            </Box>

            <Divider sx={{ borderColor: '#1E2332', my: 4 }} />

            {/* Wallet Address */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
                2. Wallet Address (Optional)
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                Provide your Midnight wallet address if you would like to be credited for bug bounties.
              </Typography>
              <TextField
                placeholder="e.g. mn1a_address_preprod_..."
                value={walletAddr}
                onChange={(e) => setWalletAddr(e.target.value)}
                fullWidth
              />
            </Box>

            <Divider sx={{ borderColor: '#1E2332', my: 4 }} />

            {/* Questions */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
              <Box>
                <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
                  3. What was easy and smooth?
                </Typography>
                <TextField
                  placeholder="Tell us what worked well (e.g. 1AM wallet connection, project discovery)..."
                  value={easyNotes}
                  onChange={(e) => setEasyNotes(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
                  4. What was confusing or broken?
                </Typography>
                <TextField
                  placeholder="Describe any bugs, UI glitches, or unclear steps..."
                  value={confusingNotes}
                  onChange={(e) => setConfusingNotes(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
                  5. Suggestions & Feature Requests
                </Typography>
                <TextField
                  placeholder="What features or improvements would you like to see in future releases?"
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Box>
            </Box>

            <Divider sx={{ borderColor: '#1E2332', my: 4 }} />

            {/* Form Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{ borderColor: '#262D3D', color: '#94A3B8' }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SendIcon />}
                sx={{ px: 4, fontWeight: 700 }}
              >
                Submit Feedback
              </Button>
            </Box>
          </Paper>
        )}
      </Container>

      <Footer />
    </Box>
  );
};
