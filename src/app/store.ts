// store.ts
import { configureStore } from '@reduxjs/toolkit';
import vocabSlice from '../feature/vocabSlice';
import topicSlice from '../feature/topicSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // lưu vào localStorage

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  vocab: vocabSlice,
  topic: topicSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['vocab','topic'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
