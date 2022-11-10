import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

const boxHeight = 18;
const boxWidth = 20;

const Box = ({color}: {color: string}) => (
  <View style={[style2.box, {backgroundColor: color, marginEnd: boxWidth}]} />
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

  const numberOfSegments = useMemo(
    () => Math.round(width / boxWidth) + 20,
    [width],
  );

  console.log('NUMBER OF SEGMENTS: ', numberOfSegments);
  const spacingLeft = useMemo(() => new Animated.Value(0), []);

  const runLoadingAnimationRecursively = useCallback(() => {
    spacingLeft.setValue(0);

    Animated.timing(spacingLeft, {
      toValue: 1,
      duration: 1200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(runLoadingAnimationRecursively);
  }, [spacingLeft]);

  useEffect(() => {
    runLoadingAnimationRecursively();
  }, [runLoadingAnimationRecursively, spacingLeft]);

  const currentPaddingLeft = spacingLeft.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 40],
  });

  return (
    <View onLayout={onLayout}>
      <Animated.View style={{transform: [{translateX: currentPaddingLeft}]}}>
        <View style={[style.itemListContainer, {backgroundColor}]}>
          {[...Array(numberOfSegments).keys()].map((_, index) => (
            <Box key={index} color={ColorPallet.yellow} />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  itemListContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    height: boxHeight,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: -50,
  },
});

const style2 = StyleSheet.create({
  box: {
    width: boxWidth,
    height: boxHeight + 30,
    transform: [{rotate: '30deg'}],
  },
});
