import React, {useCallback, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ReportScreen} from '../screens/ReportScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {RootTabNavigator} from './RootTabNavigator';
import {RegistrationScreen} from '../screens/RegistrationScreen';
import {DonationScreen} from '../screens/DonationScreen';
import {SplashScreenRN} from '../screens/SplashScreenRN';

export const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'Splash'}>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreenRN} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="HomeScreen" component={RootTabNavigator} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Donation" component={DonationScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
