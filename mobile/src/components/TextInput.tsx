import React from 'react';
import {
  TextInput as TextInputNative,
  TextInputProps as TextInputPropsNative,
} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {commonStyles} from './commonStyles';

type TextInputProps = TextInputPropsNative & {};

export const TextInput = (props: TextInputProps) => {
  return (
    <TextInputNative
      // placeholderTextColor={ColorPallet.lightGray}
      // style={commonStyles.inputField}
      {...props}
    />
  );
};
