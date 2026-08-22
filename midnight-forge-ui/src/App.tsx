import React from 'react';
import { MainLayout, HeroSection, FeaturedProjects } from './components';

/**
 * Midnight Forge Root Application Shell — Phase 1 Foundation & Multi-Wallet Connection
 */
const App: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedProjects />
    </MainLayout>
  );
};

export default App;
