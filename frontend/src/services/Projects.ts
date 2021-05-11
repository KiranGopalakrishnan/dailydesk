import { get, post } from '../api/Api';
import { projectorUrl } from './utils';
import { Project } from '../types/Projects';

const createProject = (project: Project) => {
  return post<Project>(projectorUrl('projects'), project);
};

const getProjects = (project: Project) => {
  return get<Project>(projectorUrl('projects'));
};

export { createProject };
