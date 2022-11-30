import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {EmptySpace} from './EmptySpace';
import {Separator} from './Separator';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {ItemData} from './commonTypes';
import {CustomBottomSheetModal} from './CustomBottomSheetModal';

type SelectionModalProps = {
  data: ItemData[];
  myRef: React.Ref<BottomSheetModalMethods>;
  onShouldClose: () => void;
  onValueSelected: (selectedItem: ItemData) => void;
  onVisibilityChange: (isShown: boolean) => void;
  handleClearState?: () => void;
};

export const SelectionModal = ({
  data,
  myRef,
  onShouldClose,
  onValueSelected,
  onVisibilityChange,
  handleClearState,
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
    data?.length * listElementHeight + verticalListPadding * 2 + 30 + iconSize;

  const guardedDynamicModalSnappingPoint =
    dynamicModalSnappingPoint < maxModalSnappingPoint
      ? dynamicModalSnappingPoint
      : maxModalSnappingPoint;

  //TODOJM add clear btn for filter
  return (
    <CustomBottomSheetModal
      myRef={myRef}
      onShouldClose={onShouldClose}
      onVisibilityChange={onVisibilityChange}
      snapPoints={[guardedDynamicModalSnappingPoint]}>
      <EmptySpace height={verticalListPadding} />
      <Pressable style={style.clearContainer}>
        <Text>clear</Text>
      </Pressable>
      <BottomSheetFlatList
        data={data}
        keyExtractor={i => i.id ?? ''}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator />}
        ListHeaderComponent={<Separator />}
        ListFooterComponent={<Separator />}
      />

      <EmptySpace height={verticalListPadding} />
    </CustomBottomSheetModal>
  );
};

const verticalListPadding = 30;
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
  pressableBackdrop: {
    flex: 1,
  },
  clearContainer: {
    height: 25,
    borderRadius: 10,
    backgroundColor: ColorPallet.lightGray,
    width: 40,
  },
});
