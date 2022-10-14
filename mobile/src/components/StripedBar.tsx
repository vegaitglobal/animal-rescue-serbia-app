import React, {useCallback, useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

const boxHeight = 18;
const boxWidth = 20;

const Box = ({color}: {color: string}) => (
  <View style={[style2.box, {backgroundColor: color}]} />
);

export const StripedBar = ({
  backgroundColor = ColorPallet.gray,
}: {
  backgroundColor?: string;
}) => {
  const [width, setWidth] = useState(0);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width),
    [],
  );

  const numberOfSegments = useMemo(() => Math.round(width / boxWidth), [width]);

  //TODO: Make sure to use padding instead of transparent element
  return (
    <View onLayout={onLayout} style={style.rootContainer}>
      <View style={[style.itemListContainer, {backgroundColor}]}>
        {[...Array(numberOfSegments).keys()].map((_, index) => (
          <Box
            key={index}
            color={
              index % 2 === 0 ? ColorPallet.yellow : ColorPallet.transparent
            }
          />
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
  rootContainer: {
    flex: 1,
  },
});

const style2 = StyleSheet.create({
  box: {
    width: 20,
    height: boxHeight + 30,
    transform: [{rotate: '30deg'}],
  },
});
