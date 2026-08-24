import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components';
import {
  LandingPage,
  ExplorePage,
  ProjectDetailsPage,
  ContributionDetailsPage,
  PublishProjectPage,
  ContributorDashboardPage,
  PublisherDashboardPage,
  ProjectManagementPage,
  FeedbackPage,
} from './pages';

/**
 * Midnight Forge Application Shell & Route Configuration
 */
const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/projects/:id/manage" element={<ProjectManagementPage />} />
        <Route path="/contributions/:id" element={<ContributionDetailsPage />} />
        <Route path="/publish" element={<PublishProjectPage />} />
        <Route path="/dashboard/contributor" element={<ContributorDashboardPage />} />
        <Route path="/dashboard/projects" element={<PublisherDashboardPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
