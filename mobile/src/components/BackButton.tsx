import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import BackChevron from '../assets/icons/backChevron.svg';
import {EmptySpace} from './EmptySpace';

export const BackButton = ({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.rootContainer}>
        <BackChevron color={ColorPallet.yellow} height={15} width={15} />
        <EmptySpace width={5} />
        <Text style={style.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const style = StyleSheet.create({
  text: {
    color: ColorPallet.plainWhite,
    fontSize: 18,
  },
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
