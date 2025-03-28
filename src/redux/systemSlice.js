import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null, // JWT token
  user: null, // User type
  isSidebarOpen: false, // Whether sidebar is open
  activeTab: "Dashboard",
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token, user } = action.payload;
      console.log("token", token);
      console.log("user", user);
      state.token = token;
      state.user = user;
    },
    setSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    clearSystem: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, setSidebar, setActiveTab, clearSystem } =
  systemSlice.actions;

export default systemSlice.reducer;
