import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

type AccentedTextBoxProps = {
  title?: string;
  children: string;
  onPress?: () => void;
};

export const AccentedTextBox = ({
  children: textContent,
  title,
  onPress,
}: AccentedTextBoxProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {title ? <Text style={styles.titleText}>{title}</Text> : null}
      <View style={styles.yellowContainer}>
        <Text>{textContent}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  yellowContainer: {
    height: 50,
    backgroundColor: ColorPallet.yellow,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5,
  },
});
