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
  const commonSx = {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    fontWeight: 800,
    fontSize: '0.6875rem',
    borderRadius: 0,
    letterSpacing: '0.04em',
  };

  switch (status) {
    case 'OPEN':
      return (
        <Chip
          icon={<RadioButtonUncheckedIcon sx={{ fontSize: '13px !important', color: '#FFFFFF' }} />}
          label="OPEN"
          size={size}
          sx={commonSx}
        />
      );
    case 'CLAIMED':
      return (
        <Chip
          icon={<LockClockIcon sx={{ fontSize: '13px !important', color: '#FFFFFF' }} />}
          label="CLAIMED"
          size={size}
          sx={commonSx}
        />
      );
    case 'PR_SUBMITTED':
      return (
        <Chip
          icon={<RateReviewIcon sx={{ fontSize: '13px !important', color: '#FFFFFF' }} />}
          label="IN REVIEW"
          size={size}
          sx={commonSx}
        />
      );
    case 'MERGED':
      return (
        <Chip
          icon={<MergeTypeIcon sx={{ fontSize: '13px !important', color: '#FFFFFF' }} />}
          label="MERGED"
          size={size}
          sx={commonSx}
        />
      );
    case 'ACCEPTED':
      return (
        <Chip
          icon={<VerifiedIcon sx={{ fontSize: '13px !important', color: '#FFFFFF' }} />}
          label="ACCEPTED"
          size={size}
          sx={commonSx}
        />
      );
    case 'REWARDED':
      return (
        <Chip
          icon={<MonetizationOnIcon sx={{ fontSize: '13px !important', color: '#FFFFFF' }} />}
          label="REWARDED"
          size={size}
          sx={{
            ...commonSx,
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderColor: '#FFFFFF',
          }}
        />
      );
    default:
      return <Chip label={status} size={size} sx={commonSx} />;
  }
};

