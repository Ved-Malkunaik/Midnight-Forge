import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var ContributionStatus;
(function (ContributionStatus) {
  ContributionStatus[ContributionStatus['OPEN'] = 0] = 'OPEN';
  ContributionStatus[ContributionStatus['CLAIMED'] = 1] = 'CLAIMED';
  ContributionStatus[ContributionStatus['PR_SUBMITTED'] = 2] = 'PR_SUBMITTED';
  ContributionStatus[ContributionStatus['MERGED'] = 3] = 'MERGED';
  ContributionStatus[ContributionStatus['ACCEPTED'] = 4] = 'ACCEPTED';
  ContributionStatus[ContributionStatus['REWARDED'] = 5] = 'REWARDED';
})(ContributionStatus || (ContributionStatus = {}));

export var Difficulty;
(function (Difficulty) {
  Difficulty[Difficulty['LOW'] = 0] = 'LOW';
  Difficulty[Difficulty['MEDIUM'] = 1] = 'MEDIUM';
  Difficulty[Difficulty['HIGH'] = 2] = 'HIGH';
  Difficulty[Difficulty['EXPERT'] = 3] = 'EXPERT';
})(Difficulty || (Difficulty = {}));

export var RewardState;
(function (RewardState) {
  RewardState[RewardState['UNFUNDED'] = 0] = 'UNFUNDED';
  RewardState[RewardState['FUNDED'] = 1] = 'FUNDED';
  RewardState[RewardState['RELEASABLE'] = 2] = 'RELEASABLE';
  RewardState[RewardState['RELEASED'] = 3] = 'RELEASED';
})(RewardState || (RewardState = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = __compactRuntime.CompactTypeOpaqueString;

const _descriptor_2 = new __compactRuntime.CompactTypeEnum(3, 1);

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_4 = new __compactRuntime.CompactTypeEnum(5, 1);

const _descriptor_5 = new __compactRuntime.CompactTypeEnum(3, 1);

class _Contribution_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment()))))))))));
  }
  fromValue(value_0) {
    return {
      projectId: _descriptor_0.fromValue(value_0),
      creator: _descriptor_0.fromValue(value_0),
      title: _descriptor_1.fromValue(value_0),
      description: _descriptor_1.fromValue(value_0),
      difficulty: _descriptor_2.fromValue(value_0),
      rewardAmount: _descriptor_3.fromValue(value_0),
      status: _descriptor_4.fromValue(value_0),
      claimedBy: _descriptor_0.fromValue(value_0),
      githubIssueReference: _descriptor_1.fromValue(value_0),
      githubPrReference: _descriptor_1.fromValue(value_0),
      rewardState: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.projectId).concat(_descriptor_0.toValue(value_0.creator).concat(_descriptor_1.toValue(value_0.title).concat(_descriptor_1.toValue(value_0.description).concat(_descriptor_2.toValue(value_0.difficulty).concat(_descriptor_3.toValue(value_0.rewardAmount).concat(_descriptor_4.toValue(value_0.status).concat(_descriptor_0.toValue(value_0.claimedBy).concat(_descriptor_1.toValue(value_0.githubIssueReference).concat(_descriptor_1.toValue(value_0.githubPrReference).concat(_descriptor_5.toValue(value_0.rewardState)))))))))));
  }
}

const _descriptor_6 = new _Contribution_0();

const _descriptor_7 = __compactRuntime.CompactTypeBoolean;

class _Project_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_3.alignment()))))));
  }
  fromValue(value_0) {
    return {
      owner: _descriptor_0.fromValue(value_0),
      name: _descriptor_1.fromValue(value_0),
      description: _descriptor_1.fromValue(value_0),
      githubRepository: _descriptor_1.fromValue(value_0),
      deploymentUrl: _descriptor_1.fromValue(value_0),
      improvementAreas: _descriptor_1.fromValue(value_0),
      createdAt: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.owner).concat(_descriptor_1.toValue(value_0.name).concat(_descriptor_1.toValue(value_0.description).concat(_descriptor_1.toValue(value_0.githubRepository).concat(_descriptor_1.toValue(value_0.deploymentUrl).concat(_descriptor_1.toValue(value_0.improvementAreas).concat(_descriptor_3.toValue(value_0.createdAt)))))));
  }
}

