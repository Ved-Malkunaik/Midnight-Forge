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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#10B981';
      case 'Intermediate':
        return '#3B82F6';
      case 'Advanced':
        return '#F59E0B';
      case 'Expert':
        return '#EF4444';
      default:
        return '#94A3B8';
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        backgroundColor: '#131620',
        border: '1px solid #1E2332',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: '#3B82F6',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      {/* Top Header: Project Name & Status Badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="caption" color="#60A5FA" sx={{ fontWeight: 700, letterSpacing: '0.04em' }}>
          {contribution.projectName}
        </Typography>
        <StatusBadge status={contribution.status} />
      </Box>

      {/* Title */}
      <Typography variant="subtitle1" color="text.primary" sx={{ mb: 1, fontWeight: 700, lineHeight: 1.3 }}>
        {contribution.title}
      </Typography>

      {/* Description */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, flexGrow: 1, lineHeight: 1.6 }}>
        {contribution.description}
      </Typography>

      {/* Metadata Row: Difficulty & Reward */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Chip
          label={contribution.difficulty}
          size="small"
          sx={{
            height: 22,
            fontSize: '0.675rem',
            fontWeight: 700,
            backgroundColor: `${getDifficultyColor(contribution.difficulty)}15`,
            color: getDifficultyColor(contribution.difficulty),
            border: `1px solid ${getDifficultyColor(contribution.difficulty)}30`,
          }}
        />
        <Typography variant="subtitle2" color="#10B981" sx={{ fontWeight: 700 }}>
          Reward: {contribution.rewardAmount}
        </Typography>
      </Box>

      {/* Action CTA */}
      <Box
        sx={{
          pt: 2,
          borderTop: '1px solid #1E2332',
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
            borderColor: '#262D3D',
            color: '#F8FAFC',
            px: 2,
            py: 0.6,
            fontSize: '0.8rem',
            fontWeight: 600,
            '&:hover': {
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
            },
          }}
        >
          View Opportunity
        </Button>
      </Box>
    </Paper>
  );
};
