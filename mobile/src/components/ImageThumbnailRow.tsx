import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
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
import {createThumbnail} from 'react-native-create-thumbnail';
import {isPathVideo} from '../util/helpers';

type ImageThumbnailRowProps = {
  mediaContent: MediaContentDto[];
  thumbnailSize?: number;
  onPress?: () => void;
};

type ThumbnailData = {
  id: string;
  fullPath: string;
};

export const ImageThumbnailRow = ({
  mediaContent,
  thumbnailSize = 60,
  onPress,
}: ImageThumbnailRowProps) => {
  const [numberOfThumbnails, setNumberOfThumbnails] = useState(0);
  const [videoThumbnails, setVideoThumbnails] = useState<ThumbnailData[]>([]);

  const onLayoutChange = useCallback(
    ({nativeEvent}: LayoutChangeEvent) => {
      const calculatedNumberOfThumbnails = Math.floor(
        nativeEvent.layout.width / (thumbnailSize + thumbnailSpacing),
      );
      setNumberOfThumbnails(calculatedNumberOfThumbnails);
    },
    [thumbnailSize],
  );

  const createVideoThumbnailsAsync = useCallback(
    async (mediaContentParam: MediaContentDto[]) => {
      const videoOnly = mediaContentParam.filter(file =>
        isPathVideo(file.relativeFilePath),
      );

      videoOnly.forEach(async ({id, relativeFilePath}) => {
        const res = await createThumbnail({
          url: `https://08fd-82-117-210-2.eu.ngrok.io/${relativeFilePath}`,
        });
        setVideoThumbnails(current => [...current, {id, fullPath: res.path}]);
      });
    },
    [],
  );

  useEffect(() => {
    if (!mediaContent.length) {
      return;
    }
    createVideoThumbnailsAsync(mediaContent);
  }, [mediaContent, createVideoThumbnailsAsync]);

  const truncatedContent = useMemo(
    () => mediaContent.slice(0, numberOfThumbnails),
    [mediaContent, numberOfThumbnails],
  );

  const renderItem = useCallback(
    (id: string, relativeFilePath: string) => {
      const fullPath = `https://08fd-82-117-210-2.eu.ngrok.io/${relativeFilePath}`;

      const processedPath = isPathVideo(relativeFilePath)
        ? videoThumbnails.find(thumbnailData => thumbnailData.id === id)
            ?.fullPath ?? undefined
        : fullPath;

      return processedPath ? (
        <Image
          style={[
            styles.thumbnail,
            {width: thumbnailSize, height: thumbnailSize},
          ]}
          //TODO: Create Base url environment variable to avoid issues with duplicated setup of it
          source={{
            uri: relativeFilePath ? processedPath : undefined,
          }}
        />
      ) : null;
    },
    [thumbnailSize, videoThumbnails],
  );

  //TODO: Config/env
  //TODO: Auth manager
  //TODO: Splash screen
  //TODO: iOS layout (logo on header zIndex)
  //TODO: Static screens
  const thumbnails = useMemo(
    () =>
      truncatedContent.map(({id: fileId, relativeFilePath}) => (
        <View style={styles.thumbnailWithSpacing} key={fileId}>
          <>{renderItem(fileId, relativeFilePath)}</>
          <EmptySpace width={thumbnailSpacing} />
        </View>
      )),
    [renderItem, truncatedContent],
  );

  return (
    <Pressable onPress={onPress}>
      <View style={styles.thumbnailRowContainer}>
        <View onLayout={onLayoutChange} style={styles.thumbnailContainer}>
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
  thumbnailContainer: {
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
});
