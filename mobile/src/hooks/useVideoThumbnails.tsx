import {useCallback, useEffect, useState} from 'react';
import Config from 'react-native-config';
import {createThumbnail} from 'react-native-create-thumbnail';
import {ThumbnailData} from '../components/types';
import {MediaContentDto} from '../infrastructure/apiTypes';
import {isPathVideo} from '../util/helpers';

export const useVideoThumbnailsCreator = (mediaContent: MediaContentDto[]) => {
  const [videoThumbnails, setVideoThumbnails] = useState<ThumbnailData[]>([]);

  const createVideoThumbnailsAsync = useCallback(
    async (mediaContentParam: MediaContentDto[]) => {
      const videoOnly = mediaContentParam.filter(file =>
        isPathVideo(file.relativeFilePath),
      );

      videoOnly.forEach(async ({id, relativeFilePath}) => {
        const res = await createThumbnail({
          url: `${Config.BASE_URL}/${relativeFilePath}`,
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

  return videoThumbnails;
};
