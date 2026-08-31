import React from 'react';
import { Paper, Box, Typography, Chip, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import type { Contribution } from '../../types/marketplace';
import { StatusBadge } from './StatusBadge';

interface ContributionCardProps {
  contribution: Contribution;
}

export const ContributionCard: React.FC<ContributionCardProps> = ({ contribution }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        backgroundColor: '#000000',
        border: '1px solid #FFFFFF',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        '&:hover': {
          transform: 'scale(1.015)',
        },
      }}
    >
      {/* Top Header: Project Name & Status Badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.04em', color: '#FFFFFF' }}>
          {contribution.projectName.toUpperCase()}
        </Typography>
        <StatusBadge status={contribution.status} />
      </Box>

      {/* Title */}
      <Typography variant="subtitle1" color="#FFFFFF" sx={{ mb: 1, fontWeight: 900, lineHeight: 1.3, textTransform: 'uppercase' }}>
        {contribution.title}
      </Typography>

      {/* Description */}
      <Typography variant="body2" sx={{ mb: 2.5, flexGrow: 1, lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.75)' }}>
        {contribution.description}
      </Typography>

      {/* Metadata Row: Difficulty & Reward */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Chip
          label={contribution.difficulty.toUpperCase()}
          size="small"
          sx={{
            height: 20,
            fontSize: '0.625rem',
            fontWeight: 800,
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: 0,
          }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#FFFFFF', fontFamily: 'monospace' }}>
          BOUNTY: {contribution.rewardAmount}
        </Typography>
      </Box>

      {/* Action CTA */}
      <Box
        sx={{
          pt: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          justify: 'flex-end',
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/contributions/${contribution.contributionId}`)}
          endIcon={<ArrowForwardIcon fontSize="small" />}
          sx={{
            borderColor: '#FFFFFF',
            color: '#FFFFFF',
            px: 2,
            py: 0.6,
            fontSize: '0.75rem',
            fontWeight: 800,
            borderRadius: 0,
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: '#000000',
            },
          }}
        >
          VIEW OPPORTUNITY
        </Button>
      </Box>
    </Paper>
  );
};

