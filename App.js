import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';

import Home from './screens/Home.js';
import Login from './screens/Login.js';

const Stack = createNativeStackNavigator()

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Nunito': require('./assets/fonts/static/Nunito-SemiBold.ttf'),
      });
      setFontLoaded(true)
    }
    
    // Chame a função loadFonts no início do seu aplicativo
    loadFonts();
  }, [])

  if (fontLoaded)
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}