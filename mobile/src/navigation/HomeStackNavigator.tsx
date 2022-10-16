import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ReportScreen} from '../screens/ReportScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {RootTabNavigator} from './RootTabNavigator';
import {RegistrationScreen} from '../screens/RegistrationScreen';
import {DonationScreen} from '../screens/DonationScreen';

export const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={RootTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Donation"
        component={DonationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
