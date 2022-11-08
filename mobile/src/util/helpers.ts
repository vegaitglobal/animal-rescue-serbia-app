import {Platform} from 'react-native';
import {RNFFmpeg} from 'react-native-ffmpeg';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import UUID from 'react-native-uuid';

export const extractFileNameFromPath = (filePath: string) => {
  const segmentedPath = filePath.split('/');
  return segmentedPath?.[segmentedPath.length - 1] ?? '';
};

export const fileDataAsStringArray = (fileData: ImageOrVideo[]) => {
  return fileData.map(file => extractFileNameFromPath(file.path));
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

    const pathAfterCompress = await compressVideoFFMPEG(path); //await Video.compress(path);
    //TODONF: consider ios path + dynamic Android (lib)
    if (Platform.OS === 'ios') {
      return pathAfterCompress; // TODO check wether library handles this properly, if not, remove file:// prefix
    }

    const segments = pathAfterCompress.split(invalidPathPrefix);
    const withTreePlusPlusTemp = segments[1];

    console.log('PATH AFTER COMPRESS FOR CACHE DIR: ', withTreePlusPlusTemp);

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

export const bind =
  <T extends unknown>(arg: T, callback: (arg: T) => void) =>
  () =>
    callback(arg);

export const isPathVideo = (relativeFilePath: string) => {
  if (!relativeFilePath) {
    return false;
  }
  const pathSegments = relativeFilePath.split('.');
  const extension = pathSegments[pathSegments.length - 1];
  return extension === 'mp4' || extension === 'mpeg' || extension === 'avi';
};

// TODONF:
const BASE_DIR = 'file:///data/user/0/com.myapp/cache/'; //`${FileSystem.cacheDirectory}expo-cache/`;

const compressVideoFFMPEG = async (fullPath: string) => {
  const uniqueVideoName = UUID.v4();
  const videoFileName = `${uniqueVideoName}.mp4`;
  const fullVideoPath = BASE_DIR + videoFileName;

  const result = await RNFFmpeg.execute(
    `-i ${fullPath} -c:v mpeg4 ${fullVideoPath}`,
  );

  console.log('RESULT: ', result);

  return fullVideoPath;
};
