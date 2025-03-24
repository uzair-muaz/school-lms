import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null, // JWT token
  userType: null, // User type
  tokenExpiration: null, // Token expiration time
  isSidebarOpen: false,  // Whether sidebar is open
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token, expiration } = action.payload;
      state.token = token;
      state.tokenExpiration = expiration;
    },
    setSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    clearSystem: state => {
      state.token = null;
      state.tokenExpiration = null;
      state.user = null;
      state.isSidebarOpen = false;
      state.isLoggedIn = false;
      state.conversationId = null;
      state.userProfile = '/user-profiles/6.jpg';
    },
    
  }
});

export const {
  //---------- functions ----------
  setToken,
  setSidebar,
  clearSystem,
  //---------- values ----------
  token,
  userType,
  isSidebarOpen,
} = systemSlice.actions;

export default systemSlice.reducer;