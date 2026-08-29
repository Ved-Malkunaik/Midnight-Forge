import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Project } from '../types/marketplace';
import { mockProjects } from '../data/mockProjects';

const PROJECTS_STORAGE_KEY = 'midnight_forge_published_projects';

interface ProjectContextValue {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (projectId: string) => void;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

const readProjects = (): Project[] => {
  try {
    const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!storedProjects) {
      return mockProjects;
    }
    const projects = JSON.parse(storedProjects) as Project[];
    const cleanProjects = projects.filter(
      (p) =>
        !p.name.toLowerCase().includes('stellarpoll') &&
        p.projectId !== 'stellar-poll-ochre.vercel.app' &&
        p.projectId !== 'projects/stellar-poll-ochre.vercel.app',
    );
    if (cleanProjects.length !== projects.length) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(cleanProjects));
    }
    return cleanProjects;
  } catch {
    return [];
  }
};

export const ProjectProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(readProjects);

  const addProject = (project: Project) => {
    setProjects((currentProjects) => {
      const nextProjects = [project, ...currentProjects];
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(nextProjects));
      return nextProjects;
    });
  };

  const removeProject = (projectId: string) => {
    setProjects((currentProjects) => {
      const nextProjects = currentProjects.filter((p) => p.projectId !== projectId);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(nextProjects));
      return nextProjects;
    });
  };

  const value = useMemo(() => ({ projects, addProject, removeProject }), [projects]);

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = (): ProjectContextValue => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
