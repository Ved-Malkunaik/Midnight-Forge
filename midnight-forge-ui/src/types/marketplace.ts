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
  creator?: string;
  title: string;
  description: string;
  requirements: string[];
  difficulty: DifficultyLevel;
  rewardAmount: string;
  status: ContributionStatus;
  claimedBy?: string;
  claimedByWallet?: string;
  claimedAt?: string;
  githubIssueUrl?: string;
  githubPrUrl?: string;
  prUrl?: string;
  prNumber?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  opportunityId: string;
  projectId: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  bountyAmount: string;
  status: 'ACTIVE' | 'CLOSED';
  createdAt: string;
}

export interface RewardTransaction {
  rewardId: string;
  contributionId: string;
  publisherWallet: string;
  contributorWallet: string;
  amount: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  txHash: string;
  confirmedAt: string;
}

export interface ProjectFilters {
  searchQuery: string;
  category: string;
  difficulty: string;
  status: string;
  sortBy: 'newest' | 'reward' | 'tasks';
}

