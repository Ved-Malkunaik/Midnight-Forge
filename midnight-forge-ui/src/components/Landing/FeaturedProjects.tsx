import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AddIcon from '@mui/icons-material/Add';
import { useProjects } from '../../contexts';
import { ProjectCard } from '../Common/ProjectCard';
import { EmptyState } from '../Common/EmptyState';

export const FeaturedProjects: React.FC = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const featured = projects.slice(0, 3);

  return (
    <Box id="explore" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
          <Box>
            <Typography variant="caption" color="#60A5FA" sx={{ fontWeight: 700, letterSpacing: '0.08em' }}>
              FEATURED MARKETPLACE OPPORTUNITIES
            </Typography>
            <Typography variant="h2" color="text.primary" sx={{ mt: 0.5, fontWeight: 800 }}>
              Featured Repositories
            </Typography>
          </Box>

          {projects.length > 0 && (
            <Button
              variant="text"
              onClick={() => navigate('/explore')}
              endIcon={<ArrowOutwardIcon fontSize="small" />}
              sx={{ color: '#94A3B8', '&:hover': { color: '#F8FAFC' } }}
            >
              View All
            </Button>
          )}
        </Box>

        {featured.length > 0 ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {featured.map((project) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </Box>
        ) : (
          <EmptyState
            title="No Published Repositories Yet"
            description="Be the first developer to publish an open-source project on Midnight Network using 1AM Wallet."
            actionLabel="Publish a Project"
            onAction={() => navigate('/publish')}
          />
        )}
      </Container>
    </Box>
  );
};
