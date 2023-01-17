import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {useCallback, useMemo} from 'react';
import {Dimensions, ListRenderItemInfo, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import {CustomBottomSheetModal} from '../components/CustomBottomSheetModal';
import {EmptySpace} from '../components/EmptySpace';
import {ImageWithLoadingAnimation} from '../components/ImageWithLoadingAnimation';
import {StripedBar} from '../components/StripedBar';
import {useVideoThumbnailsCreator} from '../hooks/useVideoThumbnails';
import {MediaContentDto} from '../infrastructure/apiTypes';
import {ColorPallet} from '../resources/ColorPallet';
import {Constants} from '../resources/Constants';
import {isPathVideo} from '../util/helpers';

//TODONFFF: Rename to something like MediaContenListModal

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
      const fullPath = `${Constants.baseUrl}/${relativeFilePath}`;
      return isPathVideo(relativeFilePath) ? (
        <VideoPlayer
          video={{
            uri: fullPath,
          }}
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
        <ImageWithLoadingAnimation
          width={imageWidth}
          height={imageHeightWithAspectRatio}
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
    data?.length * imageHeightWithAspectRatio +
    verticalListPadding * 2 +
    30 +
    iconSize +
    itemSeparatorSize +
    footerHeight;

  const guardedDynamicModalSnappingPoint =
    dynamicModalSnappingPoint < maxModalSnappingPoint
      ? dynamicModalSnappingPoint
      : maxModalSnappingPoint;

  const strippedBarSeparator = useMemo(() => {
    const screenWidth = Dimensions.get('screen').width;
    return <StripedBar width={screenWidth} />;
  }, []);

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
        ListHeaderComponent={strippedBarSeparator}
        ItemSeparatorComponent={() => strippedBarSeparator}
        ListFooterComponent={strippedBarSeparator}
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
const imageWidth = Dimensions.get('screen').width;
const imageHeightWithAspectRatio = imageWidth / (16 / 9);

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: ColorPallet.gray,
    width: imageWidth,
    height: imageHeightWithAspectRatio,
  },
});
