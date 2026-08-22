import React from 'react';
import { Chip } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LockClockIcon from '@mui/icons-material/LockClock';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import VerifiedIcon from '@mui/icons-material/Verified';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import type { ContributionStatus } from '../../types/marketplace';

interface StatusBadgeProps {
  status: ContributionStatus;
  size?: 'small' | 'medium';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'small' }) => {
  switch (status) {
    case 'OPEN':
      return (
        <Chip
          icon={<RadioButtonUncheckedIcon sx={{ fontSize: '14px !important', color: '#60A5FA' }} />}
          label="OPEN"
          size={size}
          sx={{
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: '#60A5FA',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            fontWeight: 700,
            fontSize: '0.675rem',
          }}
        />
      );
    case 'CLAIMED':
      return (
        <Chip
          icon={<LockClockIcon sx={{ fontSize: '14px !important', color: '#F59E0B' }} />}
          label="CLAIMED"
          size={size}
          sx={{
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: '#F59E0B',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            fontWeight: 700,
            fontSize: '0.675rem',
          }}
        />
      );
    case 'PR_SUBMITTED':
      return (
        <Chip
          icon={<RateReviewIcon sx={{ fontSize: '14px !important', color: '#A855F7' }} />}
          label="IN REVIEW"
          size={size}
          sx={{
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            color: '#C084FC',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            fontWeight: 700,
            fontSize: '0.675rem',
          }}
        />
      );
    case 'MERGED':
      return (
        <Chip
          icon={<MergeTypeIcon sx={{ fontSize: '14px !important', color: '#38BDF8' }} />}
          label="MERGED"
          size={size}
          sx={{
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            color: '#38BDF8',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            fontWeight: 700,
            fontSize: '0.675rem',
          }}
        />
      );
    case 'ACCEPTED':
      return (
        <Chip
          icon={<VerifiedIcon sx={{ fontSize: '14px !important', color: '#10B981' }} />}
          label="ACCEPTED"
          size={size}
          sx={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: '#10B981',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontWeight: 700,
            fontSize: '0.675rem',
          }}
        />
      );
    case 'REWARDED':
      return (
        <Chip
          icon={<MonetizationOnIcon sx={{ fontSize: '14px !important', color: '#10B981' }} />}
          label="REWARDED"
          size={size}
          sx={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#34D399',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            fontWeight: 800,
            fontSize: '0.675rem',
          }}
        />
      );
    default:
      return <Chip label={status} size={size} />;
  }
};
