import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

export type AccentedTextBoxProps = {
  title?: string;
  children: string;
  onPress?: () => void;
  rightSideElement?: React.ReactElement;
};

export const AccentedTextBox = ({
  children: textContent,
  title,
  onPress,
  rightSideElement,
}: AccentedTextBoxProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {title ? <Text style={styles.titleText}>{title}</Text> : null}
      <View style={[styles.yellowContainer, {flexDirection: 'row'}]}>
        <Text style={styles.contentText}>{textContent}</Text>
        {rightSideElement}
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  yellowContainer: {
    height: 50,
    backgroundColor: ColorPallet.yellow,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5,
  },
  contentText: {
    fontWeight: '600',
  },
});
