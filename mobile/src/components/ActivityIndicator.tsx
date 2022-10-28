import React from 'react';
import {ActivityIndicator as ActivityIndicatorNative} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

export const ActivityIndicator = () => (
  <ActivityIndicatorNative
    size={'large'}
    color={ColorPallet.plainBlack}
    style={{flex: 1}}
  />
);
