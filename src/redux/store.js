import { configureStore } from '@reduxjs/toolkit';

import systemSlice from './systemSlice';

const store = configureStore({
  reducer: {
    systemSlice: systemSlice
  }
});

export default store;
