import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Board {
  id: string;
  name: string;
  projects: string[];
  createdBy: string;
}

export interface BoardReducer {
  current: Board | null;
  item: Board | null;
  list: Board[];
  isLoading: boolean;
}

const initialState: BoardReducer = {
  current: null,
  item: null,
  list: [],
  isLoading: false,
};

export const boardSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.list = action.payload;
    },
    setCurrent: (state, action: PayloadAction<Board>) => {
      state.current = action.payload;
    },
    setBoard: (state, action: PayloadAction<Board>) => {
      state.list = state.list.concat([action.payload]);
      state.item = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBoards, setCurrent, setBoard, setLoading } = boardSlice.actions;

export const boardReducer = boardSlice.reducer;
