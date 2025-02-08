import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { payload } = action;
      const { user } = payload || {};

      state.isAuthenticated = !!user;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { updateUser, logout } = userSlice.actions;
export default userSlice.reducer;
