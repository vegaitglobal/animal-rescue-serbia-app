import {ImageOrVideo} from 'react-native-image-crop-picker';

const extractFileName = (fileData: ImageOrVideo) => {
  const imagePath = fileData?.path;
  const segmentedPath = imagePath.split('/');
  return segmentedPath?.[segmentedPath.length - 1] ?? '';
};

export const reduceFileDataIntoString = (fileData: ImageOrVideo[]) => {
  const names = fileData.map(extractFileName);
  return names.reduce((acc, current) => `${acc},\n${current}`);
};
