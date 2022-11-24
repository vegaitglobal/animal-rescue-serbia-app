import React from 'react';
import {Switch as NativeSwitch, SwitchProps} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

export const Switch = (props: SwitchProps) => {
  return (
    <NativeSwitch
      {...props}
      thumbColor={
        props.value ? ColorPallet.yellow : ColorPallet.loadingBackground
      }
      trackColor={{
        true: ColorPallet.gray,
        false: ColorPallet.lightGray,
      }}
    />
  );
};
