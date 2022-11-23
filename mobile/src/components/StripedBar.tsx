import React, {useCallback, useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

const boxHeight = 18;
const boxWidth = 20;

const Box = ({color}: {color: string}) => (
  <View style={[style2.box, {backgroundColor: color, marginEnd: boxWidth}]} />
);

export const StripedBar = ({
  backgroundColor = ColorPallet.gray,
  width,
}: {
  backgroundColor?: string;
  width?: number;
}) => {
  const [dynamicWidth, setDynamicWidth] = useState(width ?? 0);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => setDynamicWidth(e.nativeEvent.layout.width),
    [],
  );

  const numberOfSegments = useMemo(
    () => Math.round(dynamicWidth / boxWidth),
    [dynamicWidth],
  );

  return (
    <View onLayout={width ? undefined : onLayout}>
      <View style={[style.itemListContainer, {backgroundColor}]}>
        {[...Array(numberOfSegments).keys()].map((_, index) => (
          <Box key={index} color={ColorPallet.yellow} />
        ))}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  itemListContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    height: boxHeight,
    alignItems: 'center',
  },
});

const style2 = StyleSheet.create({
  box: {
    width: boxWidth,
    height: boxHeight + 30,
    transform: [{rotate: '30deg'}],
  },
});
