import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const GridIcon = ({
  label,
  children,
}: {
  label: string;
  children: ReactElement;
}) => (
  <View style={styles.rootContainer}>
    {/* //TODO: Create util to map props to children */}
    {children}
    <Text style={styles.text}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 12,
    paddingTop: 10,
    fontWeight: '800',
  },
});
