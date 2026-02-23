import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import { Image } from 'expo-image';
import { MovieService } from '../services/movieService';
import { Movie } from '../types/movie';
import { StorageService } from '../api/storage';
import Ionicons from '@expo/vector-icons/Ionicons'; 

export default function DetailsScreen({ route }: any) {
  const { movieId } = route.params; 
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // 1. Check Favorites State (Async)
        const favorites = await StorageService.getFavorites();
        setIsFavorite(favorites.some((m) => m.id === movieId));

        // 2. Offline-First: Check cache instantly
        const cachedData = await StorageService.getMovieCache(movieId);
        if (cachedData) {
          setMovie(cachedData);
          setLoading(false); 
        }

        // 3. Network Fetch
        const freshData = await MovieService.getMovieDetails(movieId);
        setMovie(freshData);
        
        // 4. Update Cache
        await StorageService.saveMovieCache(freshData);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  // Handle Toggle (Must be async for AsyncStorage)
  const handleToggleFavorite = async () => {
    if (movie) {
      await StorageService.toggleFavorite(movie);
      setIsFavorite(!isFavorite);
    }
  };

  if (loading && !movie) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  if (!movie) return <View style={styles.center}><Text>Movie not found</Text></View>;

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w780${movie.poster_path}` }} 
        style={styles.backdrop}
        contentFit="cover"
        transition={600}
      />
      
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{movie.title}</Text>
          <TouchableOpacity 
            onPress={handleToggleFavorite} 
            activeOpacity={0.6}
            style={styles.favoriteBtn}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={32} 
              color={isFavorite ? "#e74c3c" : "#2c3e50"} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.date}>📅 {movie.release_date}</Text>
          <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)} / 10</Text>
        </View>

        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backdrop: { width: '100%', height: 300, backgroundColor: '#000' },
  content: { 
    padding: 20, 
    marginTop: -20, 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24 
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1a1a1a', flex: 1, marginRight: 15 },
  favoriteBtn: { padding: 4 },
  metaRow: { flexDirection: 'row', marginBottom: 20, gap: 15 },
  date: { fontSize: 14, color: '#666', fontWeight: '500' },
  rating: { fontSize: 14, fontWeight: 'bold', color: '#f1c40f' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  overview: { fontSize: 16, lineHeight: 24, color: '#444', textAlign: 'justify' }
});