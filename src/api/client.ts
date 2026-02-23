import axios from 'axios';

// In a real app, move these to a .env file later!
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = 'd67734ddf543e4aa2abd0b4655befe78'; 

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000,
});

// Interceptor: Like an OkHttp Interceptor for every request
apiClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: TMDB_API_KEY,
  };
  return config;
});

export default apiClient;