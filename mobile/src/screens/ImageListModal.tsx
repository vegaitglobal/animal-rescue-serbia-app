import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {useCallback} from 'react';
import {Dimensions, Image, ListRenderItemInfo, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import VideoPlayer from 'react-native-video-player';
import {CustomBottomSheetModal} from '../components/CustomBottomSheetModal';
import {EmptySpace} from '../components/EmptySpace';
import {useVideoThumbnailsCreator} from '../hooks/useVideoThumbnails';
import {MediaContentDto} from '../infrastructure/apiTypes';
import {ColorPallet} from '../resources/ColorPallet';
import {isPathVideo} from '../util/helpers';

type ImageListModalProps = {
  myRef: React.Ref<BottomSheetModalMethods>;
  data: MediaContentDto[];
  onShouldClose: () => void;
  onVisibilityChange: (isShown: boolean) => void;
};

export const ImageListModal = ({
  myRef,
  data,
  onShouldClose,
  onVisibilityChange,
}: ImageListModalProps) => {
  const videoThumbnails = useVideoThumbnailsCreator(data);

  const renderItem = useCallback(
    ({item: {id, relativeFilePath}}: ListRenderItemInfo<MediaContentDto>) => {
      const fullPath = `${Config.BASE_URL}/${relativeFilePath}`;
      return isPathVideo(relativeFilePath) ? (
        <VideoPlayer
          video={{
            uri: fullPath,
          }}
          // TODO:
          onLoad={e => e.naturalSize}
          customStyles={{
            video: {backgroundColor: ColorPallet.plainBlack},
          }}
          // TODO: use getVideoMetaData from compressor lib
          // videoWidth={1600}
          // videoHeight={900}
          thumbnail={{
            uri: videoThumbnails.find(thumbnail => thumbnail.id === id)
              ?.fullPath,
          }}
        />
      ) : (
        <Image
          key={id}
          style={styles.image}
          source={{
            uri: fullPath,
          }}
        />
      );
    },
    [videoThumbnails],
  );

  const dynamicModalSnappingPoint =
    data?.length * imageHeightWithAspectRation +
    verticalListPadding * 2 +
    30 +
    iconSize +
    itemSeparatorSize +
    footerHeight;

  const guardedDynamicModalSnappingPoint =
    dynamicModalSnappingPoint < maxModalSnappingPoint
      ? dynamicModalSnappingPoint
      : maxModalSnappingPoint;

  return (
    <CustomBottomSheetModal
      myRef={myRef}
      snapPoints={[guardedDynamicModalSnappingPoint]}
      onVisibilityChange={onVisibilityChange}
      onShouldClose={onShouldClose}>
      <EmptySpace height={verticalListPadding} />

      <BottomSheetFlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <EmptySpace height={itemSeparatorSize} />}
        ListFooterComponent={() => <EmptySpace height={footerHeight} />}
      />

      <EmptySpace height={verticalListPadding} />
    </CustomBottomSheetModal>
  );
};

const verticalListPadding = 30;
const iconSize = 30;
const maxModalSnappingPoint = 800;
const itemSeparatorSize = 8;
const footerHeight = 20;
const imageHeightWithAspectRation = Dimensions.get('screen').width / (16 / 9);

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: ColorPallet.gray,
    width: '100%',
    height: imageHeightWithAspectRation,
  },
});
