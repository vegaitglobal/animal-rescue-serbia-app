import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

type LinkProps = {
  onPress: () => void;
  children?: string;
  textStyle?: StyleProp<TextStyle>;
};

export const Link = ({children = '', onPress, textStyle}: LinkProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.link, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: ColorPallet.lightGray,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
