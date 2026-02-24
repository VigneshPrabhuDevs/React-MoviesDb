import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { getFavoriteMovies, storeFavoriteMovies } from '../api/storage';

interface FavoritesContextData {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movie: Movie) => void;
  isFavorite: (movie: Movie) => boolean;
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const favoriteMovies = await getFavoriteMovies();
      setFavorites(favoriteMovies);
    };
    loadFavorites();
  }, []);

  const addFavorite = (movie: Movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    storeFavoriteMovies(newFavorites);
  };

  const removeFavorite = (movie: Movie) => {
    const newFavorites = favorites.filter((fav) => fav.id !== movie.id);
    setFavorites(newFavorites);
    storeFavoriteMovies(newFavorites);
  };

  const isFavorite = (movie: Movie) => {
    return favorites.some((fav) => fav.id === movie.id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
