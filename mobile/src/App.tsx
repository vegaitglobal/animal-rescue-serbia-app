import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {RootTabNavigator as RootTabNavigator} from './navigation/RootTabNavigator';

const App = () => (
  <NavigationContainer>
    <RootTabNavigator />
  </NavigationContainer>
);

export default App;
