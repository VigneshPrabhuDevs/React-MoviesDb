import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Movie Home Screen</Text>
      <Button 
        title="Go to Details" 
        onPress={() => navigation.navigate('Details', { movieId: 101 })} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 }
});