import React, {useCallback, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ReportScreen} from '../screens/ReportScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {RootTabNavigator} from './RootTabNavigator';
import {RegistrationScreen} from '../screens/RegistrationScreen';
import {DonationScreen} from '../screens/DonationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../hooks/storeHooks';
import {
  loadLocations,
  loadViolationCategories,
} from '../store/src/reports/actions';

export const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState('');
  const dispatch = useAppDispatch();

  const loadToken = useCallback(async () => {
    const tokenLocal = await AsyncStorage.getItem('accessToken');
    setToken(tokenLocal ?? '');
  }, []);

  useEffect(() => {
    loadToken();
    dispatch(loadViolationCategories());
    dispatch(loadLocations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack.Navigator initialRouteName={token ? 'Login' : 'HomeScreen'}>
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
