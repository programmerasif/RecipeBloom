
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './api/features/auth/authSlice';
import userReducer from './api/features/usersSlice/usersSlice';
import { baseApi } from './api/baseApi';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key:"userInfo",
  storage
}
const persistetAuthReducer = persistReducer(persistConfig,userReducer)
export const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
        auth: authSlice,
        user: persistetAuthReducer,

    },
    middleware:getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware)
  });

  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store); 