import React from 'react';
import {View} from 'react-native';

export const EmptySpace = ({
  height,
  width,
}: {
  height?: number;
  width?: number;
}) => <View style={{height, width}} />;
