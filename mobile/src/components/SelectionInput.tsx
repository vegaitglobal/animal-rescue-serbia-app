import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {Chevron, Orientation} from './Chevron';
import {commonStyles} from './commonStyles';
import {ItemData} from './commonTypes';
import {SelectionModal} from './SelectionModal';
import {TextInput} from './TextInput';

type SelectionInputProps = {
  data: ItemData[];
  placeholderLabel: string;
  onValueSelected: (selectedItem: ItemData) => void;
};
export const SelectionInput = ({
  data,
  placeholderLabel,
  onValueSelected,
}: SelectionInputProps) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [selectedValue, setSelectedValue] = useState<string>();

  const closeModal = useCallback(() => sheetRef.current?.close(), []);

  const onPress = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const onModalValueSelected = useCallback(
    (selectedItem: ItemData) => {
      setSelectedValue(selectedItem.label);
      onValueSelected(selectedItem);
    },
    [onValueSelected],
  );

  return (
    <>
      <SelectionModal
        data={data}
        myRef={sheetRef}
        onShouldClose={closeModal}
        onValueSelected={onModalValueSelected}
      />
      <Pressable onPress={onPress}>
        <View style={style.inputContainer}>
          <TextInput
            value={selectedValue}
            placeholder={placeholderLabel}
            editable={false}
            selectTextOnFocus={false}
            style={[commonStyles.inputField, style.input]}
          />
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
  },
  chevronContainer: {
    position: 'absolute',
    right: 5,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
});
