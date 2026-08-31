import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Project } from '../types/marketplace';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { toHex } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { ledger } from '../../../contract/src/managed/midnight-forge/contract/index.js';
import { getContractAddress } from '../config';
import { shortenAddress } from '../utils/address';
import { dataService } from '../services/dataService';

interface ProjectContextValue {
  projects: Project[];
  loading: boolean;
  error: string | null;
  addProject: (project: Project) => void;
  removeProject: (projectId: string) => void;
  refreshProjects: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export const ProjectProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOnChainProjects = useCallback(async (): Promise<Project[]> => {
    const contractAddress = getContractAddress();
    if (!contractAddress) {
      return [];
    }

    const indexerUri =
      (import.meta.env.VITE_INDEXER_URI as string) ||
      'https://indexer.preprod.midnight.network/api/v4/graphql';
    const indexerWsUri =
      (import.meta.env.VITE_INDEXER_WS_URI as string) ||
      'wss://indexer.preprod.midnight.network/api/v4/graphql/ws';

    try {
      const provider = indexerPublicDataProvider(indexerUri, indexerWsUri);
      const state = await provider.queryContractState(contractAddress);

      if (!state || !state.data) {
        return [];
      }

      const contractLedger = ledger(state.data);
      const onChainProjects: Project[] = [];

      for (const [key, rawProj] of contractLedger.projects) {
        const projectId = toHex(key);
        const ownerAddress = toHex(rawProj.owner);
        const improvementAreas = rawProj.improvementAreas
          ? rawProj.improvementAreas
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : [];

        onChainProjects.push({
          projectId,
          owner: ownerAddress,
          publisherName: `Publisher (${shortenAddress(ownerAddress)})`,
          name: rawProj.name,
          shortDescription:
            rawProj.description.length > 150 ? `${rawProj.description.slice(0, 150)}...` : rawProj.description,
          fullDescription: rawProj.description,
          githubRepository: rawProj.githubRepository,
          deploymentUrl: rawProj.deploymentUrl || undefined,
          category: 'Core Protocol',
          technologies: improvementAreas,
          improvementAreas: improvementAreas,
          createdAt: rawProj.createdAt ? new Date(Number(rawProj.createdAt)).toISOString() : new Date().toISOString(),
          status: 'ACTIVE',
          rewardPool: '0 tNIGHT',
          openTaskCount: 0,
          completedTaskCount: 0,
        });
      }

      return onChainProjects;
    } catch {
      return [];
    }
  }, []);

  const refreshProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const persistentProjects = await dataService.getProjects();
      const onChainFetched = await fetchOnChainProjects();

      const map = new Map<string, Project>();
      for (const p of [...persistentProjects, ...onChainFetched]) {
        map.set(p.projectId, p);
      }

      const merged = Array.from(map.values());
      setProjects(merged);
    } catch (err: unknown) {
      console.error('Failed to refresh projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to query projects');
    } finally {
      setLoading(false);
    }
  }, [fetchOnChainProjects]);

  useEffect(() => {
    void refreshProjects();
  }, [refreshProjects]);

  const addProject = useCallback(
    (project: Project) => {
      setProjects((currentProjects) => {
        if (currentProjects.some((p) => p.projectId === project.projectId)) {
          return currentProjects;
        }
        return [project, ...currentProjects];
      });
      void dataService.saveProject(project);
      setTimeout(() => {
        void refreshProjects();
      }, 1500);
    },
    [refreshProjects],
  );

  const removeProject = useCallback((projectId: string) => {
    setProjects((currentProjects) => currentProjects.filter((p) => p.projectId !== projectId));
  }, []);

  const value = useMemo(
    () => ({ projects, loading, error, addProject, removeProject, refreshProjects }),
    [projects, loading, error, addProject, removeProject, refreshProjects],
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = (): ProjectContextValue => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

