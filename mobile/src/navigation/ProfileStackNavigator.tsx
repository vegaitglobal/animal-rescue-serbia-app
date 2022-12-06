import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackNavigatorParams} from './types';
import {ProfileUpdateScreen} from '../screens/ProfileUpdateScreen';
import {ProfileScreen} from '../screens/ProfileScreen';

export const ProfileStackNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackNavigatorParams>();

  return (
    <Stack.Navigator
      initialRouteName={'Profile'}
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdateScreen} />
    </Stack.Navigator>
  );
};
