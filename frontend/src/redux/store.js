// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import jobSlice from './jobSlice.js';
import authSlice from './authSlice.js';
import companySlice from "./companySlice.js" ;
import applicationSlice from "./applicationSlice.js" ;
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company : companySlice,
  application : applicationSlice,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// ✅ Apply persistReducer to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
