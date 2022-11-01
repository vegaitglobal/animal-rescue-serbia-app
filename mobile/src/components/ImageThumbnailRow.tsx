import React, {useCallback, useMemo, useState} from 'react';
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

  //TODO: Config/env
  //TODO: Auth manager
  //TODO: Splash screen
  //TODO: iOS layout (logo on header zIndex)
  //TODO: Static screens
  const thumbnails = useMemo(
    () =>
      truncatedContent.map(({id: fileId, relativeFilePath}) => (
        <View key={fileId}>
          <Image
            style={[
              styles.image,
              {width: thumbnailSize, height: thumbnailSize},
            ]}
            //TODO: Create Base url environment variable to avoid issues with duplicated setup of it
            source={{
              uri: relativeFilePath
                ? `https://c2e0-212-200-247-75.eu.ngrok.io/${relativeFilePath}`
                : undefined,
            }}
          />
          <EmptySpace width={thumbnailSpacing} />
        </View>
      )),
    [thumbnailSize, truncatedContent],
  );

  return (
    <Pressable onPress={onPress}>
      <View style={styles.imageRowContainer}>
        <View onLayout={onLayoutChange} style={styles.imageContainer}>
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
  imageRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
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
});
