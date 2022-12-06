import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useRef, useState} from 'react';
import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import {useAndroidBackNavigationOverride} from '../hooks/useAndroidBackNavigationOverride';
import {ColorPallet} from '../resources/ColorPallet';
import {Chevron, Orientation} from './Chevron';
import {ItemData} from './commonTypes';
import {SelectionModal} from './SelectionModal';

type SelectionInputProps = {
  data: ItemData[];
  placeholderLabel: string;
  onValueSelected: (selectedItem: ItemData) => void;
  handleClearFilter?: () => void;
  hasFilter?: boolean;
};
export const SelectionInput = ({
  data,
  placeholderLabel,
  onValueSelected,
  handleClearFilter,
  hasFilter,
}: SelectionInputProps) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = useCallback(() => sheetRef.current?.close(), []);

  const onPress = useCallback(() => {
    Keyboard.dismiss(); //Make sure to close soft keyboard
    sheetRef.current?.present();
  }, []);

  const onModalValueSelected = useCallback(
    (selectedItem: ItemData) => {
      setSelectedValue(selectedItem.label);
      onValueSelected(selectedItem);
    },
    [onValueSelected],
  );

  useAndroidBackNavigationOverride(() => {
    if (!isModalVisible) {
      return false;
    }
    sheetRef.current?.close();
    return true;
  });

  const onClearFilter = () => {
    handleClearFilter && handleClearFilter();
    setSelectedValue('');
    closeModal();
  };

  return (
    <>
      <SelectionModal
        data={data}
        myRef={sheetRef}
        onShouldClose={closeModal}
        onValueSelected={onModalValueSelected}
        onVisibilityChange={setIsModalVisible}
        handleClearFilter={onClearFilter}
        hasFilter={hasFilter}
      />
      <Pressable onPress={onPress}>
        <View style={style.inputContainer}>
          <Text
            style={[
              style.input,
              {
                color: selectedValue
                  ? ColorPallet.plainBlack
                  : ColorPallet.lightGray,
              },
            ]}>
            {selectedValue ? selectedValue : placeholderLabel}
          </Text>
          <View style={style.chevronContainer}>
            <Chevron
              orientation={Orientation.Forward}
              color={ColorPallet.mediumGray}
            />
          </View>
        </View>
      </Pressable>
    </>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 50,
    borderBottomWidth: 3,
    borderBottomColor: ColorPallet.mediumGray,
  },
  chevronContainer: {
    position: 'absolute',
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: ColorPallet.plainBlack,
  },
});
