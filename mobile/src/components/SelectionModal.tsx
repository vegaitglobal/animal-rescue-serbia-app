import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {EmptySpace} from './EmptySpace';
import {Separator} from './Separator';
import Close from '../assets/icons/close.svg';
import {IconButton} from './IconButton';
import {BottomSheetModal, BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {ItemData} from './commonTypes';

type SelectionModalProps = {
  data: ItemData[];
  myRef: React.Ref<BottomSheetModalMethods>;
  onShouldClose: () => void;
  onValueSelected: (selectedItem: ItemData) => void;
};

export const SelectionModal = ({
  data,
  myRef,
  onShouldClose,
  onValueSelected,
}: SelectionModalProps) => {
  const handleItemSelected = (item: ItemData) => () => {
    onValueSelected(item);
    onShouldClose();
  };

  const renderItem = ({item}: {item: ItemData}) => (
    <Pressable onPress={handleItemSelected(item)}>
      <View style={style.itemRootContainer}>
        <Text style={style.itemText}>{item.label}</Text>
      </View>
    </Pressable>
  );

  const dynamicModalSnappingPoint =
    data.length * listElementHeight + verticalListPadding * 2 + 30 + iconSize;

  const guarderDynamicModalSnappingPoint =
    dynamicModalSnappingPoint < maxModalSnappingPoint
      ? dynamicModalSnappingPoint
      : maxModalSnappingPoint;

  return (
    <BottomSheetModal
      containerStyle={{backgroundColor: ColorPallet.lightGray}}
      enableDismissOnClose
      ref={myRef}
      enablePanDownToClose
      snapPoints={[guarderDynamicModalSnappingPoint]}>
      <IconButton
        onPress={onShouldClose}
        contentContainerStyle={style.closeButton}>
        <Close width={iconSize} height={iconSize} />
      </IconButton>

      <EmptySpace height={verticalListPadding} />

      <BottomSheetFlatList
        data={data}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator />}
        ListHeaderComponent={<Separator />}
        ListFooterComponent={<Separator />}
      />

      <EmptySpace height={verticalListPadding} />
    </BottomSheetModal>
  );
};

const verticalListPadding = 60;
const listElementHeight = 60;
const maxModalSnappingPoint = 500;
const iconSize = 30;

const style = StyleSheet.create({
  closeButton: {
    paddingLeft: 10,
    width: 50,
  },
  itemRootContainer: {
    height: listElementHeight,
    justifyContent: 'center',
  },
  itemText: {
    color: ColorPallet.mediumGray,
    textAlign: 'center',
  },
});
