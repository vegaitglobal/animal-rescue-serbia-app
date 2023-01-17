import React from 'react';
import VideoPlayer from 'react-native-video-player';
import {useVideoThumbnailsCreator} from '../hooks/useVideoThumbnails';
import {MediaContentDto} from '../infrastructure/apiTypes';
import {ColorPallet} from '../resources/ColorPallet';
import {Constants} from '../resources/Constants';
import {ImageWithLoadingAnimation} from './ImageWithLoadingAnimation';

type MediaContentBoxProps = {
  width: number;
  height: number;
  mediaContent: MediaContentDto;
};

const BASE_URL = Constants.baseUrl;

export const MediaContentBox = ({
  mediaContent,
  width,
  height,
}: MediaContentBoxProps) => {
  const {contentType, relativeFilePath} = mediaContent;
  const isVideo = contentType?.includes('video');
  const fullPath = `${BASE_URL}/${relativeFilePath}`;

  const [videoThumbnail] = useVideoThumbnailsCreator([mediaContent]);

  return isVideo ? (
    <VideoPlayer
      video={{
        uri: fullPath,
      }}
      customStyles={{
        video: {backgroundColor: ColorPallet.plainBlack},
      }}
      thumbnail={{
        uri: videoThumbnail?.fullPath,
      }}
    />
  ) : (
    <ImageWithLoadingAnimation
      width={width}
      height={height}
      source={{uri: fullPath}}
    />
  );
};
