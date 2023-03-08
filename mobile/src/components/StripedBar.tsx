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
  isAnimating = false,
  backgroundColor = ColorPallet.gray,
  width,
}: {
  isAnimating?: boolean;
  backgroundColor?: string;
  width?: number;
}) => {
  const [dynamicWidth, setDynamicWidth] = useState(width ?? 0);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => setDynamicWidth(e.nativeEvent.layout.width),
    [],
  );

  const numberOfSegments = useMemo(
    () => Math.round(dynamicWidth / boxWidth) + 20,
    [dynamicWidth],
  );

  const spacingLeft = new Animated.Value(0);

  const runLoadingAnimationRecursively = () => {
    spacingLeft.setValue(0);

    Animated.loop(
      Animated.timing(spacingLeft, {
        toValue: 10,
        duration: 330,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    if (isAnimating) {
      runLoadingAnimationRecursively();
      return;
    }

    spacingLeft.stopAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spacingLeft, isAnimating]);

  const currentPaddingLeft = spacingLeft.interpolate({
    inputRange: [0, 10],
    outputRange: [0, 40],
  });

  return (
    <View onLayout={width ? undefined : onLayout}>
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
