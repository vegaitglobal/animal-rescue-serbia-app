import React from 'react';
import {
  ActivityIndicator as ActivityIndicatorNative,
  ActivityIndicatorProps as ActivityIndicatorPropsNative,
  StyleSheet,
} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

type ActivityIndicatorProps = ActivityIndicatorPropsNative;

export const ActivityIndicator = ({
  size = 'large',
  color = ColorPallet.plainBlack,
  style,
}: ActivityIndicatorProps) => (
  <ActivityIndicatorNative
    size={size}
    color={color}
    style={[styles.indicator, style]}
  />
);

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
  },
});
