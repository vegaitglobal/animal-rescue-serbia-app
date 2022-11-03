import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

type AccentedTextBoxProps = {
  children: string;
};

export const AccentedTextBox = ({children}: AccentedTextBoxProps) => {
  return (
    <View style={styles.yellowContainer}>
      <Text>{children}</Text>
    </View>
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
});
