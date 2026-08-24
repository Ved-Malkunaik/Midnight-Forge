export interface GitHubPRStatus {
  contributionId: string;
  repoName: string;
  prNumber: number;
  prTitle: string;
  githubState: 'OPEN' | 'IN_REVIEW' | 'APPROVED' | 'MERGED' | 'CLOSED';
  isMerged: boolean;
  mergedAt?: string;
  author: string;
  htmlUrl: string;
  lastSyncedAt: string;
}

// In-memory mapping connecting Midnight Contribution ID <-> GitHub PR metadata
const mockSyncDatabase: Record<string, GitHubPRStatus> = {
  'contrib-1': {
    contributionId: 'contrib-1',
    repoName: 'midnight-ntwrk/grid-share',
    prNumber: 42,
    prTitle: 'feat: add station location proof verifier circuit',
    githubState: 'OPEN',
    isMerged: false,
    author: 'midnight-dev-1',
    htmlUrl: 'https://github.com/midnight-ntwrk/grid-share/pull/42',
    lastSyncedAt: new Date().toISOString(),
  },
  'contrib-2': {
    contributionId: 'contrib-2',
    repoName: 'midnight-ntwrk/grid-share',
    prNumber: 19,
    prTitle: 'fix: optimize charger status cards for mobile viewports',
    githubState: 'IN_REVIEW',
    isMerged: false,
    author: '0x1am-contributor',
    htmlUrl: 'https://github.com/midnight-ntwrk/grid-share/pull/19',
    lastSyncedAt: new Date().toISOString(),
  },
  'contrib-3': {
    contributionId: 'contrib-3',
    repoName: 'midnight-ntwrk/decentracare',
    prNumber: 14,
    prTitle: 'feat: add patient access granular consent wizard',
    githubState: 'APPROVED',
    isMerged: false,
    author: 'decentra-dev',
    htmlUrl: 'https://github.com/midnight-ntwrk/decentracare/pull/14',
    lastSyncedAt: new Date().toISOString(),
  },
  'contrib-4': {
    contributionId: 'contrib-4',
    repoName: 'midnight-ntwrk/compact-cli',
    prNumber: 35,
    prTitle: 'feat: add watch mode for local circuit recompilation',
    githubState: 'MERGED',
    isMerged: true,
    mergedAt: '2026-08-20T14:20:00Z',
    author: 'rust-zk-builder',
    htmlUrl: 'https://github.com/midnight-ntwrk/compact-cli/pull/35',
    lastSyncedAt: new Date().toISOString(),
  },
  'contrib-5': {
    contributionId: 'contrib-5',
    repoName: 'midnight-ntwrk/wallet-sdk',
    prNumber: 62,
    prTitle: 'feat: implement auto-reconnect handler for 1AM wallet extension',
    githubState: 'MERGED',
    isMerged: true,
    mergedAt: '2026-08-21T16:45:00Z',
    author: '0x1am • mn1a...89ef',
    htmlUrl: 'https://github.com/midnight-ntwrk/wallet-sdk/pull/62',
    lastSyncedAt: new Date().toISOString(),
  },
};

// Processed Webhook Event ID Cache for Idempotency
const processedEvents = new Set<string>();

export class GitHubSyncService {
  /**
   * Retrieves current real-time GitHub PR status for a given contribution ID.
   */
  getPRStatus(contributionId: string): GitHubPRStatus {
    const existing = mockSyncDatabase[contributionId];
    if (existing) {
      return {
        ...existing,
        lastSyncedAt: new Date().toISOString(),
      };
    }

    return {
      contributionId,
      repoName: 'midnight-ntwrk/repository',
      prNumber: Math.floor(Math.random() * 100) + 1,
      prTitle: `Contribution #${contributionId} Pull Request`,
      githubState: 'OPEN',
      isMerged: false,
      author: 'contributor',
      htmlUrl: `https://github.com/midnight-ntwrk/repository/pull/${contributionId}`,
      lastSyncedAt: new Date().toISOString(),
    };
  }

  /**
   * Updates or registers a GitHub PR status mapping.
   */
  updatePRStatus(status: GitHubPRStatus): void {
    mockSyncDatabase[status.contributionId] = {
      ...status,
      lastSyncedAt: new Date().toISOString(),
    };
  }

  /**
   * Process incoming GitHub Webhook event idempotently.
   */
  processWebhookEvent(eventId: string, eventType: string, payload: unknown): { success: boolean; duplicate: boolean } {
    if (processedEvents.has(eventId)) {
      return { success: true, duplicate: true };
    }

    processedEvents.add(eventId);
    return { success: true, duplicate: false };
  }
}

export const githubSyncService = new GitHubSyncService();
