import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {RootStackNavigator} from './navigation/RootStackNavigator';

const App = () => (
  <NavigationContainer>
    <RootStackNavigator />
  </NavigationContainer>
);

export default App;
