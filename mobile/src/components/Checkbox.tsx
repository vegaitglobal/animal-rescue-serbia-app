import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import Check from '../assets/icons/check.svg';
import {Link} from './Link';

export const Checkbox = ({
  style,
  onCheck,
  linkText,
  onPress,
}: {
  onPress: () => void;
  style?: any;
  onCheck?: (checked: boolean) => void;
  linkText?: string;
}) => {
  const [checked, setChecked] = useState(false);

  const handleOnPress = () => {
    const newState = !checked;
    setChecked(newState);
    onCheck?.(newState);
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.pressable} onPress={handleOnPress}>
        {checked ? (
          <View style={styles.checkedCheckbox}>
            <Check width={15} height={15} />
          </View>
        ) : (
          <View style={styles.uncheckedCheckbox} />
        )}
      </Pressable>
      <Link textStyle={styles.text} onPress={onPress}>
        {linkText}
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginStart: 15,
  },
  checkedCheckbox: {
    borderColor: ColorPallet.lightGray,
    borderWidth: 2,
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: ColorPallet.plainWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },

  uncheckedCheckbox: {
    borderColor: ColorPallet.lightGray,
    borderWidth: 2,
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: ColorPallet.plainWhite,
  },
  pressable: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
