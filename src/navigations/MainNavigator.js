import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import LoginScreen from '../screens/authScreen/LoginScreen';
import RegisterScreen from '../screens/authScreen/RegisterScreen';
import { FavoriteProvider } from '../components/FavoriteContext';
import { ActivityIndicator, View } from 'react-native';
import AddTripScreen from '../screens/AddTripScreen';
import EditTripScreen from '../components/EditTripScreen';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Jika user ada, berarti login
    });

    return () => unsubscribe(); // Hapus listener saat komponen dilepas
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <FavoriteProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="HomeScreen"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DetailScreen"
                component={DetailScreen}
                options={{ title: 'Home' }}
              />
              <Stack.Screen
                name="AddTripScreen"
                component={AddTripScreen}
                options={{ title: 'Home' }}
              />
              <Stack.Screen
                name="EditTripScreen"
                component={EditTripScreen}
                options={{ title: 'Edit Trip' }}
              />
              <Stack.Screen
                name="FavoriteScreen"
                component={FavoriteScreen}
                options={{ title: 'Favorites' }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </FavoriteProvider>
  );
};

export default MainNavigator;
