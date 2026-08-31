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
        borderRadius: 0,
        backgroundColor: '#000000',
        border: '1px solid #FFFFFF',
        maxWidth: 540,
        mx: 'auto',
        my: 4,
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          border: '1px solid #FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          mx: 'auto',
          mb: 2,
          color: '#FFFFFF',
        }}
      >
        <FolderOffOutlinedIcon sx={{ fontSize: 28 }} />
      </Box>

      <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 800, mb: 1, textTransform: 'uppercase' }}>
        {title}
      </Typography>

      <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.7)' }}>
        {description}
      </Typography>

      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction} sx={{ px: 3, py: 1, borderRadius: 0, fontWeight: 800 }}>
          {actionLabel}
        </Button>
      )}
    </Paper>
  );
};

