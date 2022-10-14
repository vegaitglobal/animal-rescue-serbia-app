import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SosScreen} from '../screens/SosScreen';
import {HomeStackNavigator} from './HomeStackNavigator';

export const RootTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Sos"
        component={SosScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
