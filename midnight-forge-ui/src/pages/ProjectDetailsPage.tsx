import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Chip, Button, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import CodeIcon from '@mui/icons-material/Code';
import { mockProjects } from '../data/mockProjects';
import { mockContributions } from '../data/mockContributions';
import { ContributionCard, Footer, EmptyState } from '../components';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = mockProjects.find((p) => p.projectId === id) || mockProjects[0];
  const projectContributions = mockContributions.filter((c) => c.projectId === project.projectId);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0B0C10' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Back Link */}
        <Button
          startIcon={<ArrowBackIcon fontSize="small" />}
          onClick={() => navigate('/explore')}
          sx={{ color: '#94A3B8', mb: 4, '&:hover': { color: '#F8FAFC' } }}
        >
          Back to Explore
        </Button>

        {/* Project Header Banner */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '16px',
            backgroundColor: '#131620',
            border: '1px solid #1E2332',
            mb: 5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 2,
              mb: 2,
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Chip
                  label={project.category}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.675rem',
                    fontWeight: 700,
                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    color: '#60A5FA',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                  }}
                />
                <Chip
                  label={project.status}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.675rem',
                    fontWeight: 700,
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#10B981',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                  }}
                />
              </Box>
              <Typography variant="h2" color="text.primary" sx={{ fontWeight: 800, mb: 1 }}>
                {project.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, lineHeight: 1.6 }}>
                {project.shortDescription}
              </Typography>
            </Box>

            {/* Header Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                href={project.githubRepository}
                target="_blank"
                sx={{ borderColor: '#262D3D', color: '#F8FAFC', fontWeight: 600 }}
              >
                GitHub Repo
              </Button>

              {project.deploymentUrl && (
                <Button
                  variant="outlined"
                  startIcon={<LaunchIcon />}
                  href={project.deploymentUrl}
                  target="_blank"
                  sx={{ borderColor: '#262D3D', color: '#60A5FA', fontWeight: 600 }}
                >
                  Live DApp
                </Button>
              )}

              <Button
                variant="contained"
                startIcon={<SettingsIcon />}
                onClick={() => navigate(`/projects/${project.projectId}/manage`)}
                sx={{ fontWeight: 600 }}
              >
                Manage Project
              </Button>
            </Box>
          </Box>

          <Divider sx={{ borderColor: '#1E2332', my: 3 }} />

          {/* Quick Stats Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Reward Pool
              </Typography>
              <Typography variant="subtitle1" color="#10B981" sx={{ fontWeight: 700 }}>
                {project.rewardPool}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Open Tasks
              </Typography>
              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700 }}>
                {project.openTaskCount}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Completed Tasks
              </Typography>
              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700 }}>
                {project.completedTaskCount}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Publisher
              </Typography>
              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                {project.publisherName || project.owner}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Main Content Layout */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
          {/* Left Column: About & Open Opportunities */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* About Project */}
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #1E2332' }}
            >
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700, mb: 2 }}>
                About Project
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                {project.fullDescription}
              </Typography>

              <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
                Areas for Improvement & Help Needed:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.improvementAreas.map((area) => (
                  <Chip
                    key={area}
                    icon={<CodeIcon sx={{ fontSize: '14px !important', color: '#60A5FA' }} />}
                    label={area}
                    size="small"
                    sx={{
                      backgroundColor: '#1E2332',
                      color: '#F8FAFC',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Contribution Opportunities */}
            <Box>
              <Typography variant="h5" color="text.primary" sx={{ fontWeight: 800, mb: 2.5 }}>
                Contribution Opportunities ({projectContributions.length})
              </Typography>

              {projectContributions.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {projectContributions.map((contrib) => (
                    <ContributionCard key={contrib.contributionId} contribution={contrib} />
                  ))}
                </Box>
              ) : (
                <EmptyState
                  title="No Open Contribution Tasks"
                  description="The project owner has not added any open tasks for this repository yet."
                />
              )}
            </Box>
          </Box>

          {/* Right Sidebar: Tech Stack & Publisher Info */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Technologies Card */}
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #1E2332' }}
            >
              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700, mb: 2 }}>
                Technologies & Stack
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    sx={{
                      backgroundColor: '#1E2332',
                      color: '#94A3B8',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Publisher Metadata Card */}
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: '12px', backgroundColor: '#131620', border: '1px solid #1E2332' }}
            >
              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 700, mb: 1.5 }}>
                Publisher Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Published by <strong>{project.publisherName || 'Project Owner'}</strong>
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontFamily: 'monospace', display: 'block', mb: 2 }}
              >
                Address: {project.owner}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Registered on {project.createdAt}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};
