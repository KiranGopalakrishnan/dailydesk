import { AppDispatch, AppThunk } from '@store';
import { setCurrentUser, setLoading } from '@store/user';
import { User } from '@services/Users';
import { get, post } from '@api/Api';
import { projectorUrl } from '@services/utils';
import { Project, setProjects } from '@store/project/index';

export const getList = () => {
  return get<Project[]>(projectorUrl('projects'));
};

export const getProjects = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const projects = await getList();
    dispatch(setProjects(projects));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};
