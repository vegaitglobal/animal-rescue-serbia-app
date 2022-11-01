import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {BackHandler} from 'react-native';

// Return boolean indicating wether to block back navigation or not
export const useAndroidBackNavigationOverride = (
  onBackPress: () => boolean,
) => {
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [onBackPress]),
  );
};
