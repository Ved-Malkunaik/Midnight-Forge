import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useProjects } from '../../contexts';
import { ProjectCard } from '../Common/ProjectCard';
import { EmptyState } from '../Common/EmptyState';

export const FeaturedProjects: React.FC = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const featured = projects.slice(0, 3);

  return (
    <Box id="explore" sx={{ py: { xs: 8, md: 10 }, backgroundColor: '#000000' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.6)' }}>
              FEATURED MARKETPLACE REPOSITORIES
            </Typography>
            <Typography variant="h2" color="#FFFFFF" sx={{ mt: 0.5, fontWeight: 900, textTransform: 'uppercase' }}>
              Featured Repositories
            </Typography>
          </Box>

          {projects.length > 0 && (
            <Button
              variant="outlined"
              onClick={() => navigate('/explore')}
              endIcon={<ArrowOutwardIcon fontSize="small" />}
              sx={{ color: '#FFFFFF', borderColor: '#FFFFFF', borderRadius: 0, fontWeight: 700 }}
            >
              VIEW ALL
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
            actionLabel="PUBLISH A PROJECT"
            onAction={() => navigate('/publish')}
          />
        )}
      </Container>
    </Box>
  );
};

