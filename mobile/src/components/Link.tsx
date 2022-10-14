import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

export const Link = ({text, onPress}: {text: string; onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export const style = StyleSheet.create({
  text: {
    color: ColorPallet.plainWhite,
    fontSize: 18,
  },
});
