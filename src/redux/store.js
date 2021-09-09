import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers } from 'redux'

import proofs from './proofs'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['proofs'],
}

const reducers = { proofs }

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ proofs })
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
  // enhancers: [reduxBatch],
})

export const persistor = persistStore(store)
