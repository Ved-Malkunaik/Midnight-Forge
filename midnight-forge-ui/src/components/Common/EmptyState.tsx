import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import FolderOffOutlinedIcon from '@mui/icons-material/FolderOffOutlined';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, actionLabel, onAction }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        textAlign: 'center',
        borderRadius: '12px',
        backgroundColor: '#131620',
        border: '1px border #1E2332',
        maxWidth: 540,
        mx: 'auto',
        my: 4,
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: '#1E2332',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          mx: 'auto',
          mb: 2,
          color: '#94A3B8',
        }}
      >
        <FolderOffOutlinedIcon sx={{ fontSize: 28 }} />
      </Box>

      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
        {description}
      </Typography>

      {actionLabel && onAction && (
        <Button variant="contained" color="primary" onClick={onAction} sx={{ px: 3, py: 1 }}>
          {actionLabel}
        </Button>
      )}
    </Paper>
  );
};
