import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {SomeScreen} from '../screens/SomeScreen';

export const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Some" component={SomeScreen} />
    </Stack.Navigator>
  );
};
