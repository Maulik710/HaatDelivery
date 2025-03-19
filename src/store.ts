import { configureStore } from '@reduxjs/toolkit';
import marketReducer from './reducer/market/marketSlice';
import languageReducer from './reducer/language/languageSlice';

const store = configureStore({
  reducer: {
    market: marketReducer,
    language: languageReducer,
  },
});

// Export type for the RootState
export type RootState = ReturnType<typeof store.getState>;

// Export the store and AppDispatch
export type AppDispatch = typeof store.dispatch;

export default store;