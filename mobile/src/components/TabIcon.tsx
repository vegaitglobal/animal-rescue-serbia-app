import React, {ReactElement} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

export type TabIconProps = {
  focused: boolean;
  color: string;
  size: number;
  activeIcon: ReactElement;
  inactiveIcon: ReactElement;
  iconContainerStyle?: StyleProp<ViewStyle>;
};

//TODO: Implement mapping icons with props
export const TabIcon = ({
  focused,
  activeIcon,
  inactiveIcon,
  iconContainerStyle,
}: TabIconProps) => (
  <View style={iconContainerStyle}>{focused ? activeIcon : inactiveIcon}</View>
);
