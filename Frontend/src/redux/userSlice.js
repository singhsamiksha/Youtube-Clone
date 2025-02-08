import { createSlice } from '@reduxjs/toolkit';

// Retrieve user data from localStorage if available
const storedUser = JSON.parse(localStorage.getItem('user'));

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

      state.user = user;
      state.isAuthenticated = !!user;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { updateUser, logout } = userSlice.actions;
export default userSlice.reducer;
