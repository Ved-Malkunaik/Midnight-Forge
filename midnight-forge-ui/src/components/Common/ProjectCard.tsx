import React from 'react';
import { Paper, Box, Typography, Chip, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../types/marketplace';
import { shortenAddress } from '../../utils/address';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
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
      {/* Top Bar: Category & Repository */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Chip
          label={project.category.toUpperCase()}
          size="small"
          sx={{
            height: 22,
            fontSize: '0.625rem',
            fontWeight: 800,
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '1px solid #FFFFFF',
            borderRadius: 0,
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <GitHubIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: 140,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {project.githubRepository.replace('https://github.com/', '')}
          </Typography>
        </Box>
      </Box>

      {/* Project Title */}
      <Typography variant="h6" color="#FFFFFF" sx={{ mb: 0.5, fontWeight: 900, lineHeight: 1.2, textTransform: 'uppercase' }}>
        {project.name}
      </Typography>

      {/* Owner Wallet Address */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
        <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>
          OWNER:
        </Typography>

        <Typography
          variant="caption"
          sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.75rem', color: '#FFFFFF' }}
        >
          {project.owner ? shortenAddress(project.owner) : '1AM WALLET'}
        </Typography>
      </Box>

      {/* Short Description */}
      <Typography variant="body2" sx={{ mb: 2.5, flexGrow: 1, lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.75)' }}>
        {project.shortDescription}
      </Typography>

      {/* Tech Tags */}
      <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', mb: 3 }}>
        {project.technologies.map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.625rem',
              fontWeight: 600,
              backgroundColor: '#000000',
              color: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 0,
            }}
          />
        ))}
      </Box>

      {/* Footer Info: Reward Pool & Action */}
      <Box
        sx={{
          pt: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
            REWARD BOUNTY
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#FFFFFF', fontFamily: 'monospace' }}>
            {project.rewardPool}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/projects/${project.projectId}`)}
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
          VIEW PROJECT
        </Button>
      </Box>
    </Paper>
  );
};

