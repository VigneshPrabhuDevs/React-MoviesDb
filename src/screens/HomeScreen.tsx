import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
// 1. Import your new custom component
import { MovieCard } from '../components/MovieCard';
import { Movie } from '../types/movie';
import { MovieService } from '../services/movieService';

export default function HomeScreen({ navigation }: any) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Favourites')}
          title="Favourites"
          color="#fff"
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await MovieService.getPopularMovies();
      setMovies(response);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Simplified render function
  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieCard 
      movie={item} 
      onPress={() => navigation.navigate('Details', { movieId: item.id, title: item.title })} 
    />
  );

  if (loading) return <ActivityIndicator size="large" color="#f4511e" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.listContent}
        // Principal Tip: Optimization props for long lists
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  listContent: { padding: 16 }
});