const _descriptor_8 = new _Project_0();

const _descriptor_9 = new __compactRuntime.CompactTypeVector(3, _descriptor_0);

class _Either_0 {
  alignment() {
    return _descriptor_7.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_7.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_7.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_10 = new _Either_0();

const _descriptor_11 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_12 = new _ContractAddress_0();

const _descriptor_13 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.localSecretKey) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named localSecretKey');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      registerProject: (...args_1) => {
        if (args_1.length !== 8) {
          throw new __compactRuntime.CompactError(`registerProject: expected 8 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const projectId_0 = args_1[1];
        const name_0 = args_1[2];
        const description_0 = args_1[3];
        const githubRepository_0 = args_1[4];
        const deploymentUrl_0 = args_1[5];
        const improvementAreas_0 = args_1[6];
        const createdAt_0 = args_1[7];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('registerProject',
                                     'argument 1 (as invoked from Typescript)',
                                     'midnight-forge.compact line 129 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(projectId_0.buffer instanceof ArrayBuffer && projectId_0.BYTES_PER_ELEMENT === 1 && projectId_0.length === 32)) {
          __compactRuntime.typeError('registerProject',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'midnight-forge.compact line 129 char 1',
                                     'Bytes<32>',
                                     projectId_0)
        }
        if (!(typeof(createdAt_0) === 'bigint' && createdAt_0 >= 0n && createdAt_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('registerProject',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'midnight-forge.compact line 129 char 1',
                                     'Uint<0..18446744073709551616>',
                                     createdAt_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(projectId_0).concat(_descriptor_1.toValue(name_0).concat(_descriptor_1.toValue(description_0).concat(_descriptor_1.toValue(githubRepository_0).concat(_descriptor_1.toValue(deploymentUrl_0).concat(_descriptor_1.toValue(improvementAreas_0).concat(_descriptor_3.toValue(createdAt_0))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_3.alignment()))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerProject_0(context,
                                                 partialProofData,
                                                 projectId_0,
                                                 name_0,
                                                 description_0,
                                                 githubRepository_0,
                                                 deploymentUrl_0,
                                                 improvementAreas_0,
                                                 createdAt_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      updateProject: (...args_1) => {
        if (args_1.length !== 7) {
          throw new __compactRuntime.CompactError(`updateProject: expected 7 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const projectId_0 = args_1[1];
        const name_0 = args_1[2];
        const description_0 = args_1[3];
        const githubRepository_0 = args_1[4];
        const deploymentUrl_0 = args_1[5];
        const improvementAreas_0 = args_1[6];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('updateProject',
                                     'argument 1 (as invoked from Typescript)',
                                     'midnight-forge.compact line 149 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(projectId_0.buffer instanceof ArrayBuffer && projectId_0.BYTES_PER_ELEMENT === 1 && projectId_0.length === 32)) {
          __compactRuntime.typeError('updateProject',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'midnight-forge.compact line 149 char 1',
                                     'Bytes<32>',
                                     projectId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(projectId_0).concat(_descriptor_1.toValue(name_0).concat(_descriptor_1.toValue(description_0).concat(_descriptor_1.toValue(githubRepository_0).concat(_descriptor_1.toValue(deploymentUrl_0).concat(_descriptor_1.toValue(improvementAreas_0)))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment())))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._updateProject_0(context,
                                               partialProofData,
                                               projectId_0,
                                               name_0,
                                               description_0,
                                               githubRepository_0,
                                               deploymentUrl_0,
                                               improvementAreas_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getProject: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getProject: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const projectId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getProject',
                                     'argument 1 (as invoked from Typescript)',
                                     'midnight-forge.compact line 170 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(projectId_0.buffer instanceof ArrayBuffer && projectId_0.BYTES_PER_ELEMENT === 1 && projectId_0.length === 32)) {
          __compactRuntime.typeError('getProject',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'midnight-forge.compact line 170 char 1',
                                     'Bytes<32>',
                                     projectId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(projectId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getProject_0(context,
                                            partialProofData,
                                            projectId_0);
        partialProofData.output = { value: _descriptor_8.toValue(result_0), alignment: _descriptor_8.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      createContribution: (...args_1) => {
        if (args_1.length !== 9) {
          throw new __compactRuntime.CompactError(`createContribution: expected 9 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const contributionId_0 = args_1[1];
        const projectId_0 = args_1[2];
        const title_0 = args_1[3];
        const description_0 = args_1[4];
        const difficulty_0 = args_1[5];
        const rewardAmount_0 = args_1[6];
        const githubIssueReference_0 = args_1[7];
        const githubPrReference_0 = args_1[8];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('createContribution',
                                     'argument 1 (as invoked from Typescript)',
                                     'midnight-forge.compact line 182 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('createContribution',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'midnight-forge.compact line 182 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        if (!(projectId_0.buffer instanceof ArrayBuffer && projectId_0.BYTES_PER_ELEMENT === 1 && projectId_0.length === 32)) {
          __compactRuntime.typeError('createContribution',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'midnight-forge.compact line 182 char 1',
                                     'Bytes<32>',
                                     projectId_0)
        }
        if (!(typeof(difficulty_0) === 'number' && difficulty_0 >= 0 && difficulty_0 <= 3)) {
          __compactRuntime.typeError('createContribution',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'midnight-forge.compact line 182 char 1',
                                     'Enum<Difficulty, LOW, MEDIUM, HIGH, EXPERT>',
                                     difficulty_0)
        }
        if (!(typeof(rewardAmount_0) === 'bigint' && rewardAmount_0 >= 0n && rewardAmount_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createContribution',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'midnight-forge.compact line 182 char 1',
                                     'Uint<0..18446744073709551616>',
                                     rewardAmount_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0).concat(_descriptor_0.toValue(projectId_0).concat(_descriptor_1.toValue(title_0).concat(_descriptor_1.toValue(description_0).concat(_descriptor_2.toValue(difficulty_0).concat(_descriptor_3.toValue(rewardAmount_0).concat(_descriptor_1.toValue(githubIssueReference_0).concat(_descriptor_1.toValue(githubPrReference_0)))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment())))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createContribution_0(context,
                                                    partialProofData,
                                                    contributionId_0,
                                                    projectId_0,
                                                    title_0,
                                                    description_0,
                                                    difficulty_0,
                                                    rewardAmount_0,
                                                    githubIssueReference_0,
                                                    githubPrReference_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      claimContribution: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`claimContribution: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const contributionId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('claimContribution',
                                     'argument 1 (as invoked from Typescript)',
                                     'midnight-forge.compact line 212 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('claimContribution',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'midnight-forge.compact line 212 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._claimContribution_0(context,
                                                   partialProofData,
                                                   contributionId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      submitContribution: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`submitContribution: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const contributionId_0 = args_1[1];
        const githubPrReference_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('submitContribution',
                                     'argument 1 (as invoked from Typescript)',
                                     'midnight-forge.compact line 237 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('submitContribution',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'midnight-forge.compact line 237 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0).concat(_descriptor_1.toValue(githubPrReference_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._submitContribution_0(context,
                                                    partialProofData,
                                                    contributionId_0,
                                                    githubPrReference_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      markContributionMerged: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`markContributionMerged: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const contributionId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('markContributionMerged',
                                     'argument 1 (as invoked from Typescript)',
                                     'midnight-forge.compact line 261 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('markContributionMerged',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'midnight-forge.compact line 261 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._markContributionMerged_0(context,
                                                        partialProofData,
                                                        contributionId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      acceptContribution: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`acceptContribution: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const contributionId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('acceptContribution',
                                     'argument 1 (as invoked from Typescript)',
                                     'midnight-forge.compact line 286 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('acceptContribution',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'midnight-forge.compact line 286 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._acceptContribution_0(context,
                                                    partialProofData,
                                                    contributionId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      fundReward: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`fundReward: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const contributionId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('fundReward',
                                     'argument 1 (as invoked from Typescript)',
                                     'midnight-forge.compact line 318 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('fundReward',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'midnight-forge.compact line 318 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._fundReward_0(context,
                                            partialProofData,
                                            contributionId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      releaseReward: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`releaseReward: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const contributionId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('releaseReward',
                                     'argument 1 (as invoked from Typescript)',
                                     'midnight-forge.compact line 346 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('releaseReward',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'midnight-forge.compact line 346 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._releaseReward_0(context,
                                               partialProofData,
                                               contributionId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getContribution: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getContribution: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const contributionId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getContribution',
                                     'argument 1 (as invoked from Typescript)',
                                     'midnight-forge.compact line 371 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('getContribution',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'midnight-forge.compact line 371 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getContribution_0(context,
                                                 partialProofData,
                                                 contributionId_0);
        partialProofData.output = { value: _descriptor_6.toValue(result_0), alignment: _descriptor_6.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      registerProject: this.circuits.registerProject,
      updateProject: this.circuits.updateProject,
      getProject: this.circuits.getProject,
      createContribution: this.circuits.createContribution,
      claimContribution: this.circuits.claimContribution,
      submitContribution: this.circuits.submitContribution,
      markContributionMerged: this.circuits.markContributionMerged,
      acceptContribution: this.circuits.acceptContribution,
      fundReward: this.circuits.fundReward,
      releaseReward: this.circuits.releaseReward,
      getContribution: this.circuits.getContribution
    };
    this.provableCircuits = {
      registerProject: this.circuits.registerProject,
      updateProject: this.circuits.updateProject,
      getProject: this.circuits.getProject,
      createContribution: this.circuits.createContribution,
      claimContribution: this.circuits.claimContribution,
      submitContribution: this.circuits.submitContribution,
      markContributionMerged: this.circuits.markContributionMerged,
      acceptContribution: this.circuits.acceptContribution,
      fundReward: this.circuits.fundReward,
      releaseReward: this.circuits.releaseReward,
      getContribution: this.circuits.getContribution
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('registerProject', new __compactRuntime.ContractOperation());
    state_0.setOperation('updateProject', new __compactRuntime.ContractOperation());
    state_0.setOperation('getProject', new __compactRuntime.ContractOperation());
    state_0.setOperation('createContribution', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimContribution', new __compactRuntime.ContractOperation());
    state_0.setOperation('submitContribution', new __compactRuntime.ContractOperation());
    state_0.setOperation('markContributionMerged', new __compactRuntime.ContractOperation());
    state_0.setOperation('acceptContribution', new __compactRuntime.ContractOperation());
    state_0.setOperation('fundReward', new __compactRuntime.ContractOperation());
    state_0.setOperation('releaseReward', new __compactRuntime.ContractOperation());
    state_0.setOperation('getContribution', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(0n),
                                                                                              alignment: _descriptor_13.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(1n),
                                                                                              alignment: _descriptor_13.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_9, value_0);
    return result_0;
  }
  _localSecretKey_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.localSecretKey(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('localSecretKey',
                                 'return value',
                                 'midnight-forge.compact line 107 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _dappUserKey_0(sk_0) {
    return this._persistentHash_0([new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 45, 102, 111, 114, 103, 101, 58, 117, 115, 101, 114, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   new Uint8Array([99, 111, 114, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _callerIdentity_0(context, partialProofData) {
    return this._dappUserKey_0(this._localSecretKey_0(context, partialProofData));
  }
  _registerProject_0(context,
                     partialProofData,
                     projectId_0,
                     name_0,
                     description_0,
                     githubRepository_0,
                     deploymentUrl_0,
                     improvementAreas_0,
                     createdAt_0)
  {
    __compactRuntime.assert(!_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_13.toValue(0n),
                                                                                                                   alignment: _descriptor_13.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(projectId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'project already exists');
    const tmp_0 = { owner: this._callerIdentity_0(context, partialProofData),
                    name: name_0,
                    description: description_0,
                    githubRepository: githubRepository_0,
                    deploymentUrl: deploymentUrl_0,
                    improvementAreas: improvementAreas_0,
                    createdAt: createdAt_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(0n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(projectId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _updateProject_0(context,
                   partialProofData,
                   projectId_0,
                   name_0,
                   description_0,
                   githubRepository_0,
                   deploymentUrl_0,
                   improvementAreas_0)
  {
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(0n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(projectId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'project does not exist');
    const project_0 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_13.toValue(0n),
                                                                                                            alignment: _descriptor_13.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(projectId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(this._equal_0(project_0.owner,
                                          this._callerIdentity_0(context,
                                                                 partialProofData)),
                            'only the project owner can update the project');
    const tmp_0 = { owner: project_0.owner,
                    name: name_0,
                    description: description_0,
                    githubRepository: githubRepository_0,
                    deploymentUrl: deploymentUrl_0,
                    improvementAreas: improvementAreas_0,
                    createdAt: project_0.createdAt };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(0n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(projectId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _getProject_0(context, partialProofData, projectId_0) {
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(0n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(projectId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'project does not exist');
    return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_13.toValue(0n),
                                                                                                 alignment: _descriptor_13.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_0.toValue(projectId_0),
                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _createContribution_0(context,
                        partialProofData,
                        contributionId_0,
                        projectId_0,
                        title_0,
                        description_0,
                        difficulty_0,
                        rewardAmount_0,
                        githubIssueReference_0,
                        githubPrReference_0)
  {
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(0n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(projectId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'project does not exist');
    __compactRuntime.assert(this._equal_1(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_13.toValue(0n),
                                                                                                                                alignment: _descriptor_13.alignment() } }] } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_0.toValue(projectId_0),
                                                                                                                                alignment: _descriptor_0.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value).owner,
                                          this._callerIdentity_0(context,
                                                                 partialProofData)),
                            'only the project owner can create a contribution');
    __compactRuntime.assert(!_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_13.toValue(1n),
                                                                                                                   alignment: _descriptor_13.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'contribution already exists');
    __compactRuntime.assert(rewardAmount_0 > 0n,
                            'reward must be greater than zero');
    const tmp_0 = { projectId: projectId_0,
                    creator:
                      _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_13.toValue(0n),
                                                                                                            alignment: _descriptor_13.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(projectId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value).owner,
                    title: title_0,
                    description: description_0,
                    difficulty: difficulty_0,
                    rewardAmount: rewardAmount_0,
                    status: 0,
                    claimedBy:
                      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                    githubIssueReference: githubIssueReference_0,
                    githubPrReference: githubPrReference_0,
                    rewardState: 0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _claimContribution_0(context, partialProofData, contributionId_0) {
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(1n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'contribution does not exist');
    const contribution_0 = _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_13.toValue(1n),
                                                                                                                 alignment: _descriptor_13.alignment() } }] } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_0.toValue(contributionId_0),
                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }]).value);
    __compactRuntime.assert(contribution_0.status === 0,
                            'contribution is not open');
    let tmp_0;
    __compactRuntime.assert((tmp_0 = contribution_0.projectId,
                             _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_13.toValue(0n),
                                                                                                                   alignment: _descriptor_13.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'project does not exist');
    let tmp_1;
    __compactRuntime.assert(!this._equal_2((tmp_1 = contribution_0.projectId,
                                            _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                      partialProofData,
                                                                                                      [
                                                                                                       { dup: { n: 0 } },
                                                                                                       { idx: { cached: false,
                                                                                                                pushPath: false,
                                                                                                                path: [
                                                                                                                       { tag: 'value',
                                                                                                                         value: { value: _descriptor_13.toValue(0n),
                                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                                       { idx: { cached: false,
                                                                                                                pushPath: false,
                                                                                                                path: [
                                                                                                                       { tag: 'value',
                                                                                                                         value: { value: _descriptor_0.toValue(tmp_1),
                                                                                                                                  alignment: _descriptor_0.alignment() } }] } },
                                                                                                       { popeq: { cached: false,
                                                                                                                  result: undefined } }]).value)).owner,
                                           this._callerIdentity_0(context,
                                                                  partialProofData)),
                            'project owner cannot claim their own contribution');
    const tmp_2 = { projectId: contribution_0.projectId,
                    creator: contribution_0.creator,
                    title: contribution_0.title,
                    description: contribution_0.description,
                    difficulty: contribution_0.difficulty,
                    rewardAmount: contribution_0.rewardAmount,
                    status: 1,
                    claimedBy: this._callerIdentity_0(context, partialProofData),
                    githubIssueReference: contribution_0.githubIssueReference,
                    githubPrReference: contribution_0.githubPrReference,
                    rewardState: contribution_0.rewardState };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_2),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _submitContribution_0(context,
                        partialProofData,
                        contributionId_0,
                        githubPrReference_0)
  {
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(1n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'contribution does not exist');
    const contribution_0 = _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_13.toValue(1n),
                                                                                                                 alignment: _descriptor_13.alignment() } }] } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_0.toValue(contributionId_0),
                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }]).value);
    __compactRuntime.assert(contribution_0.status === 1,
                            'contribution must be claimed first');
    __compactRuntime.assert(this._equal_3(contribution_0.claimedBy,
                                          this._callerIdentity_0(context,
                                                                 partialProofData)),
                            'only the claimant can submit a pull request reference');
    const tmp_0 = { projectId: contribution_0.projectId,
                    creator: contribution_0.creator,
                    title: contribution_0.title,
                    description: contribution_0.description,
                    difficulty: contribution_0.difficulty,
                    rewardAmount: contribution_0.rewardAmount,
                    status: 2,
                    claimedBy: contribution_0.claimedBy,
                    githubIssueReference: contribution_0.githubIssueReference,
                    githubPrReference: githubPrReference_0,
                    rewardState: contribution_0.rewardState };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _markContributionMerged_0(context, partialProofData, contributionId_0) {
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(1n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'contribution does not exist');
    const contribution_0 = _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_13.toValue(1n),
                                                                                                                 alignment: _descriptor_13.alignment() } }] } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_0.toValue(contributionId_0),
                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }]).value);
    let tmp_0;
    __compactRuntime.assert((tmp_0 = contribution_0.projectId,
                             _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_13.toValue(0n),
                                                                                                                   alignment: _descriptor_13.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'project does not exist');
    let tmp_1;
    __compactRuntime.assert(this._equal_4((tmp_1 = contribution_0.projectId,
                                           _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_13.toValue(0n),
                                                                                                                                 alignment: _descriptor_13.alignment() } }] } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_0.toValue(tmp_1),
                                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)).owner,
                                          this._callerIdentity_0(context,
                                                                 partialProofData)),
                            'only the project owner can mark a contribution as merged');
    __compactRuntime.assert(contribution_0.status === 2,
                            'contribution must have a submitted pull request');
    const tmp_2 = { projectId: contribution_0.projectId,
                    creator: contribution_0.creator,
                    title: contribution_0.title,
                    description: contribution_0.description,
                    difficulty: contribution_0.difficulty,
                    rewardAmount: contribution_0.rewardAmount,
                    status: 3,
                    claimedBy: contribution_0.claimedBy,
                    githubIssueReference: contribution_0.githubIssueReference,
                    githubPrReference: contribution_0.githubPrReference,
                    rewardState: contribution_0.rewardState };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_2),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _acceptContribution_0(context, partialProofData, contributionId_0) {
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(1n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'contribution does not exist');
    const contribution_0 = _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_13.toValue(1n),
                                                                                                                 alignment: _descriptor_13.alignment() } }] } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_0.toValue(contributionId_0),
                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }]).value);
    let tmp_0;
    __compactRuntime.assert((tmp_0 = contribution_0.projectId,
                             _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_13.toValue(0n),
                                                                                                                   alignment: _descriptor_13.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'project does not exist');
    let tmp_1;
    __compactRuntime.assert(this._equal_5((tmp_1 = contribution_0.projectId,
                                           _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_13.toValue(0n),
                                                                                                                                 alignment: _descriptor_13.alignment() } }] } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_0.toValue(tmp_1),
                                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)).owner,
                                          this._callerIdentity_0(context,
                                                                 partialProofData)),
                            'only the project owner can accept a contribution');
    __compactRuntime.assert(contribution_0.status === 3,
                            'contribution must be merged before it can be accepted');
    const tmp_2 = { projectId: contribution_0.projectId,
                    creator: contribution_0.creator,
                    title: contribution_0.title,
                    description: contribution_0.description,
                    difficulty: contribution_0.difficulty,
                    rewardAmount: contribution_0.rewardAmount,
                    status: 4,
                    claimedBy: contribution_0.claimedBy,
                    githubIssueReference: contribution_0.githubIssueReference,
                    githubPrReference: contribution_0.githubPrReference,
                    rewardState: 2 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_2),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _fundReward_0(context, partialProofData, contributionId_0) {
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(1n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'contribution does not exist');
    const contribution_0 = _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_13.toValue(1n),
                                                                                                                 alignment: _descriptor_13.alignment() } }] } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_0.toValue(contributionId_0),
                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }]).value);
    let tmp_0;
    __compactRuntime.assert((tmp_0 = contribution_0.projectId,
                             _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_13.toValue(0n),
                                                                                                                   alignment: _descriptor_13.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'project does not exist');
    let tmp_1;
    __compactRuntime.assert(this._equal_6((tmp_1 = contribution_0.projectId,
                                           _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_13.toValue(0n),
                                                                                                                                 alignment: _descriptor_13.alignment() } }] } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_0.toValue(tmp_1),
                                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)).owner,
                                          this._callerIdentity_0(context,
                                                                 partialProofData)),
                            'only the project owner can fund the reward');
    __compactRuntime.assert(contribution_0.rewardState === 0,
                            'reward is already funded');
    __compactRuntime.assert(contribution_0.status !== 4
                            &&
                            contribution_0.status !== 5,
                            'reward is already finalized');
    const tmp_2 = { projectId: contribution_0.projectId,
                    creator: contribution_0.creator,
                    title: contribution_0.title,
                    description: contribution_0.description,
                    difficulty: contribution_0.difficulty,
                    rewardAmount: contribution_0.rewardAmount,
                    status: contribution_0.status,
                    claimedBy: contribution_0.claimedBy,
                    githubIssueReference: contribution_0.githubIssueReference,
                    githubPrReference: contribution_0.githubPrReference,
                    rewardState: 1 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_2),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _releaseReward_0(context, partialProofData, contributionId_0) {
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(1n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'contribution does not exist');
    const contribution_0 = _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_13.toValue(1n),
                                                                                                                 alignment: _descriptor_13.alignment() } }] } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_0.toValue(contributionId_0),
                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }]).value);
    __compactRuntime.assert(contribution_0.status === 4,
                            'contribution must be accepted before the reward can be released');
    __compactRuntime.assert(contribution_0.rewardState === 2,
                            'reward is not releasable');
    __compactRuntime.assert(this._equal_7(contribution_0.claimedBy,
                                          this._callerIdentity_0(context,
                                                                 partialProofData)),
                            'only the contributing claimant can receive the reward');
    const tmp_0 = { projectId: contribution_0.projectId,
                    creator: contribution_0.creator,
                    title: contribution_0.title,
                    description: contribution_0.description,
                    difficulty: contribution_0.difficulty,
                    rewardAmount: contribution_0.rewardAmount,
                    status: 5,
                    claimedBy: contribution_0.claimedBy,
                    githubIssueReference: contribution_0.githubIssueReference,
                    githubPrReference: contribution_0.githubPrReference,
                    rewardState: 3 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _getContribution_0(context, partialProofData, contributionId_0) {
    __compactRuntime.assert(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(1n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'contribution does not exist');
    return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_13.toValue(1n),
                                                                                                 alignment: _descriptor_13.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_0.toValue(contributionId_0),
                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    projects: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_13.toValue(0n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_13.toValue(0n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'midnight-forge.compact line 92 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_13.toValue(0n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'midnight-forge.compact line 92 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_13.toValue(0n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_8.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    contributions: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_13.toValue(1n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_13.toValue(1n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'midnight-forge.compact line 94 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_13.toValue(1n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'midnight-forge.compact line 94 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_13.toValue(1n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_6.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ localSecretKey: (...args) => undefined });
export const pureCircuits = {};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
