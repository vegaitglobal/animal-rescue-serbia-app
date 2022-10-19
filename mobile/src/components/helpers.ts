import {Platform} from 'react-native';
import {Video} from 'react-native-compressor';
import {ImageOrVideo} from 'react-native-image-crop-picker';

export const extractFileNameFromPath = (filePath: string) => {
  const segmentedPath = filePath.split('/');
  return segmentedPath?.[segmentedPath.length - 1] ?? '';
};

export const reduceFileDataIntoString = (fileData: ImageOrVideo[]) => {
  const names = fileData.map(file => extractFileNameFromPath(file.path));
  return names.reduce((acc, current) => `${acc},\n${current}`);
};

export const cleanupPickerLibraryPathsIOS = (pickerData: ImageOrVideo[]) => {
  if (Platform.OS !== 'ios') {
    return pickerData;
  }

  const invalidIOSPathPrefix = 'file:///';

  return pickerData.map(({path}) => {
    if (!path.startsWith(invalidIOSPathPrefix)) {
      return path;
    }
    return path.split(invalidIOSPathPrefix)?.[1] ?? path;
  });
};

export const compressVideo = async (path: string) => {
  try {
    const invalidPathPrefix = 'file://';
    const pathAfterCompress = await Video.compress(path);

    if (Platform.OS === 'ios') {
      return pathAfterCompress; // TODO check wether library handles this properly, if not, remove file:// prefix
    }

    const segments = pathAfterCompress.split(invalidPathPrefix);
    const withTreePlusPlusTemp = segments[1];

    return withTreePlusPlusTemp.startsWith('/')
      ? invalidPathPrefix + withTreePlusPlusTemp
      : `file:///${withTreePlusPlusTemp}`; // This guards case where library path bug is fixed
  } catch (error) {
    console.log('ERROR: ', JSON.stringify(error));
    return undefined;
  }
};

export const batchCompress = async (paths: string[]) =>
  await Promise.all(paths.map(path => compressVideo(path)));
