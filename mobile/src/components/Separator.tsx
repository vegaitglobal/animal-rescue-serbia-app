import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

type SeparatorProps = {
  vertical?: boolean;
};
export const Separator = ({vertical}: SeparatorProps) => {
  const dynamicSeparatorPosition = useMemo(
    () => (vertical ? styles.verticalSeparator : styles.horizontalSeparator),
    [vertical],
  );
  return <View style={dynamicSeparatorPosition} />;
};

const styles = StyleSheet.create({
  horizontalSeparator: {
    borderBottomColor: ColorPallet.lightGray,
    borderBottomWidth: 1,
  },
  verticalSeparator: {
    borderStartColor: ColorPallet.lightGray,
    borderStartWidth: 1,
  },
});
