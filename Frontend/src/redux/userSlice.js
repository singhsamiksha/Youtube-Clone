import { createSlice } from "@reduxjs/toolkit";

// Retrieve user data from localStorage if available
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null, // Load from localStorage if available
  isAuthenticated: !!storedUser, // Check if user exists in localStorage
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in localStorage
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // Remove user from localStorage
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
