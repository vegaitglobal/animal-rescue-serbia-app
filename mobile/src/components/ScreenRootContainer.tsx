import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {StripedBar} from './StripedBar';

type ScreenRootContainerProps = {
  title: string;
  children: ReactNode;
};
export const ScreenRootContainer = ({
  children,
  title,
}: ScreenRootContainerProps) => (
  <View style={styles.rootContainer}>
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
    <StripedBar />
    {children}
  </View>
);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  header: {
    height: 120,
    backgroundColor: ColorPallet.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    textTransform: 'uppercase',
    color: ColorPallet.plainWhite,
  },
});
