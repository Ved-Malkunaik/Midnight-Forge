import React from 'react';
import { Paper, Box, Typography, Chip, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../types/marketplace';

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
      {/* Top Bar: Category & Repository */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Chip
          label={project.category}
          size="small"
          sx={{
            height: 22,
            fontSize: '0.675rem',
            fontWeight: 700,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: '#60A5FA',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <GitHubIcon sx={{ fontSize: 16, color: '#94A3B8' }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
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
      <Typography variant="h6" color="text.primary" sx={{ mb: 1, fontWeight: 700, lineHeight: 1.3 }}>
        {project.name}
      </Typography>

      {/* Short Description */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, flexGrow: 1, lineHeight: 1.6 }}>
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
              height: 22,
              fontSize: '0.675rem',
              fontWeight: 600,
              backgroundColor: '#1E2332',
              color: '#94A3B8',
            }}
          />
        ))}
      </Box>

      {/* Footer Info: Reward Pool & Action */}
      <Box
        sx={{
          pt: 2,
          borderTop: '1px solid #1E2332',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
        }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
            Rewards Pool
          </Typography>
          <Typography variant="subtitle2" color="#10B981" sx={{ fontWeight: 700 }}>
            {project.rewardPool}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/projects/${project.projectId}`)}
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
          View Project
        </Button>
      </Box>
    </Paper>
  );
};
