import { get, post } from '@api/Api';
import { Project } from '@store/project';
import { projectorUrl } from '@services/utils';

export interface TaskPost {
  name: string;
}

export interface Task {
  id: string;
  name: string;
  boards: string[];
  status: string;
  createdBy: string;
}

export const createTask = (id: string, task: TaskPost): Promise<Task> => {
  return post<Task>(projectorUrl(`boards/${id}/tasks`), task);
};

export const getTasksForBoard = (id: string): Promise<Task[]> => {
  return get<Task[]>(projectorUrl(`boards/${id}/tasks`));
};
