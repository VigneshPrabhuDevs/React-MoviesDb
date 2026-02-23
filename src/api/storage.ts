import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../types/movie';

const FAVORITES_KEY = 'user.favorites';
const MOVIE_CACHE_PREFIX = 'cache.movie.';

export const StorageService = {
  // --- Favorites Logic ---
  getFavorites: async (): Promise<Movie[]> => {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  },

  toggleFavorite: async (movie: Movie) => {
    const favorites = await StorageService.getFavorites();
    const index = favorites.findIndex((m) => m.id === movie.id);
    const updated = index > -1 
      ? favorites.filter(m => m.id !== movie.id) 
      : [...favorites, movie];

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  },

  // --- Cache Logic ---
  saveMovieCache: async (movie: Movie) => {
    await AsyncStorage.setItem(`${MOVIE_CACHE_PREFIX}${movie.id}`, JSON.stringify(movie));
  },

  getMovieCache: async (movieId: number): Promise<Movie | null> => {
    const data = await AsyncStorage.getItem(`${MOVIE_CACHE_PREFIX}${movieId}`);
    return data ? JSON.parse(data) : null;
  }
};