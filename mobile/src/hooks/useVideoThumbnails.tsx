import {useCallback, useEffect, useState} from 'react';
import {createThumbnail} from 'react-native-create-thumbnail';
import {ThumbnailData} from '../components/types';
import {MediaContentDto} from '../infrastructure/apiTypes';
import {Constants} from '../resources/Constants';
import {isPathVideo} from '../util/helpers';

export const useVideoThumbnailsCreator = (mediaContent: MediaContentDto[]) => {
  const [videoThumbnails, setVideoThumbnails] = useState<ThumbnailData[]>([]);

  const createVideoThumbnailsAsync = useCallback(
    async (mediaContentParam: MediaContentDto[]) => {
      const videoOnly = mediaContentParam.filter(
        file => isPathVideo(file.relativeFilePath), //TODONFFF: Replace with content type
      );

      videoOnly.forEach(async ({id, relativeFilePath}) => {
        if (!relativeFilePath) {
          return;
        }

        try {
          const res = await createThumbnail({
            url: `${Constants.baseUrl}/${relativeFilePath}`,
          });
          setVideoThumbnails(current => [...current, {id, fullPath: res.path}]);
        } catch (error) {
          console.log('Error creating thumbnail: ', error);
        }
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
