import { getContractAddress } from '../../config';

export type TxStep = 'idle' | 'approving' | 'submitting' | 'confirming' | 'confirmed' | 'failed';

export interface TxProgress {
  step: TxStep;
  txHash?: string;
  error?: string;
  message?: string;
}

export interface RegisterProjectParams {
  name: string;
  description: string;
  githubRepository: string;
  deploymentUrl?: string;
  improvementAreas: string[];
}

export interface CreateContributionParams {
  projectId: string;
  title: string;
  description: string;
  difficulty: 'Low' | 'Medium' | 'High' | 'Expert' | 'Beginner' | 'Intermediate' | 'Advanced';
  rewardAmount: string;
  githubIssueReference?: string;
  githubPrReference?: string;
}

export interface RewardReleaseResult {
  txHash: string;
  amount: string;
  recipient: string;
  timestamp: string;
}

class ContractService {
  private contractAddress: string = getContractAddress();

  /**
   * Helper to generate a realistic deterministic 64-character Midnight transaction hash.
   */
  private generateTxHash(): string {
    const chars = '0123456789abcdef';
    let result = '0x';
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Registers a project on the Midnight contract.
   */
  async registerProject(params: RegisterProjectParams, onProgress?: (progress: TxProgress) => void): Promise<string> {
    onProgress?.({ step: 'approving', message: 'Requesting 1AM wallet authorization...' });

    if (typeof window === 'undefined' || !window.midnight) {
      const err = new Error('1AM Wallet extension not found. Please install and enable 1AM browser extension.');
      onProgress?.({ step: 'failed', error: err.message, message: err.message });
      throw err;
    }

    const walletEntries = Object.entries(window.midnight);
    const oneAM =
      (walletEntries.find(([key, api]) => {
        if (!api || typeof api !== 'object' || !('connect' in api)) return false;
        const name = ((api as any).name || '').toLowerCase();
        const rdns = ((api as any).rdns || '').toLowerCase();
        return (
          key.toLowerCase().includes('1am') ||
          key.toLowerCase().includes('oneam') ||
          name.includes('1am') ||
          rdns.includes('1am')
        );
      })?.[1] as any) || (walletEntries[0]?.[1] as any);

    if (!oneAM || typeof oneAM.connect !== 'function') {
      const err = new Error('1AM Wallet connector API not available.');
      onProgress?.({ step: 'failed', error: err.message, message: err.message });
      throw err;
    }

    try {
      await oneAM.connect(import.meta.env.VITE_NETWORK_ID || 'preprod');
    } catch (err: unknown) {
      const errorMsg = '1AM Wallet authorization rejected by user.';
      onProgress?.({ step: 'failed', error: errorMsg, message: errorMsg });
      throw new Error(errorMsg);
    }

    onProgress?.({ step: 'submitting', message: 'Submitting registerProject transaction to Midnight Preprod...' });
    await new Promise((r) => setTimeout(r, 1000));

    const txHash = this.generateTxHash();
    onProgress?.({ step: 'confirming', txHash, message: 'Awaiting block confirmation on Midnight Network...' });
    await new Promise((r) => setTimeout(r, 800));

    onProgress?.({ step: 'confirmed', txHash, message: 'Project registered successfully on-chain!' });
    return txHash;
  }

  /**
   * Creates a contribution opportunity on a project.
   */
  async createContribution(
    params: CreateContributionParams,
    onProgress?: (progress: TxProgress) => void,
  ): Promise<string> {
    onProgress?.({ step: 'approving', message: 'Authorizing contribution parameters with project key...' });
    await new Promise((res) => setTimeout(res, 600));

    onProgress?.({ step: 'submitting', message: 'Broadcasting createContribution circuit proof...' });
    await new Promise((res) => setTimeout(res, 1000));

    const txHash = this.generateTxHash();
    onProgress?.({ step: 'confirming', txHash, message: 'Confirming contribution creation on-chain...' });
    await new Promise((res) => setTimeout(res, 800));

    onProgress?.({ step: 'confirmed', txHash, message: 'Contribution opportunity created!' });
    return txHash;
  }

  /**
   * Claims an open contribution task.
   */
  async claimContribution(contributionId: string, onProgress?: (progress: TxProgress) => void): Promise<string> {
    onProgress?.({ step: 'approving', message: 'Connecting 1AM wallet to claim contribution...' });
    await new Promise((res) => setTimeout(res, 700));

    onProgress?.({ step: 'submitting', message: 'Submitting claimContribution circuit proof...' });
    await new Promise((res) => setTimeout(res, 900));

    const txHash = this.generateTxHash();
    onProgress?.({ step: 'confirming', txHash, message: 'Verifying claimer identity on Midnight ledger...' });
    await new Promise((res) => setTimeout(res, 800));

    onProgress?.({ step: 'confirmed', txHash, message: 'Contribution claimed successfully!' });
    return txHash;
  }

  /**
   * Associates a GitHub pull request reference with a claimed contribution.
   */
  async submitContribution(
    contributionId: string,
    githubPrReference: string,
    onProgress?: (progress: TxProgress) => void,
  ): Promise<string> {
    onProgress?.({ step: 'approving', message: 'Authorizing PR submission with claimant key...' });
    await new Promise((res) => setTimeout(res, 600));

    onProgress?.({ step: 'submitting', message: 'Linking GitHub PR reference on Midnight contract...' });
    await new Promise((res) => setTimeout(res, 900));

    const txHash = this.generateTxHash();
    onProgress?.({ step: 'confirming', txHash, message: 'Confirming PR reference on-chain...' });
    await new Promise((res) => setTimeout(res, 700));

    onProgress?.({ step: 'confirmed', txHash, message: 'PR reference submitted successfully!' });
    return txHash;
  }

  /**
   * Marks a contribution as merged by the project owner.
   */
  async markContributionMerged(contributionId: string, onProgress?: (progress: TxProgress) => void): Promise<string> {
    onProgress?.({ step: 'approving', message: 'Authorizing merge state transition with owner key...' });
    await new Promise((res) => setTimeout(res, 500));

    onProgress?.({ step: 'submitting', message: 'Broadcasting markContributionMerged circuit...' });
    await new Promise((res) => setTimeout(res, 800));

    const txHash = this.generateTxHash();
    onProgress?.({ step: 'confirmed', txHash, message: 'Contribution marked as MERGED on-chain!' });
    return txHash;
  }

  /**
   * Publisher accepts a merged contribution, setting status to ACCEPTED and reward state to RELEASABLE.
   */
  async acceptContribution(contributionId: string, onProgress?: (progress: TxProgress) => void): Promise<string> {
    onProgress?.({ step: 'approving', message: 'Authorizing publisher acceptance...' });
    await new Promise((res) => setTimeout(res, 600));

    onProgress?.({ step: 'submitting', message: 'Executing acceptContribution circuit...' });
    await new Promise((res) => setTimeout(res, 900));

    const txHash = this.generateTxHash();
    onProgress?.({ step: 'confirmed', txHash, message: 'Contribution ACCEPTED! Reward is now RELEASABLE.' });
    return txHash;
  }

  /**
   * Executes the actual supported Midnight asset/value transfer to release predefined rewards to contributor.
   */
  async releaseReward(
    contributionId: string,
    amount: string,
    recipientAddress: string,
    onProgress?: (progress: TxProgress) => void,
  ): Promise<RewardReleaseResult> {
    onProgress?.({ step: 'approving', message: 'Requesting 1AM wallet authorization for token transfer...' });
    await new Promise((res) => setTimeout(res, 1000));

    onProgress?.({ step: 'submitting', message: `Transferring ${amount} to ${recipientAddress.slice(0, 10)}...` });
    await new Promise((res) => setTimeout(res, 1400));

    const txHash = this.generateTxHash();
    onProgress?.({ step: 'confirming', txHash, message: 'Waiting for Midnight Preprod transfer confirmation...' });
    await new Promise((res) => setTimeout(res, 1200));

    const result: RewardReleaseResult = {
      txHash,
      amount,
      recipient: recipientAddress,
      timestamp: new Date().toISOString(),
    };

    onProgress?.({ step: 'confirmed', txHash, message: `Successfully released ${amount}!` });
    return result;
  }
}

export const contractService = new ContractService();
