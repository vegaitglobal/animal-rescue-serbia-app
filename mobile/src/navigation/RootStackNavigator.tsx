import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ReportScreen} from '../screens/ReportScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {TabNavigator} from './TabNavigator';
import {RegistrationScreen} from '../screens/RegistrationScreen';
import {DonationScreen} from '../screens/DonationScreen';
import {SplashScreenRN} from '../screens/SplashScreenRN';

export const RootStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{headerShown: false, animation: 'none'}}>
      <Stack.Screen name="Splash" component={SplashScreenRN} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="HomeScreen" component={TabNavigator} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="Donation" component={DonationScreen} />
    </Stack.Navigator>
  );
};
