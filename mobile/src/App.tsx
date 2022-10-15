import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {RootTabNavigator as RootTabNavigator} from './navigation/RootTabNavigator';

const App = () => (
  <NavigationContainer>
    <StatusBar hidden />
    <RootTabNavigator />
  </NavigationContainer>
);

export default App;
