import { configureStore } from '@reduxjs/toolkit';
import marketReducer from './features/market/marketSlice';

const store = configureStore({
  reducer: {
    market: marketReducer,
  },
});

// Export type for the RootState
export type RootState = ReturnType<typeof store.getState>;

// Export the store and AppDispatch
export type AppDispatch = typeof store.dispatch;

export default store;