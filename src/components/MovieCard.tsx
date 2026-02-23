import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Movie } from '../types/movie';

interface Props {
  movie: Movie;
  onPress: () => void;
}

export const MovieCard = ({ movie, onPress }: Props) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
    <Image 
      source={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
      style={styles.poster}
      contentFit="cover"
      transition={500}
    />
    <View style={styles.info}>
      <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
      <Text style={styles.overview} numberOfLines={3}>{movie.overview}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    marginBottom: 16, 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    overflow: 'hidden', 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: { width: 100, height: 150 },
  info: { flex: 1, padding: 12, justifyContent: 'center' },
  movieTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  overview: { color: '#666', marginTop: 6, fontSize: 14, lineHeight: 18 }
});