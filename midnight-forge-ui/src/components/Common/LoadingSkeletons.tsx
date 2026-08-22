import React from 'react';
import { Box, Paper, Skeleton } from '@mui/material';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        borderRadius: '12px',
        backgroundColor: '#131620',
        border: '1px solid #1E2332',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Skeleton variant="rectangular" width={80} height={20} sx={{ borderRadius: '4px' }} />
        <Skeleton variant="text" width={100} height={16} />
      </Box>

      <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" height={18} />
      <Skeleton variant="text" width="90%" height={18} sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <Skeleton variant="rectangular" width={60} height={20} sx={{ borderRadius: '4px' }} />
        <Skeleton variant="rectangular" width={60} height={20} sx={{ borderRadius: '4px' }} />
      </Box>

      <Box sx={{ pt: 2, borderTop: '1px solid #1E2332', display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton variant="text" width={90} height={32} />
        <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: '6px' }} />
      </Box>
    </Paper>
  );
};

export const ContributionCardSkeleton: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '12px',
        backgroundColor: '#131620',
        border: '1px solid #1E2332',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Skeleton variant="text" width={120} height={16} />
        <Skeleton variant="rectangular" width={70} height={20} sx={{ borderRadius: '10px' }} />
      </Box>

      <Skeleton variant="text" width="75%" height={24} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" height={16} sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Skeleton variant="rectangular" width={80} height={20} sx={{ borderRadius: '4px' }} />
        <Skeleton variant="text" width={100} height={20} />
      </Box>

      <Box sx={{ pt: 2, borderTop: '1px solid #1E2332', display: 'flex', justifyContent: 'flex-end' }}>
        <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: '6px' }} />
      </Box>
    </Paper>
  );
};
