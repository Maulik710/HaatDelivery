import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMarketData, fetchCategoryDetails } from '../../api/marketService';
import { MarketState } from './marketTypes';

// Initial state
const initialState: MarketState = {
  categories: null,
  categoryDetails: null,
  loading: false,
  error: null,
};

// Thunks
export const loadMarketData = createAsyncThunk(
  'market/loadMarketData',
  async (marketId: string) => {
    const data = await fetchMarketData(marketId);
    return data;
  }
);

export const loadCategoryDetails = createAsyncThunk(
  'market/loadCategoryDetails',
  async ({ marketId, categoryId }: { marketId: string, categoryId: string }) => {
    const data = await fetchCategoryDetails(marketId, categoryId);
    return data;
  }
);

// Slice
const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load market data
      .addCase(loadMarketData.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMarketData.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(loadMarketData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Load category details
      .addCase(loadCategoryDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCategoryDetails.fulfilled, (state, action) => {
        state.categoryDetails = action.payload;
        state.loading = false;
      })
      .addCase(loadCategoryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default marketSlice.reducer;
