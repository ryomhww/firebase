import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import { FavoriteProvider } from '../components/FavoriteContext'; // Impor FavoriteProvider

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <FavoriteProvider> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="FavoriteScreen"
            component={FavoriteScreen}
            options={{ title: 'Favorites' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>
  );
};

export default MainNavigator;
