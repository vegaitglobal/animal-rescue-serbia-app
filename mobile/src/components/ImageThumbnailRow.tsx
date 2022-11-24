import React, {useCallback, useMemo, useState} from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MediaContentDto} from '../infrastructure/apiTypes';
import {ColorPallet} from '../resources/ColorPallet';
import {Chevron, Orientation} from './Chevron';
import {EmptySpace} from './EmptySpace';
import {isPathVideo} from '../util/helpers';
import Config from 'react-native-config';
import {useVideoThumbnailsCreator} from '../hooks/useVideoThumbnails';
import {ImageWithLoadingAnimation} from './ImageWithLoadingAnimation';
import PlayIcon from '../assets/icons/play.svg';

type ImageThumbnailRowProps = {
  mediaContent: MediaContentDto[];
  thumbnailSize?: number;
  onPress?: () => void;
};

export const ImageThumbnailRow = ({
  mediaContent,
  thumbnailSize = 60,
  onPress,
}: ImageThumbnailRowProps) => {
  const [numberOfThumbnails, setNumberOfThumbnails] = useState(0);

  const videoThumbnails = useVideoThumbnailsCreator(mediaContent);

  const onLayoutChange = useCallback(
    ({nativeEvent}: LayoutChangeEvent) => {
      const calculatedNumberOfThumbnails = Math.floor(
        nativeEvent.layout.width / (thumbnailSize + thumbnailSpacing),
      );
      setNumberOfThumbnails(calculatedNumberOfThumbnails);
    },
    [thumbnailSize],
  );

  const truncatedContent = useMemo(
    () => mediaContent.slice(0, numberOfThumbnails),
    [mediaContent, numberOfThumbnails],
  );

  const renderItem = useCallback(
    (id: string, relativeFilePath: string) => {
      const fullPath = `${Config.BASE_URL}/${relativeFilePath}`;

      const isVideo = isPathVideo(relativeFilePath);
      const processedPath = isVideo
        ? videoThumbnails.find(thumbnailData => thumbnailData.id === id)
            ?.fullPath ?? undefined
        : fullPath;

      return processedPath ? (
        <ImageWithLoadingAnimation
          width={thumbnailSize}
          height={thumbnailSize}
          overlayIcon={
            isVideo ? (
              <PlayIcon color={ColorPallet.plainWhite} width={15} height={15} />
            ) : undefined
          }
          style={[
            styles.thumbnail,
            {width: thumbnailSize, height: thumbnailSize},
          ]}
          source={{
            uri: relativeFilePath ? processedPath : undefined,
          }}
        />
      ) : null;
    },
    [thumbnailSize, videoThumbnails],
  );

  //TODO: Auth manager
  //TODO: iOS layout (logo on header zIndex)
  //TODO: Static screens
  const thumbnails = useMemo(
    () =>
      truncatedContent.map(({id: fileId, relativeFilePath}) => (
        <View style={styles.thumbnailWithSpacing} key={fileId}>
          <View style={styles.thumbnailContainer}>
            {renderItem(fileId, relativeFilePath)}
          </View>
          <EmptySpace width={thumbnailSpacing} />
        </View>
      )),
    [renderItem, truncatedContent],
  );

  return (
    <Pressable onPress={onPress}>
      <View style={styles.thumbnailRowContainer}>
        <View onLayout={onLayoutChange} style={styles.thumbnailsContainer}>
          {thumbnails}
        </View>
        {truncatedContent.length ? (
          <View style={styles.moreButtonContainer}>
            <Text style={styles.moreLabelText}>Više</Text>
            <EmptySpace width={8} />
            <Chevron
              color={ColorPallet.plainBlack}
              orientation={Orientation.Forward}
            />
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

const thumbnailSpacing = 8;

const styles = StyleSheet.create({
  thumbnailRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnailsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  thumbnail: {
    backgroundColor: ColorPallet.lightGray,
  },
  moreButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreLabelText: {
    fontWeight: '800',
    color: ColorPallet.plainBlack,
    textTransform: 'uppercase',
  },
  thumbnailWithSpacing: {
    flexDirection: 'row',
  },
  thumbnailContainer: {
    borderRadius: 5,
    overflow: 'hidden',
  },
});
