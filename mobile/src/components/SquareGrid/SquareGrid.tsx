import React, {ReactElement, useCallback} from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {ColorPallet} from '../../resources/ColorPallet';
import {Separator} from '../Separator';

const SquareCell = ({
  style,
  columnIndex,
  rowIndex,
  onPress,
  icon,
}: {
  columnIndex: number;
  rowIndex: number;
  icon: ReactElement;
  onPress: (rowIndex: number, columnIndex: number) => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const onPressLocal = useCallback(
    () => onPress(rowIndex, columnIndex),
    [columnIndex, onPress, rowIndex],
  );

  return (
    <Pressable style={styles.squareCellRootContainer} onPress={onPressLocal}>
      <View style={[styles.squareCellIconContainer, style]}>{icon}</View>
    </Pressable>
  );
};

const SquareRow = ({
  rowIndex,
  onPress,
  icons,
}: {
  rowIndex: number;
  onPress: (rowIndex: number, columnIndex: number) => void;
  icons: ReactElement[];
}) => (
  <View style={styles.squareRowRootContainer}>
    <SquareCell
      columnIndex={0}
      rowIndex={rowIndex}
      onPress={onPress}
      icon={icons[0]}
    />
    <Separator vertical color={ColorPallet.plainBlack} />
    <SquareCell
      columnIndex={1}
      rowIndex={rowIndex}
      onPress={onPress}
      icon={icons[1]}
    />
  </View>
);

export const SquareGrid = ({
  size,
  onPress,
  icons,
}: {
  size: number;
  onPress: (rowIndex: number, columnIndex: number) => void;
  icons: ReactElement[][];
}) => (
  <View style={{width: size, height: size}}>
    <SquareRow rowIndex={0} onPress={onPress} icons={icons[0]} />
    <Separator color={ColorPallet.plainBlack} />
    <SquareRow rowIndex={1} onPress={onPress} icons={icons[1]} />
  </View>
);

const styles = StyleSheet.create({
  squareCellRootContainer: {
    flex: 1,
  },
  squareCellIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareRowRootContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
