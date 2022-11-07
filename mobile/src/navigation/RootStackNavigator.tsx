import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen';
import {TabNavigator} from './TabNavigator';
import {RegistrationScreen} from '../screens/RegistrationScreen';
import {SplashScreenRN} from '../screens/SplashScreenRN';
import {RootStackNavigatorParams} from './types';

export const RootStackNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackNavigatorParams>();

  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{headerShown: false, animation: 'none'}}>
      <Stack.Screen name="Splash" component={SplashScreenRN} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};
