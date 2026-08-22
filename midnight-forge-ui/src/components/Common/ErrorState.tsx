import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Load Data',
  message = 'An unexpected error occurred while fetching information. Please try again.',
  onRetry,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        textAlign: 'center',
        borderRadius: '12px',
        backgroundColor: 'rgba(239, 68, 68, 0.04)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        maxWidth: 500,
        mx: 'auto',
        my: 4,
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          mx: 'auto',
          mb: 2,
          color: '#EF4444',
        }}
      >
        <ErrorOutlinedIcon sx={{ fontSize: 26 }} />
      </Box>

      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {message}
      </Typography>

      {onRetry && (
        <Button variant="outlined" color="error" onClick={onRetry} sx={{ px: 3, py: 0.8 }}>
          Retry Request
        </Button>
      )}
    </Paper>
  );
};
