import { supabase } from '../utils/supabase';
import type { Project, Contribution, Opportunity, RewardTransaction } from '../types/marketplace';

const LOCAL_STORAGE_PROJECTS_KEY = 'midnight_forge_projects_v2';
const LOCAL_STORAGE_OPPORTUNITIES_KEY = 'midnight_forge_opportunities_v2';
const LOCAL_STORAGE_CONTRIBUTIONS_KEY = 'midnight_forge_contributions_v2';
const LOCAL_STORAGE_REWARDS_KEY = 'midnight_forge_rewards_v2';

// Seed Projects to ensure baseline availability
const initialSeedProjects: Project[] = [
  {
    projectId: 'project-stellar-poll',
    owner: 'mn1a_publisher_preprod_74ab89e01',
    publisherName: 'Stellar Labs (mn1a...e01)',
    name: 'Stellar Poll DApp',
    shortDescription: 'Decentralized anonymous voting and polling platform leveraging Midnight ZK proofs for voter privacy.',
    fullDescription:
      'Stellar Poll provides zero-knowledge anonymous polling and governance voting built natively on Midnight Network. Poll responses are verified via ZK circuits without revealing voter identity.',
    githubRepository: 'https://github.com/midnight-ntwrk/stellar-poll-ochre',
    deploymentUrl: 'https://stellar-poll-ochre.vercel.app',
    category: 'DApps',
    technologies: ['TypeScript', 'Compact', 'React', 'Midnight SDK'],
    improvementAreas: ['ZK Circuit Optimization', 'Poll Result Sync', 'UI State Management'],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'ACTIVE',
    rewardPool: '15,000 tNIGHT',
    openTaskCount: 2,
    completedTaskCount: 1,
  },
  {
    projectId: 'project-shield-wallet',
    owner: 'mn1a_publisher_preprod_892788ab5e',
    publisherName: 'Shield Core (mn1a...b5e)',
    name: 'Shield Wallet CLI & SDK',
    shortDescription: 'Command-line tool and TypeScript SDK for managing Midnight ZK credentials and unshielded balances.',
    fullDescription:
      'Shield Wallet CLI provides developer tooling to generate zero-knowledge proofs, inspect network indexer states, and execute contract calls directly from the terminal.',
    githubRepository: 'https://github.com/midnight-ntwrk/shield-wallet-sdk',
    category: 'Tooling & CLI',
    technologies: ['Rust', 'TypeScript', 'Node.js', 'CLI'],
    improvementAreas: ['Key Management', 'Indexer Query Performance'],
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    status: 'ACTIVE',
    rewardPool: '25,000 tNIGHT',
    openTaskCount: 3,
    completedTaskCount: 0,
  },
  {
    projectId: 'project-forge-contracts',
    owner: 'mn1a_publisher_preprod_546febbb7a',
    publisherName: 'Midnight Forge Protocol',
    name: 'Midnight Forge Protocol Compact Contracts',
    shortDescription: 'Core Compact smart contracts powering the Midnight Forge contribution marketplace and reward distribution.',
    fullDescription:
      'Open source Compact smart contract repository for registering projects, claiming contributions, marking merged PRs, and authorizing NIGHT token bounty releases.',
    githubRepository: 'https://github.com/midnight-ntwrk/midnight-forge-contracts',
    category: 'Core Protocol',
    technologies: ['Compact', 'TypeScript', 'Midnight SDK'],
    improvementAreas: ['Circuit Multi-Sig Escrow', 'Automated Verification'],
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    status: 'ACTIVE',
    rewardPool: '50,000 tNIGHT',
    openTaskCount: 1,
    completedTaskCount: 2,
  },
];

