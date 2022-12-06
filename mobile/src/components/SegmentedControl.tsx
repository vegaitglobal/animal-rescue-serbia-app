import React from 'react';
import {View, Pressable, Text, StyleSheet, TextStyle} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {bind} from '../util/helpers';
import {EmptySpace} from './EmptySpace';

export type Segment = 'left' | 'right';

type SegmentedControlProps = {
  activeSegment: Segment;
  onSegmentChange: (segment: Segment) => void;
  segmentNames: Record<Segment, string>;
};

export const SegmentedControl = ({
  onSegmentChange,
  activeSegment,
  segmentNames,
}: SegmentedControlProps) => {
  const leftButtonDynamicStyle: TextStyle =
    activeSegment === 'left' ? styles.activeSegmentButton : {};

  const rightButtonDynamicStyle: TextStyle =
    activeSegment === 'right' ? styles.activeSegmentButton : {};

  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={bind('left', onSegmentChange)}>
        <Text style={[styles.tabButtons, leftButtonDynamicStyle]}>
          {segmentNames.left}
        </Text>
      </Pressable>

      <EmptySpace width={10} />

      <Pressable onPress={bind('right', onSegmentChange)}>
        <Text style={[styles.tabButtons, rightButtonDynamicStyle]}>
          {segmentNames.right}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tabButtons: {
    color: ColorPallet.plainWhite,
    textTransform: 'uppercase',
  },
  activeSegmentButton: {
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 35,
    flexDirection: 'row',
    backgroundColor: ColorPallet.gray,
    justifyContent: 'center',
  },
});
