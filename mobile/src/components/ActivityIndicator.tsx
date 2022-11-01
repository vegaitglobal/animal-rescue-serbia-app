import React from 'react';
import {
  ActivityIndicator as ActivityIndicatorNative,
  StyleSheet,
} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

export const ActivityIndicator = () => (
  <ActivityIndicatorNative
    size={'large'}
    color={ColorPallet.plainBlack}
    style={styles.indicator}
  />
);

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
  },
});
