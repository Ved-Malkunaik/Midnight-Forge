import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum ContributionStatus { OPEN = 0,
                                 CLAIMED = 1,
                                 PR_SUBMITTED = 2,
                                 MERGED = 3,
                                 ACCEPTED = 4,
                                 REWARDED = 5
}

export enum Difficulty { LOW = 0, MEDIUM = 1, HIGH = 2, EXPERT = 3 }

export enum RewardState { UNFUNDED = 0, FUNDED = 1, RELEASABLE = 2, RELEASED = 3
}

export type Witnesses<PS> = {
  localSecretKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  registerProject(context: __compactRuntime.CircuitContext<PS>,
                  projectId_0: Uint8Array,
                  name_0: string,
                  description_0: string,
                  githubRepository_0: string,
                  deploymentUrl_0: string,
                  improvementAreas_0: string,
                  createdAt_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  updateProject(context: __compactRuntime.CircuitContext<PS>,
                projectId_0: Uint8Array,
                name_0: string,
                description_0: string,
                githubRepository_0: string,
                deploymentUrl_0: string,
                improvementAreas_0: string): __compactRuntime.CircuitResults<PS, []>;
  getProject(context: __compactRuntime.CircuitContext<PS>,
             projectId_0: Uint8Array): __compactRuntime.CircuitResults<PS, { owner: Uint8Array,
                                                                             name: string,
                                                                             description: string,
                                                                             githubRepository: string,
                                                                             deploymentUrl: string,
                                                                             improvementAreas: string,
                                                                             createdAt: bigint
                                                                           }>;
  createContribution(context: __compactRuntime.CircuitContext<PS>,
                     contributionId_0: Uint8Array,
                     projectId_0: Uint8Array,
                     title_0: string,
                     description_0: string,
                     difficulty_0: Difficulty,
                     rewardAmount_0: bigint,
                     githubIssueReference_0: string,
                     githubPrReference_0: string): __compactRuntime.CircuitResults<PS, []>;
  claimContribution(context: __compactRuntime.CircuitContext<PS>,
                    contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  submitContribution(context: __compactRuntime.CircuitContext<PS>,
                     contributionId_0: Uint8Array,
                     githubPrReference_0: string): __compactRuntime.CircuitResults<PS, []>;
  markContributionMerged(context: __compactRuntime.CircuitContext<PS>,
                         contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  acceptContribution(context: __compactRuntime.CircuitContext<PS>,
                     contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  fundReward(context: __compactRuntime.CircuitContext<PS>,
             contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  releaseReward(context: __compactRuntime.CircuitContext<PS>,
                contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  getContribution(context: __compactRuntime.CircuitContext<PS>,
                  contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, { projectId: Uint8Array,
                                                                                       creator: Uint8Array,
                                                                                       title: string,
                                                                                       description: string,
                                                                                       difficulty: Difficulty,
                                                                                       rewardAmount: bigint,
                                                                                       status: ContributionStatus,
                                                                                       claimedBy: Uint8Array,
                                                                                       githubIssueReference: string,
                                                                                       githubPrReference: string,
                                                                                       rewardState: RewardState
                                                                                     }>;
}

export type ProvableCircuits<PS> = {
  registerProject(context: __compactRuntime.CircuitContext<PS>,
                  projectId_0: Uint8Array,
                  name_0: string,
                  description_0: string,
                  githubRepository_0: string,
                  deploymentUrl_0: string,
                  improvementAreas_0: string,
                  createdAt_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  updateProject(context: __compactRuntime.CircuitContext<PS>,
                projectId_0: Uint8Array,
                name_0: string,
                description_0: string,
                githubRepository_0: string,
                deploymentUrl_0: string,
                improvementAreas_0: string): __compactRuntime.CircuitResults<PS, []>;
  getProject(context: __compactRuntime.CircuitContext<PS>,
             projectId_0: Uint8Array): __compactRuntime.CircuitResults<PS, { owner: Uint8Array,
                                                                             name: string,
                                                                             description: string,
                                                                             githubRepository: string,
                                                                             deploymentUrl: string,
                                                                             improvementAreas: string,
                                                                             createdAt: bigint
                                                                           }>;
  createContribution(context: __compactRuntime.CircuitContext<PS>,
                     contributionId_0: Uint8Array,
                     projectId_0: Uint8Array,
                     title_0: string,
                     description_0: string,
                     difficulty_0: Difficulty,
                     rewardAmount_0: bigint,
                     githubIssueReference_0: string,
                     githubPrReference_0: string): __compactRuntime.CircuitResults<PS, []>;
  claimContribution(context: __compactRuntime.CircuitContext<PS>,
                    contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  submitContribution(context: __compactRuntime.CircuitContext<PS>,
                     contributionId_0: Uint8Array,
                     githubPrReference_0: string): __compactRuntime.CircuitResults<PS, []>;
  markContributionMerged(context: __compactRuntime.CircuitContext<PS>,
                         contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  acceptContribution(context: __compactRuntime.CircuitContext<PS>,
                     contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  fundReward(context: __compactRuntime.CircuitContext<PS>,
             contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  releaseReward(context: __compactRuntime.CircuitContext<PS>,
                contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  getContribution(context: __compactRuntime.CircuitContext<PS>,
                  contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, { projectId: Uint8Array,
                                                                                       creator: Uint8Array,
                                                                                       title: string,
                                                                                       description: string,
                                                                                       difficulty: Difficulty,
                                                                                       rewardAmount: bigint,
                                                                                       status: ContributionStatus,
                                                                                       claimedBy: Uint8Array,
                                                                                       githubIssueReference: string,
                                                                                       githubPrReference: string,
                                                                                       rewardState: RewardState
                                                                                     }>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  registerProject(context: __compactRuntime.CircuitContext<PS>,
                  projectId_0: Uint8Array,
                  name_0: string,
                  description_0: string,
                  githubRepository_0: string,
                  deploymentUrl_0: string,
                  improvementAreas_0: string,
                  createdAt_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  updateProject(context: __compactRuntime.CircuitContext<PS>,
                projectId_0: Uint8Array,
                name_0: string,
                description_0: string,
                githubRepository_0: string,
                deploymentUrl_0: string,
                improvementAreas_0: string): __compactRuntime.CircuitResults<PS, []>;
  getProject(context: __compactRuntime.CircuitContext<PS>,
             projectId_0: Uint8Array): __compactRuntime.CircuitResults<PS, { owner: Uint8Array,
                                                                             name: string,
                                                                             description: string,
                                                                             githubRepository: string,
                                                                             deploymentUrl: string,
                                                                             improvementAreas: string,
                                                                             createdAt: bigint
                                                                           }>;
  createContribution(context: __compactRuntime.CircuitContext<PS>,
                     contributionId_0: Uint8Array,
                     projectId_0: Uint8Array,
                     title_0: string,
                     description_0: string,
                     difficulty_0: Difficulty,
                     rewardAmount_0: bigint,
                     githubIssueReference_0: string,
                     githubPrReference_0: string): __compactRuntime.CircuitResults<PS, []>;
  claimContribution(context: __compactRuntime.CircuitContext<PS>,
                    contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  submitContribution(context: __compactRuntime.CircuitContext<PS>,
                     contributionId_0: Uint8Array,
                     githubPrReference_0: string): __compactRuntime.CircuitResults<PS, []>;
  markContributionMerged(context: __compactRuntime.CircuitContext<PS>,
                         contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  acceptContribution(context: __compactRuntime.CircuitContext<PS>,
                     contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  fundReward(context: __compactRuntime.CircuitContext<PS>,
             contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  releaseReward(context: __compactRuntime.CircuitContext<PS>,
                contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  getContribution(context: __compactRuntime.CircuitContext<PS>,
                  contributionId_0: Uint8Array): __compactRuntime.CircuitResults<PS, { projectId: Uint8Array,
                                                                                       creator: Uint8Array,
                                                                                       title: string,
                                                                                       description: string,
                                                                                       difficulty: Difficulty,
                                                                                       rewardAmount: bigint,
                                                                                       status: ContributionStatus,
                                                                                       claimedBy: Uint8Array,
                                                                                       githubIssueReference: string,
                                                                                       githubPrReference: string,
                                                                                       rewardState: RewardState
                                                                                     }>;
}

export type Ledger = {
  projects: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): { owner: Uint8Array,
                                 name: string,
                                 description: string,
                                 githubRepository: string,
                                 deploymentUrl: string,
                                 improvementAreas: string,
                                 createdAt: bigint
                               };
    [Symbol.iterator](): Iterator<[Uint8Array, { owner: Uint8Array,
  name: string,
  description: string,
  githubRepository: string,
  deploymentUrl: string,
  improvementAreas: string,
  createdAt: bigint
}]>
  };
  contributions: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): { projectId: Uint8Array,
                                 creator: Uint8Array,
                                 title: string,
                                 description: string,
                                 difficulty: Difficulty,
                                 rewardAmount: bigint,
                                 status: ContributionStatus,
                                 claimedBy: Uint8Array,
                                 githubIssueReference: string,
                                 githubPrReference: string,
                                 rewardState: RewardState
                               };
    [Symbol.iterator](): Iterator<[Uint8Array, { projectId: Uint8Array,
  creator: Uint8Array,
  title: string,
  description: string,
  difficulty: Difficulty,
  rewardAmount: bigint,
  status: ContributionStatus,
  claimedBy: Uint8Array,
  githubIssueReference: string,
  githubPrReference: string,
  rewardState: RewardState
}]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
