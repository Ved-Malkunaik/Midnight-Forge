import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Chip, Button, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import CodeIcon from '@mui/icons-material/Code';
import { useProjects } from '../contexts';
import { ContributionCard, Footer, EmptyState } from '../components';
import { dataService } from '../services/dataService';
import type { Contribution } from '../types/marketplace';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [allContributions, setAllContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    void dataService.getContributions().then(setAllContributions);
  }, []);

  const project = projects.find((p) => p.projectId === id);
  if (!project) {
    return (
      <EmptyState
        title="PROJECT NOT FOUND"
        description="This project is no longer available in the marketplace."
        actionLabel="BACK TO EXPLORE"
        onAction={() => navigate('/explore')}
      />
    );
  }
  const projectContributions = allContributions.filter((c) => c.projectId === project.projectId);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000000' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Back Link */}
        <Button
          startIcon={<ArrowBackIcon fontSize="small" />}
          onClick={() => navigate('/explore')}
          sx={{ color: '#FFFFFF', mb: 4, borderRadius: 0, fontWeight: 700 }}
        >
          BACK TO EXPLORE
        </Button>

        {/* Project Header Banner */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 0,
            backgroundColor: '#000000',
            border: '1px solid #FFFFFF',
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
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
                <Chip
                  label={project.status}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    borderRadius: 0,
                  }}
                />
              </Box>
              <Typography variant="h2" color="#FFFFFF" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase' }}>
                {project.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ maxWidth: 720, lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.75)' }}>
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
                sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', fontWeight: 800, borderRadius: 0 }}
              >
                GITHUB REPO ↗
              </Button>

              {project.deploymentUrl && (
                <Button
                  variant="outlined"
                  startIcon={<LaunchIcon />}
                  href={project.deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ borderColor: '#FFFFFF', color: '#FFFFFF', fontWeight: 800, borderRadius: 0 }}
                >
                  LIVE DAPP ↗
                </Button>
              )}

              <Button
                variant="contained"
                startIcon={<SettingsIcon />}
                onClick={() => navigate(`/projects/${project.projectId}/manage`)}
                sx={{ fontWeight: 800, borderRadius: 0 }}
              >
                MANAGE PROJECT
              </Button>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 3 }} />

          {/* Quick Stats Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
                REWARD BOUNTY POOL
              </Typography>
              <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 900, fontFamily: 'monospace' }}>
                {project.rewardPool}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
                OPEN TASKS
              </Typography>
              <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 900, fontFamily: 'monospace' }}>
                {project.openTaskCount}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
                COMPLETED TASKS
              </Typography>
              <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 900, fontFamily: 'monospace' }}>
                {project.completedTaskCount}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}>
                PUBLISHER WALLET
              </Typography>
              <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
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
              sx={{ p: 4, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Typography variant="h6" color="#FFFFFF" sx={{ fontWeight: 900, mb: 2, textTransform: 'uppercase' }}>
                About Project
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3, color: 'rgba(255, 255, 255, 0.8)' }}>
                {project.fullDescription}
              </Typography>

              <Typography variant="subtitle2" color="#FFFFFF" sx={{ fontWeight: 800, mb: 1.5, textTransform: 'uppercase' }}>
                Areas for Improvement & Help Needed:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.improvementAreas.map((area) => (
                  <Chip
                    key={area}
                    icon={<CodeIcon sx={{ fontSize: '14px !important', color: '#FFFFFF' }} />}
                    label={area}
                    size="small"
                    sx={{
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      border: '1px solid #FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      borderRadius: 0,
                    }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Contribution Opportunities */}
            <Box>
              <Typography variant="h5" color="#FFFFFF" sx={{ fontWeight: 900, mb: 2.5, textTransform: 'uppercase' }}>
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
                  title="NO OPEN CONTRIBUTION TASKS"
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
              sx={{ p: 3, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 900, mb: 2, textTransform: 'uppercase' }}>
                Technologies & Stack
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    sx={{
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      borderRadius: 0,
                    }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Publisher Metadata Card */}
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 0, backgroundColor: '#000000', border: '1px solid #FFFFFF' }}
            >
              <Typography variant="subtitle1" color="#FFFFFF" sx={{ fontWeight: 900, mb: 1.5, textTransform: 'uppercase' }}>
                Publisher Information
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
                Published by <strong>{project.publisherName || 'Project Owner'}</strong>
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontFamily: 'monospace', display: 'block', mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}
              >
                Address: {project.owner}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
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

