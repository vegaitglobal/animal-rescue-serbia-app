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
import {useVideoThumbnailsCreator} from '../hooks/useVideoThumbnails';
import {ImageWithLoadingAnimation} from './ImageWithLoadingAnimation';
import PlayIcon from '../assets/icons/play.svg';
import {Constants} from '../resources/Constants';

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
      const fullImagePath = `${Constants.baseUrl}/${relativeFilePath}`;

      const isVideo = isPathVideo(relativeFilePath);
      const processedPath = isVideo
        ? videoThumbnails.find(thumbnailData => thumbnailData.id === id)
            ?.fullPath
        : fullImagePath;

      // What's isEnabled on violation category (Lite)
      //TODO: Use backend file mime type instead
      return (
        <ImageWithLoadingAnimation
          width={thumbnailSize}
          height={thumbnailSize}
          overlayIcon={
            isVideo ? (
              <PlayIcon color={ColorPallet.plainWhite} width={15} height={15} />
            ) : undefined
          }
          style={{width: thumbnailSize, height: thumbnailSize}}
          source={{
            uri: processedPath,
          }}
        />
      );
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
    borderWidth: 0.4,
    borderColor: ColorPallet.faintGray,
  },
});
