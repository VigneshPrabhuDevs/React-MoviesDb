import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetailsScreen({ route, navigation }: any) {
  const { movieId } = route.params; // Receiving data (like Intent Extras)

  return (
    <View style={styles.center}>
      <Text style={styles.text}>Movie ID: {movieId}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 }
});