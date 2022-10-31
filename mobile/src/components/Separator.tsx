import React, {useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

type SeparatorProps = {
  vertical?: boolean;
  color?: string;
};
export const Separator = ({
  vertical,
  color = ColorPallet.lightGray,
}: SeparatorProps) => {
  const dynamicSeparatorPosition: ViewStyle = useMemo(
    () =>
      vertical
        ? {...styles.verticalSeparator, borderStartColor: color}
        : {...styles.horizontalSeparator, borderBottomColor: color},
    [color, vertical],
  );
  return <View style={dynamicSeparatorPosition} />;
};

const styles = StyleSheet.create({
  horizontalSeparator: {
    borderBottomWidth: 1,
  },
  verticalSeparator: {
    borderStartWidth: 1,
  },
});
