import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Project } from '../types/marketplace';

const PROJECTS_STORAGE_KEY = 'midnight_forge_published_projects';
const HIDDEN_PROJECT_NAMES = new Set(['spareguard', 'stellar poll']);

interface ProjectContextValue {
  projects: Project[];
  addProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

const readProjects = (): Project[] => {
  try {
    const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    const projects = storedProjects ? (JSON.parse(storedProjects) as Project[]) : [];
    const currentProjects = projects.filter((project) => !HIDDEN_PROJECT_NAMES.has(project.name.trim().toLowerCase()));
    if (storedProjects && currentProjects.length !== projects.length) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(currentProjects));
    }
    return currentProjects;
  } catch {
    return [];
  }
};

export const ProjectProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(readProjects);

  const addProject = (project: Project) => {
    if (HIDDEN_PROJECT_NAMES.has(project.name.trim().toLowerCase())) {
      return;
    }
    setProjects((currentProjects) => {
      const nextProjects = [project, ...currentProjects];
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(nextProjects));
      return nextProjects;
    });
  };

  const value = useMemo(() => ({ projects, addProject }), [projects]);

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = (): ProjectContextValue => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
