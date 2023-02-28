import {Platform} from 'react-native';
import {RNFFmpeg} from 'react-native-ffmpeg';
import {Dirs} from 'react-native-file-access';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import UUID from 'react-native-uuid';
import * as FileSystem from 'expo-file-system';
import {SelectionResult} from '../components/types';

const guardiOSJpegImage = async (
  imageData: SelectionResult,
): Promise<SelectionResult> => {
  if (
    imageData.mime !== 'image/jpeg' &&
    imageData.mime !== 'image/jpg' &&
    imageData.mime !== 'image/heic'
  ) {
    console.log('imageMime: ', imageData.mime);
    return imageData;
  }

  const originalUri = 'file:///' + imageData.path.substring(1); //TODONF: Create prefix constant

  const newUri =
    'file://' +
    `${FileSystem.documentDirectory?.substring(
      7,
    )}resumableUploadManager-${extractFileNameFromPath(imageData.path)}.jpeg`;

  await FileSystem.copyAsync({
    from: originalUri,
    to: newUri,
  });

  return {path: newUri, mime: 'image/jpeg'};
};

/**
 * There is an issue on iOS with certain image files which causes them to
 * get erroneously big size which is then blocked by out backend.
 * This is a workaround for that issue.
 */
export const guardIOSJpegImages = async (imageData: SelectionResult[]) =>
  Platform.OS === 'ios'
    ? await Promise.all(imageData.map(guardiOSJpegImage))
    : imageData;

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

export const compressVideoByPlatform = async (path: string) => {
  try {
    const invalidPathPrefix = 'file://';

    const pathAfterCompress = await compressVideoFFMPEG(path);
    if (!pathAfterCompress) {
      return;
    }

    // TODO: These are possibly unnecessary with new library
    // TODONF: consider ios path + dynamic Android (lib)
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

// TODO: Make separate video helpers file
export const batchCompress = async (paths: string[]) =>
  await Promise.all(paths.map(path => compressVideoByPlatform(path)));

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

// TODO: Check l
// TODO: Async video processing, will it wait for completion (maybe block button and show progress bar)
// TODO: Make the screen blocking element invisible and/or cover whole screen
// TODO: HTTP part progress bar
// TODO: Block before opening media picking library as well

const PLATFORM_CACHE_DIR = Dirs.CacheDir;

const compressVideoFFMPEG = async (fullEntryPath: string) => {
  const uniqueVideoName = UUID.v4();
  const videoFileName = `${uniqueVideoName}.mp4`;
  const PATH_PLATFORM_PREFIX = Platform.OS === 'android' ? 'file://' : '';
  const fullVideoPath = `${PATH_PLATFORM_PREFIX}${PLATFORM_CACHE_DIR}/${videoFileName}`;

  console.log('FULL PATH: ', fullVideoPath);

  // TODO: These are setup constants and can be extracted into separate file
  const framerate = 24;
  const resolutionWidth = 1280;
  const resolutionHeight = 720;

  //TODO: File size warning to user (ask backend to increase value)
  const compressionResult = await RNFFmpeg.execute(
    `-i ${fullEntryPath} -c:v mpeg4 -vf scale=${resolutionWidth}:${resolutionHeight} -r ${framerate} ${fullVideoPath}`,
  );

  console.log('Video compression result: ', compressionResult);

  // result===1 means that compression failed
  return compressionResult === 1 ? undefined : fullVideoPath;
};
