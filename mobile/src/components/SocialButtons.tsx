import React, {ReactElement} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
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
};

export const SocialButtons = <T extends unknown>({
  icons,
  onPress,
  bubbleSize = 52,
}: SocialButtonsProps<T>) => {
  return (
    <View style={styles.iconsContainer}>
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
