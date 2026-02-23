import apiClient from '../api/client';
import { MovieResponse, Movie } from '../types/movie';

export const MovieService = {
  getPopularMovies: async (): Promise<Movie[]> => {
    const response = await apiClient.get<MovieResponse>('/movie/popular');
    return response.data.results;
  },

  // Add this inside your MovieService object
  // 
  getMovieDetails: async (movieId: number): Promise<Movie> => {
  try {
    const response = await apiClient.get<Movie>(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Details Fetch Error:', error);
    throw error;
  }
},
};