const initialSeedContributions: Contribution[] = [
  {
    contributionId: 'contrib-1',
    projectId: 'project-stellar-poll',
    projectName: 'Stellar Poll DApp',
    title: 'Fix poll result synchronization circuit',
    description: 'Optimize the poll aggregator circuit to update tally results without exceeding execution limits on Midnight Preprod.',
    difficulty: 'Intermediate',
    rewardAmount: '5,000 tNIGHT',
    status: 'OPEN',
    requirements: [
      'Refactor Compact contract state update loop',
      'Add unit test coverage for multi-vote batches',
      'Verify proof generation latency under 3 seconds',
    ],
    githubIssueUrl: 'https://github.com/midnight-ntwrk/stellar-poll-ochre/issues/12',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    contributionId: 'contrib-2',
    projectId: 'project-stellar-poll',
    projectName: 'Stellar Poll DApp',
    title: 'Add 1AM wallet transaction status popup',
    description: 'Implement visual transaction toast and block explorer links when signing vote proofs.',
    difficulty: 'Beginner',
    rewardAmount: '2,500 tNIGHT',
    status: 'CLAIMED',
    claimedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    claimedByWallet: 'mn1a_contributor_preprod_89ef',
    requirements: [
      'Display 1AM transaction hash on submission',
      'Add copy-to-clipboard for Tx ID',
      'Handle wallet rejection gracefully',
    ],
    githubIssueUrl: 'https://github.com/midnight-ntwrk/stellar-poll-ochre/issues/14',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    contributionId: 'contrib-3',
    projectId: 'project-shield-wallet',
    projectName: 'Shield Wallet CLI & SDK',
    title: 'Implement indexer WebSocket auto-reconnect',
    description: 'Add exponential backoff strategy when indexer WebSocket disconnects during proof monitoring.',
    difficulty: 'Advanced',
    rewardAmount: '10,000 tNIGHT',
    status: 'PR_SUBMITTED',
    claimedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    claimedByWallet: 'mn1a_contributor_preprod_34cd',
    prUrl: 'https://github.com/midnight-ntwrk/shield-wallet-sdk/pull/19',
    prNumber: 19,
    requirements: [
      'Support configurable max reconnect attempts',
      'Emit status change events to listeners',
    ],
    githubIssueUrl: 'https://github.com/midnight-ntwrk/shield-wallet-sdk/issues/8',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

class DataService {
  // --- LOCAL STORAGE HELPERS ---
  private getLocal<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  private setLocal<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  // --- PROJECTS ---
  public async getProjects(): Promise<Project[]> {
    let remoteProjects: Project[] = [];
    try {
      const { data, error } = await supabase.from('projects').select('*');
      if (!error && data && data.length > 0) {
        remoteProjects = data.map((d) => ({
          projectId: d.project_id || d.id,
          owner: d.owner_wallet || d.owner,
          publisherName: d.publisher_name || `Publisher (${d.owner_wallet?.slice(0, 8)}...)`,
          name: d.name,
          shortDescription: d.short_description || d.description,
          fullDescription: d.full_description || d.description,
          githubRepository: d.github_repository,
          deploymentUrl: d.deployment_url,
          category: d.category || 'DApps',
          technologies: d.technologies || [],
          improvementAreas: d.improvement_areas || [],
          createdAt: d.created_at,
          status: d.status || 'ACTIVE',
          rewardPool: d.reward_pool || '0 tNIGHT',
          openTaskCount: d.open_task_count || 0,
          completedTaskCount: d.completed_task_count || 0,
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch projects notice:', err);
    }

    const localProjects = this.getLocal<Project[]>(LOCAL_STORAGE_PROJECTS_KEY, initialSeedProjects);

    // Merge remote, local, and seed projects by projectId
    const map = new Map<string, Project>();
    for (const p of [...initialSeedProjects, ...localProjects, ...remoteProjects]) {
      map.set(p.projectId, p);
    }

    const merged = Array.from(map.values());
    this.setLocal(LOCAL_STORAGE_PROJECTS_KEY, merged);
    return merged;
  }

  public async saveProject(project: Project): Promise<void> {
    const current = await this.getProjects();
    const existingIndex = current.findIndex((p) => p.projectId === project.projectId);
    let updated: Project[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = project;
    } else {
      updated = [project, ...current];
    }
    this.setLocal(LOCAL_STORAGE_PROJECTS_KEY, updated);

    try {
      await supabase.from('projects').upsert({
        project_id: project.projectId,
        owner_wallet: project.owner,
        publisher_name: project.publisherName,
        name: project.name,
        short_description: project.shortDescription,
        full_description: project.fullDescription,
        github_repository: project.githubRepository,
        deployment_url: project.deploymentUrl,
        category: project.category,
        technologies: project.technologies,
        improvement_areas: project.improvementAreas,
        status: project.status,
        reward_pool: project.rewardPool,
        open_task_count: project.openTaskCount,
        completed_task_count: project.completedTaskCount,
        created_at: project.createdAt,
      });
    } catch (e) {
      console.warn('Supabase project upsert notice:', e);
    }
  }

  // --- CONTRIBUTIONS / OPPORTUNITIES ---
  public async getContributions(): Promise<Contribution[]> {
    let remote: Contribution[] = [];
    try {
      const { data, error } = await supabase.from('contributions').select('*');
      if (!error && data && data.length > 0) {
        remote = data.map((d) => ({
          contributionId: d.contribution_id || d.id,
          projectId: d.project_id,
          projectName: d.project_name || 'Project',
          title: d.title,
          description: d.description,
          difficulty: d.difficulty || 'Intermediate',
          rewardAmount: d.reward_amount || '1,000 tNIGHT',
          status: d.status || 'OPEN',
          claimedAt: d.claimed_at,
          claimedByWallet: d.claimed_by_wallet,
          prUrl: d.pr_url,
          prNumber: d.pr_number,
          requirements: d.requirements || [],
          githubIssueUrl: d.github_issue_url,
          createdAt: d.created_at,
          updatedAt: d.updated_at,
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch contributions notice:', e);
    }

    const local = this.getLocal<Contribution[]>(LOCAL_STORAGE_CONTRIBUTIONS_KEY, initialSeedContributions);
    const map = new Map<string, Contribution>();
    for (const c of [...initialSeedContributions, ...local, ...remote]) {
      map.set(c.contributionId, c);
    }

    const merged = Array.from(map.values());
    this.setLocal(LOCAL_STORAGE_CONTRIBUTIONS_KEY, merged);
    return merged;
  }

  public async saveContribution(contrib: Contribution): Promise<void> {
    const current = await this.getContributions();
    const idx = current.findIndex((c) => c.contributionId === contrib.contributionId);
    let updated: Contribution[];
    if (idx >= 0) {
      updated = [...current];
      updated[idx] = contrib;
    } else {
      updated = [contrib, ...current];
    }
    this.setLocal(LOCAL_STORAGE_CONTRIBUTIONS_KEY, updated);

    try {
      await supabase.from('contributions').upsert({
        contribution_id: contrib.contributionId,
        project_id: contrib.projectId,
        project_name: contrib.projectName,
        title: contrib.title,
        description: contrib.description,
        difficulty: contrib.difficulty,
        reward_amount: contrib.rewardAmount,
        status: contrib.status,
        claimed_at: contrib.claimedAt,
        claimed_by_wallet: contrib.claimedByWallet,
        pr_url: contrib.prUrl,
        pr_number: contrib.prNumber,
        requirements: contrib.requirements,
        github_issue_url: contrib.githubIssueUrl,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Supabase contribution upsert notice:', e);
    }
  }

  // --- REWARD TRANSACTIONS ---
  public async getRewards(): Promise<RewardTransaction[]> {
    const local = this.getLocal<RewardTransaction[]>(LOCAL_STORAGE_REWARDS_KEY, []);
    return local;
  }

  public async saveReward(reward: RewardTransaction): Promise<void> {
    const current = await this.getRewards();
    const idx = current.findIndex((r) => r.rewardId === reward.rewardId || r.contributionId === reward.contributionId);
    let updated: RewardTransaction[];
    if (idx >= 0) {
      updated = [...current];
      updated[idx] = reward;
    } else {
      updated = [reward, ...current];
    }
    this.setLocal(LOCAL_STORAGE_REWARDS_KEY, updated);
  }
}

export const dataService = new DataService();
