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
import { mockProjects } from '../data/mockProjects';

const categories = ['All', 'DApps', 'Core Protocol', 'Tooling & CLI', 'SDK & Libraries', 'Infrastructure'];

export const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'tasks'>('newest');

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0B0C10' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, flexGrow: 1 }}>
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="caption" color="#60A5FA" sx={{ fontWeight: 700, letterSpacing: '0.08em' }}>
            DECENTRALIZED MARKETPLACE
          </Typography>
          <Typography variant="h2" color="text.primary" sx={{ mt: 0.5, fontWeight: 800 }}>
            Explore Repositories & Opportunities
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 650 }}>
            Browse Midnight ecosystem software projects, inspect contribution needs, and find active tasks.
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
            justify: 'space-between',
          }}
        >
          {/* Search Input */}
          <TextField
            placeholder="Search by project name, description, or tech stack (e.g. React, Rust)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              maxWidth: { md: 550 },
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#131620',
                borderRadius: '8px',
                borderColor: '#1E2332',
                '&:hover fieldset': { borderColor: '#3B82F6' },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#94A3B8' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Sort Selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', md: 'auto' } }}>
            <FormControl size="small" sx={{ minWidth: 160, backgroundColor: '#131620', borderRadius: '8px' }}>
              <InputLabel id="sort-label" sx={{ color: '#94A3B8' }}>
                Sort By
              </InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                sx={{ color: '#F8FAFC' }}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="tasks">Most Open Tasks</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Category Pills */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 5 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat)}
              sx={{
                height: 32,
                px: 1,
                fontSize: '0.8rem',
                fontWeight: 600,
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: selectedCategory === cat ? '#3B82F6' : '#131620',
                color: selectedCategory === cat ? '#FFFFFF' : '#94A3B8',
                border: '1px solid',
                borderColor: selectedCategory === cat ? '#3B82F6' : '#1E2332',
                '&:hover': {
                  backgroundColor: selectedCategory === cat ? '#2563EB' : '#1E2332',
                },
              }}
            />
          ))}
        </Box>

        {/* Results Counter */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <FilterListIcon sx={{ color: '#94A3B8', fontSize: 18 }} />
          <Typography variant="body2" color="text.secondary">
            Showing <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'project' : 'projects'}
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
            title="No Projects Found"
            description="No repositories matched your search query or selected category. Try resetting search filters."
            actionLabel="Reset Filters"
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
