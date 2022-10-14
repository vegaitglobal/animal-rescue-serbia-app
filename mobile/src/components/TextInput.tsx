import React from 'react';
import {
  TextInput as TextInputNative,
  TextInputProps as TextInputPropsNative,
} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

type TextInputProps = TextInputPropsNative & {};

export const TextInput = (props: TextInputProps) => {
  const styleOverrideProps: TextInputPropsNative = {
    placeholderTextColor: ColorPallet.lightGray,
    style: {
      borderWidth: 3,
      borderBottomColor: ColorPallet.mediumGray,
      borderColor: ColorPallet.plainWhite,
      color: ColorPallet.plainBlack,
      textAlign: 'center',
    },
  };
  return <TextInputNative {...styleOverrideProps} {...props} />;
};
