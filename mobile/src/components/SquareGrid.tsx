import React, {ReactElement, useCallback} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {Separator} from './Separator';

export const GridIcon = ({
  label,
  children,
}: {
  label: string;
  children: ReactElement;
}) => (
  <View style={{alignItems: 'center', justifyContent: 'center'}}>
    {/* //TODO: Create util to map props to children */}
    {children}
    <Text style={styles.text}>{label}</Text>
  </View>
);

const Square = ({
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
    <Pressable style={{flex: 1}} onPress={onPressLocal}>
      <View
        style={[
          {flex: 1, alignItems: 'center', justifyContent: 'center'},
          style,
        ]}>
        {icon}
      </View>
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
  <View style={{flex: 1, flexDirection: 'row'}}>
    <Square
      columnIndex={0}
      rowIndex={rowIndex}
      onPress={onPress}
      icon={icons[0]}
    />
    <Separator vertical color={ColorPallet.plainBlack} />
    <Square
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
  text: {
    textTransform: 'uppercase',
    fontSize: 12,
    paddingTop: 10,
    fontWeight: '800',
  },
});
