import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Adjust these paths based on where you moved your files!
import HomeScreen from './src/screens/HomeScreen'; 
import DetailsScreen from './src/screens/DetailsScreen';

import { FavoritesProvider } from './src/context/FavoritesContext';

import FavouritesScreen from './src/screens/FavouritesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#f4511e' }, // Professional touch
              headerTintColor: '#fff',
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Favourites" component={FavouritesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}