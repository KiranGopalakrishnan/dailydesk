import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@services/Users';

export interface UserReducer {
  item: User | null;
  list: User[];
  isLoading: boolean;
}

const initialState: UserReducer = {
  item: null,
  list: [],
  isLoading: false,
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.item = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, setLoading } = counterSlice.actions;

export const userReducer = counterSlice.reducer;
