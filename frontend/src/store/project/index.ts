import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id?: string;
  name: string;
}

export interface ProjectReducer {
  item: Project | null;
  list: Project[];
  isLoading: boolean;
}

const initialState: ProjectReducer = {
  item: null,
  list: [],
  isLoading: false,
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.list = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProjects, setLoading } = counterSlice.actions;

export const projectReducer = counterSlice.reducer;
