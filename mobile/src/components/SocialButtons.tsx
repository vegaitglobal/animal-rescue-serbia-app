import React, {ReactElement} from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {bind} from '../util/helpers';

type IconData<T extends unknown> = {
  id: T;
  icon: ReactElement;
};

export type SocialButtonsProps<T extends unknown> = {
  onPress: (id: T) => void;
  icons: IconData<T>[];
  bubbleSize?: number;
  style?: StyleProp<ViewStyle>;
};

export const SocialButtons = <T extends unknown>({
  icons,
  onPress,
  bubbleSize = 52,
  style,
}: SocialButtonsProps<T>) => {
  return (
    <View style={[styles.iconsContainer, style]}>
      {icons?.map(({icon, id}) => (
        <Pressable
          key={id?.toString() ?? ''}
          onPress={bind(id, onPress)}
          style={[
            styles.pressableContainer,
            {
              width: bubbleSize,
              height: bubbleSize,
              borderRadius: bubbleSize / 2,
            },
          ]}>
          {icon}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pressableContainer: {
    backgroundColor: ColorPallet.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
