import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ReportScreen} from '../screens/ReportScreen';
import {DonationScreen} from '../screens/DonationScreen';
import {ViolationsScreen} from '../screens/ViolationsScreen';
import {InformationScreen} from '../screens/InformationScreen';
import {DonatorsAndFriends} from '../screens/DonatorsAndFriends';
import {ArsInfoScreen} from '../screens/ArsInfoScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {RootStackNavigatorParams} from './types';

export const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackNavigatorParams>();

  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="Violations" component={ViolationsScreen} />
      <Stack.Screen name="Donation" component={DonationScreen} />
      <Stack.Screen name="Information" component={InformationScreen} />
      <Stack.Screen name="DonatorsAndFriends" component={DonatorsAndFriends} />
      <Stack.Screen name="ArsInfo" component={ArsInfoScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="Donation" component={DonationScreen} />
    </Stack.Navigator>
  );
};
