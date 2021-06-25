import { AppDispatch, AppThunk } from '@store';
import { get, post } from '@api/Api';
import { projectorUrl } from '@services/utils';
import { Board, setCurrent, setLoading, setBoard, setBoards } from '@store/board';

type BoardPost = Pick<Board, 'name' | 'projects'>;

export const getList = () => {
  return get<Board[]>(projectorUrl('boards'));
};

export const getBoardById = (id: string) => {
  return get<Board>(projectorUrl(`boards/${id}`));
};

export const create = (board: BoardPost) => {
  return post<Board>(projectorUrl('boards'), board);
};

export const fetchBoards = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const boards = await getList();
    dispatch(setBoards(boards));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const setCurrentBoard = (id: Board['id']): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const board = await getBoardById(id);
    dispatch(setCurrent(board));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const createBoard = (board: BoardPost): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const created = await create(board);
    dispatch(setBoard(created));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};
