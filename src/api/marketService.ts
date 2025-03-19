import apiClient from './apiClient';

// Fetch market data
export const fetchMarketData = async (marketId: string) => {
  const response = await apiClient.get(`/markets/${marketId}`);
  return response.data;
};

// Fetch category details
export const fetchCategoryDetails = async (marketId: string, categoryId: string) => {
  const response = await apiClient.get(`/markets/${marketId}/categories/${categoryId}`);
  console.log("🚀 ~ fetchCategoryDetails ~ response:", response)
  return response.data;
};