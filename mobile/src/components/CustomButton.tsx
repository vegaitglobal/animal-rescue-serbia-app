import React, {useMemo} from 'react';
import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

type CustomButtonProps = {
  text?: string;
  isSmall: boolean;
  onPress: () => void;
  isWhite?: boolean;
};
export const CustomButton = ({text, isSmall, onPress}: CustomButtonProps) => {
  const dynamicStyle = useMemo(
    () => ({
      item: {
        alignSelf: isSmall ? 'flex-start' : 'stretch',
        paddingHorizontal: isSmall ? 40 : 0,
        height: isSmall ? 40 : 50,
      },
      font: {
        fontSize: isSmall ? 14 : 18,
      },
    }),
    [isSmall],
  );

  return (
    <Pressable
      style={[
        styles.buttonContainer,
        dynamicStyle.item as StyleProp<ViewStyle>,
      ]}
      onPress={onPress}>
      <Text style={[styles.text, dynamicStyle.font]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: ColorPallet.yellow,
  },
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
    alignSelf: 'center',
    fontWeight: '600',
  },
});
