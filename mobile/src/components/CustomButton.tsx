import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

type CustomButtonProps = {
  text?: string;
  isSmall?: boolean;
  onPress?: () => void;
  isWhite?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  disabled?: boolean;
};
export const CustomButton = ({
  text,
  isSmall,
  onPress,
  style,
  textStyle,
  isLoading,
  disabled,
}: CustomButtonProps) => {
  const dynamicStyle = useMemo(
    () => ({
      item: {
        alignSelf: isSmall ? 'flex-start' : 'stretch',
        paddingHorizontal: isSmall ? 20 : 0,
        height: isSmall ? 40 : 50,
        backgroundColor: disabled ? ColorPallet.lightGray : ColorPallet.yellow,
      } as ViewStyle,
      font: {
        fontSize: isSmall ? 14 : 18,
      },
    }),
    [disabled, isSmall],
  );

  return (
    <Pressable
      disabled={disabled}
      style={[styles.buttonContainer, dynamicStyle.item as ViewStyle, style]}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.text, dynamicStyle.font, textStyle]}>{text}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
