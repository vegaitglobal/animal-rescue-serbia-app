import React, {ReactNode} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

type IconButtonProps = {
  onPress: () => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
};

export const IconButton = ({
  onPress,
  contentContainerStyle,
  children,
}: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={contentContainerStyle}>
      {children}
    </TouchableOpacity>
  );
};
