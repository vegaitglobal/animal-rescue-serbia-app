import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useAppDispatch} from '../hooks/storeHooks';
import {ColorPallet} from '../resources/ColorPallet';
import {
  loadLocations,
  loadViolationCategories,
} from '../store/src/reports/actions';
import AnimatedEllipsis from '../../libs/react-native-animated-ellipsis/src/AnimatedEllipsis';

export const SplashScreenRN = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [dynamicMessage, setDynamicMessage] = useState('');

  // TODO: 401 still redirects
  const checkTokenAndPrefetch = useCallback(async () => {
    const token = await AsyncStorage.getItem('accessToken'); //TODO: Try using/creating auth manager
    SplashScreen.hide();
    if (!token) {
      navigation.replace('Login');
      return;
    }

    setDynamicMessage('Proveravamo kredencijale');

    // These are prefetched because they are static and because
    // we check token validity that way
    const categoryResult = await dispatch(loadViolationCategories());

    if (categoryResult.meta.requestStatus === 'rejected') {
      return;
    }

    setDynamicMessage('Ucitavamo podatke');
    const locationResult = await dispatch(loadLocations());

    if (locationResult.meta.requestStatus === 'rejected') {
      return;
    }

    navigation.replace('HomeScreen');
  }, [dispatch, navigation]);

  useEffect(() => {
    checkTokenAndPrefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: ColorPallet.plainWhite,
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{width: 300, height: 300}}
          source={require('../assets/icons/splashLogo.png')}
        />
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: -50,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16}}>{dynamicMessage}</Text>
          <AnimatedEllipsis style={{justifyContent: 'flex-end'}} />
        </View>
      </View>
    </View>
  );
};
