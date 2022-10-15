import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import Check from '../assets/icons/check.svg';

export const Checkbox = ({
  style,
  onCheck,
}: {
  style?: any;
  onCheck?: () => void;
  linkText?: string;
  onPress?: () => void;
}) => {
  const [checked, setChecked] = useState(false);

  const handleOnPress = () => {
    setChecked(!checked);
    onCheck!();
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.pressable} onPress={handleOnPress}>
        {checked ? (
          <View style={styles.checkedCheckbox}>
            <Check width={20} height={20} />
          </View>
        ) : (
          <View style={styles.uncheckedCheckbox} />
        )}
      </Pressable>
      <Text style={styles.text}>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: ColorPallet.lightGray,
    fontSize: 18,
  },
  checkedCheckbox: {
    borderColor: ColorPallet.lightGray,
    borderWidth: 2,
    width: 35,
    height: 35,
    borderRadius: 6,
    backgroundColor: ColorPallet.plainWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },

  uncheckedCheckbox: {
    borderColor: ColorPallet.lightGray,
    borderWidth: 2,
    width: 35,
    height: 35,
    borderRadius: 6,
    backgroundColor: ColorPallet.plainWhite,
  },
  pressable: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
