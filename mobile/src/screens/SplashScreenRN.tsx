import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ActivityIndicator} from '../components/ActivityIndicator';
import {useAppDispatch} from '../hooks/storeHooks';
import {
  loadLocations,
  loadViolationCategories,
} from '../store/src/reports/actions';

export const SplashScreenRN = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  // TODO: 401 still redirects
  const checkTokenAndPrefetch = useCallback(async () => {
    const token = await AsyncStorage.getItem('accessToken'); //TODO: Try using/creating auth manager
    if (!token) {
      navigation.replace('Login');

      SplashScreen.hide();
      return;
    }

    // These are prefetched because they are static and because
    // we check token validity that way
    const categoryResult = await dispatch(loadViolationCategories());

    if (categoryResult.meta.requestStatus === 'rejected') {
      SplashScreen.hide();
      return;
    }

    const locationResult = await dispatch(loadLocations());

    if (locationResult.meta.requestStatus === 'rejected') {
      SplashScreen.hide();
      return;
    }

    navigation.replace('HomeScreen');
    SplashScreen.hide();
  }, [dispatch, navigation]);

  useEffect(() => {
    checkTokenAndPrefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ActivityIndicator />;
};
