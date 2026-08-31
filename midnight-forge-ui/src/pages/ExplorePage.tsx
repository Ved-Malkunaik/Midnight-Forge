import React, { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ProjectCard, EmptyState, Footer } from '../components';
import { useProjects } from '../contexts';

const categories = ['All', 'DApps', 'Core Protocol', 'Tooling & CLI', 'SDK & Libraries', 'Infrastructure'];

export const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'tasks'>('newest');
  const { projects } = useProjects();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000000' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.6)' }}>
            DECENTRALIZED MARKETPLACE
          </Typography>
          <Typography variant="h2" color="#FFFFFF" sx={{ mt: 0.5, fontWeight: 900, textTransform: 'uppercase' }}>
            Explore Repositories & Opportunities
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, maxWidth: 680, color: 'rgba(255, 255, 255, 0.75)' }}>
            Browse Midnight ecosystem software projects, inspect contribution needs, and find active tasks with NIGHT bounties.
          </Typography>
        </Box>

        {/* Search & Controls Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            mb: 4,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Search Input */}
          <TextField
            placeholder="Search by project name, description, or tech stack (e.g. React, Compact, Rust)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              maxWidth: { md: 550 },
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#000000',
                borderRadius: 0,
                borderColor: '#FFFFFF',
                '&:hover fieldset': { borderColor: '#FFFFFF' },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#FFFFFF' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Sort Selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', md: 'auto' } }}>
            <FormControl size="small" sx={{ minWidth: 160, backgroundColor: '#000000', borderRadius: 0 }}>
              <InputLabel id="sort-label" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Sort By
              </InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'tasks')}
                sx={{ color: '#FFFFFF', borderRadius: 0, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' } }}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="tasks">Most Open Tasks</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Category Pills */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 5 }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Chip
                key={cat}
                label={cat.toUpperCase()}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  height: 32,
                  px: 1.5,
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  borderRadius: 0,
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#FFFFFF' : '#000000',
                  color: isSelected ? '#000000' : '#FFFFFF',
                  border: '1px solid #FFFFFF',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                  },
                }}
              />
            );
          })}
        </Box>

        {/* Results Counter */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <FilterListIcon sx={{ color: '#FFFFFF', fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            SHOWING <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'}
          </Typography>
        </Box>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </Box>
        ) : (
          <EmptyState
            title="NO PROJECTS FOUND"
            description="No repositories matched your search query or selected category. Try resetting search filters."
            actionLabel="RESET FILTERS"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          />
        )}
      </Container>

      <Footer />
    </Box>
  );
};

