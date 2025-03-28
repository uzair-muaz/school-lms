import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { combineReducers } from "redux";
import systemSlice from "./systemSlice";

// Persist config
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers (if you have multiple reducers)
const rootReducer = combineReducers({
  system: systemSlice,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }),
});

// Persistor
export const persistor = persistStore(store);

export default store;
