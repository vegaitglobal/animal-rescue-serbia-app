import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {TextInput} from 'react-native-gesture-handler';

type MultilineTextInputProps = {
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
};
export const MultilineTextInput = ({
  placeholder,
  style,
  onChangeText,
}: MultilineTextInputProps) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      style={[styles.container, style]}
      placeholder={placeholder}
      multiline
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    fontSize: 16,
    width: '90%',
    borderColor: ColorPallet.lightGray,
    borderWidth: 2,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});
