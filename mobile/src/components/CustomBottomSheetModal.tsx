import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import React, {ReactNode, useCallback} from 'react';
import {ColorPallet} from '../resources/ColorPallet';
import {IconButton} from './IconButton';
import Close from '../assets/icons/close.svg';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import Animated from 'react-native-reanimated';
import {Pressable, StyleSheet} from 'react-native';

type CustomBottomSheetModalProps = Omit<
  BottomSheetModalProps,
  'ref' | 'children'
> & {
  myRef: React.Ref<BottomSheetModalMethods>;
  onShouldClose: () => void;
  children: ReactNode;
  onVisibilityChange: (isShown: boolean) => void;
};

export const CustomBottomSheetModal = ({
  children,
  myRef,
  onShouldClose,
  snapPoints,
  onVisibilityChange,
}: CustomBottomSheetModalProps) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <Animated.View style={props.style}>
        <Pressable style={style.pressableBackdrop} onPress={onShouldClose} />
      </Animated.View>
    ),
    [onShouldClose],
  );

  const handleOnChange = useCallback(
    (index: number) => onVisibilityChange(index === 0),
    [onVisibilityChange],
  );

  return (
    <BottomSheetModal
      onChange={handleOnChange}
      containerStyle={{backgroundColor: ColorPallet.lightGray}}
      enableDismissOnClose
      ref={myRef}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}>
      <IconButton
        onPress={onShouldClose}
        contentContainerStyle={style.closeButton}>
        <Close width={iconSize} height={iconSize} />
      </IconButton>
      {children}
    </BottomSheetModal>
  );
};

const iconSize = 30;
const style = StyleSheet.create({
  pressableBackdrop: {
    flex: 1,
  },
  closeButton: {
    paddingLeft: 10,
    width: 50,
  },
});
