export type ContributionStatus = 'OPEN' | 'CLAIMED' | 'PR_SUBMITTED' | 'MERGED' | 'ACCEPTED' | 'REWARDED';

export type ProjectStatus = 'ACTIVE' | 'PAUSED' | 'ARCHIVED';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Project {
  projectId: string;
  owner: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  githubRepository: string;
  deploymentUrl?: string;
  category: 'Core Protocol' | 'Tooling & CLI' | 'SDK & Libraries' | 'Infrastructure' | 'DApps';
  technologies: string[];
  improvementAreas: string[];
  createdAt: string;
  status: ProjectStatus;
  rewardPool: string;
  openTaskCount: number;
  completedTaskCount: number;
  publisherName?: string;
  publisherAvatar?: string;
}

export interface Contribution {
  contributionId: string;
  projectId: string;
  projectName: string;
  creator: string;
  title: string;
  description: string;
  requirements: string[];
  difficulty: DifficultyLevel;
  rewardAmount: string;
  status: ContributionStatus;
  claimedBy?: string;
  claimedAt?: string;
  githubIssueUrl?: string;
  githubPrUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFilters {
  searchQuery: string;
  category: string;
  difficulty: string;
  status: string;
  sortBy: 'newest' | 'reward' | 'tasks';
}
