import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useAppDispatch} from '../hooks/storeHooks';
import {ColorPallet} from '../resources/ColorPallet';
import {
  loadLocations,
  loadViolationCategories,
} from '../store/src/reports/actions';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import {Constants} from '../Constants';
import {useHeaderHeight} from '../navigation/useHeaderHeight';

export const SplashScreenRN = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [dynamicMessage, setDynamicMessage] = useState('');

  const checkTokenAndPrefetch = useCallback(async () => {
    const token = await AsyncStorage.getItem(Constants.tokenPersistanceKey); //TODO: Try using/creating auth manager
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

    navigation.replace('TabNavigator');
  }, [dispatch, navigation]);

  useEffect(() => {
    checkTokenAndPrefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerHeight = useHeaderHeight();

  return (
    <View style={styles.rootContainer}>
      <View style={[styles.innerCenteredContainer, {marginTop: -headerHeight}]}>
        <Image
          style={styles.logo}
          source={require('../assets/icons/megaphoneLogo.png')}
        />
        <View style={styles.dynamicMessageContainer}>
          <Text style={styles.dynamicMessageText}>{dynamicMessage}</Text>
          <AnimatedEllipsis style={styles.ellipsis} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: ColorPallet.yellow, // TODO: Make sure to update backgroundColor to yellow
  },
  innerCenteredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  dynamicMessageContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -50,
    justifyContent: 'center',
  },
  dynamicMessageText: {
    fontSize: 16,
    color: ColorPallet.plainBlack,
  },
  ellipsis: {
    justifyContent: 'flex-end',
  },
});
