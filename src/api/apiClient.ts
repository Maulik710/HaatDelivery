import axios from 'axios';
import env from '../config/env';

const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
});

export default apiClient;