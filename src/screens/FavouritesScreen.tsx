import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { MovieCard } from '../components/MovieCard';
import { Movie } from '../types/movie';

const FavouritesScreen = ({ navigation }: any) => {
  const { favorites } = useFavorites();

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieCard
      movie={item}
      onPress={() => navigation.navigate('Details', { movieId: item.id, title: item.title })}
    />
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.title}>No Favourites Yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavouritesScreen;
