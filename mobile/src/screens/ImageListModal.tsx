import {BottomSheetFlatList, BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {useCallback} from 'react';
import {Dimensions, Image, ListRenderItemInfo, StyleSheet} from 'react-native';
import {EmptySpace} from '../components/EmptySpace';
import {ColorPallet} from '../resources/ColorPallet';

type DataItem = {
  id: string;
  fullPath: string;
};

type ImageListModalProps = {
  myRef: React.Ref<BottomSheetModalMethods>;
  data: DataItem[];
};

// TODO: Dynamic modal height based on content
export const ImageListModal = ({myRef, data}: ImageListModalProps) => {
  const renderItem = useCallback(
    ({item: {id, fullPath}}: ListRenderItemInfo<DataItem>) => (
      <Image
        key={id}
        style={styles.image}
        source={{
          uri: fullPath,
        }}
      />
    ),
    [],
  );

  //TODO: Backdrop blockage, close button and unified component for behavior
  //TODO: Block back navigation
  return (
    <BottomSheetModal ref={myRef} snapPoints={[800]}>
      <BottomSheetFlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <EmptySpace height={8} />}
        ListFooterComponent={() => <EmptySpace height={20} />}
      />
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: ColorPallet.gray,
    width: '100%',
    height: Dimensions.get('screen').width / (16 / 9),
  },
});
