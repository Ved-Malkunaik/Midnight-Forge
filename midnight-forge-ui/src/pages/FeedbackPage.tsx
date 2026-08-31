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
  const { account } = useWallet();

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
            COMMUNITY & FEEDBACK
          </Typography>
          <Typography variant="h2" color="#FFFFFF" sx={{ mt: 0.5, fontWeight: 900, textTransform: 'uppercase' }}>
            Midnight Forge Feedback
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.75)' }}>
            Help us refine the Midnight Forge contribution marketplace. Share your experience, report bugs, or request features.
          </Typography>
        </Box>

        {/* Privacy Notice */}
        <Alert
          severity="info"
          sx={{ mb: 4, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF', color: '#FFFFFF' }}
        >
          <strong>PRIVACY NOTICE:</strong> Feedback responses are collected via Google Forms. Your wallet address is
          included only if you explicitly confirm it in the form below. No automated secret or private key transmission
          occurs.
        </Alert>

        {submitted ? (
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
              Thank You for Your Feedback!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 500, mx: 'auto', color: 'rgba(255, 255, 255, 0.75)' }}>
              Your responses have been prepared. Click below to confirm submission on the official Midnight Forge Google Form.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<OpenInNewIcon />}
                href={googleFormUrl}
                target="_blank"
                sx={{ px: 4, py: 1.2, fontWeight: 800, borderRadius: 0 }}
              >
                OPEN GOOGLE FORM TO FINALIZE ↗
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0, fontWeight: 700 }}
              >
                RETURN HOME
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
              borderRadius: 0,
              backgroundColor: '#000000',
              border: '1px solid #FFFFFF',
            }}
          >
            {/* Overall Rating */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 800, mb: 1, textTransform: 'uppercase' }}>
                1. How was your overall experience using Midnight Forge?
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                size="large"
                sx={{ color: '#FFFFFF' }}
              />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 4 }} />

            {/* Wallet Address */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 800, mb: 1, textTransform: 'uppercase' }}>
                2. Wallet Address (Optional)
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mb: 1.5, color: 'rgba(255, 255, 255, 0.6)' }}>
                Provide your Midnight wallet address if you would like to be credited for bug bounties.
              </Typography>
              <TextField
                placeholder="e.g. mn1a_address_preprod_..."
                value={walletAddr}
                onChange={(e) => setWalletAddr(e.target.value)}
                fullWidth
              />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 4 }} />

            {/* Questions */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
              <Box>
                <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 800, mb: 1, textTransform: 'uppercase' }}>
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
                <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 800, mb: 1, textTransform: 'uppercase' }}>
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
                <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 800, mb: 1, textTransform: 'uppercase' }}>
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

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 4 }} />

            {/* Form Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', borderRadius: 0 }}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SendIcon />}
                sx={{ px: 4, fontWeight: 800, borderRadius: 0 }}
              >
                SUBMIT FEEDBACK
              </Button>
            </Box>
          </Paper>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

