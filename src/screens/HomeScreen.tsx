import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
// 1. Import Image from expo-image instead of react-native
import { Image } from 'expo-image'; 
import { Movie } from '../types/movie';
import { MovieService } from '../services/movieService';

export default function HomeScreen({ navigation }: any) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

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

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Details', { movieId: item.id, title: item.title })}
    >
      {/* 2. Upgrade to Expo Image with transitions and caching */}
      <Image 
        source={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
        style={styles.poster}
        contentFit="cover"        // Equivalent to android:scaleType="centerCrop"
        transition={500}          // Smooth cross-fade transition (Coil-style)
        cachePolicy="disk"        // Ensures images persist across app restarts
      />
      <View style={styles.info}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.overview}>{item.overview}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        contentContainerStyle={{ padding: 10 }}
        // 3. Pro-tip: Improve scrolling performance by setting initialNumToRender
        initialNumToRender={10}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: { 
    flexDirection: 'row', 
    marginBottom: 15, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    overflow: 'hidden', 
    elevation: 3, // Android Shadow
    shadowColor: '#000', // iOS Shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: { width: 100, height: 150 },
  info: { flex: 1, padding: 12, justifyContent: 'center' },
  movieTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  overview: { color: '#666', marginTop: 6, fontSize: 14, lineHeight: 20 }
});