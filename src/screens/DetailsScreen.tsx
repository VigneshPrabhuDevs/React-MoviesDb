import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { MovieService } from '../services/movieService';
import { Movie } from '../types/movie';

export default function DetailsScreen({ route }: any) {
  const { movieId } = route.params; // The ID you passed from HomeScreen
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await MovieService.getMovieDetails(movieId);
        setMovie(data);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (!movie) return <Text>Movie not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w780${movie.poster_path}` }} 
        style={styles.backdrop}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.date}>Released: {movie.release_date}</Text>
        <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)} / 10</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center' },
  backdrop: { width: '100%', height: 250 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  date: { fontSize: 14, color: '#666', marginBottom: 5 },
  rating: { fontSize: 16, fontWeight: '600', color: '#f1c40f', marginBottom: 15 },
  overview: { fontSize: 16, lineHeight: 24, color: '#333' }
});