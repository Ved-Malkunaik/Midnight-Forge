import React from 'react';
import { Box, Container, Typography, Paper, Chip, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

interface PlaceholderProject {
  id: string;
  name: string;
  repo: string;
  description: string;
  openTasks: number;
  rewardPool: string;
  tags: string[];
}

const mockProjects: PlaceholderProject[] = [
  {
    id: '1',
    name: 'Midnight Core Node Engine',
    repo: 'midnight-ntwrk/node-engine',
    description: 'High-performance zero-knowledge state synchronization and block validation engine.',
    openTasks: 4,
    rewardPool: '12,500 tNIGHT',
    tags: ['Rust', 'ZK-Proofs', 'Ledger'],
  },
  {
    id: '2',
    name: 'Compact Compiler Toolchain',
    repo: 'midnight-ntwrk/compact-cli',
    description: 'Developer CLI and optimization tools for compiling Compact smart contracts.',
    openTasks: 7,
    rewardPool: '8,000 tNIGHT',
    tags: ['TypeScript', 'Compiler', 'CLI'],
  },
  {
    id: '3',
    name: 'Midnight Shielded Wallet SDK',
    repo: 'midnight-ntwrk/wallet-sdk',
    description: 'Browser & mobile client SDK for managing shielded balances and transaction proofs.',
    openTasks: 3,
    rewardPool: '15,000 tNIGHT',
    tags: ['TypeScript', 'Cryptography', 'SDK'],
  },
];

export const FeaturedProjects: React.FC = () => {
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

          <Button
            variant="text"
            endIcon={<ArrowOutwardIcon fontSize="small" />}
            sx={{ color: '#94A3B8', '&:hover': { color: '#F8FAFC' } }}
          >
            View All
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {mockProjects.map((project) => (
            <Paper
              key={project.id}
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
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <GitHubIcon sx={{ fontSize: 18, color: '#94A3B8' }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                  {project.repo}
                </Typography>
              </Box>

              <Typography variant="h6" color="text.primary" sx={{ mb: 1, fontWeight: 700 }}>
                {project.name}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1, lineHeight: 1.5 }}>
                {project.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', mb: 3 }}>
                {project.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
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
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Reward Pool
                  </Typography>
                  <Typography variant="subtitle2" color="#10B981" sx={{ fontWeight: 700 }}>
                    {project.rewardPool}
                  </Typography>
                </Box>

                <Chip
                  label={`${project.openTasks} open tasks`}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: '#60A5FA',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                  }}
                />
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
