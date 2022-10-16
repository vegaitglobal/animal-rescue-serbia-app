import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ColorPallet} from '../resources/ColorPallet';
import {CustomButton} from './CustomButton';
import {EmptySpace} from './EmptySpace';
import {reduceFileDataIntoString} from './helpers';
import {Video} from 'react-native-compressor';
import {Dirs, FileSystem} from 'react-native-file-access';

type ImageUploadElementProps = {
  placeholderText: string;
  buttonLabel?: string;
};

export const ImageUploadElement = ({
  buttonLabel,
  placeholderText,
}: ImageUploadElementProps) => {
  const [fileLog, setFileLog] = useState('');

  const onPress = useCallback(async () => {
    const result = await ImagePicker.openPicker({
      multiple: true,
      mediaType: 'any',
    });

    try {
      const firstElement = result?.[0] ?? {};
      console.log('PathBeforeCompress: ', firstElement.path);
      console.log('File size before: ', firstElement.size);
      const pathAfterCompress = await Video.compress(firstElement.path);

      console.log('PATH: ', pathAfterCompress);
      const pathPlus = pathAfterCompress.replace('\\/\\/', '\\/\\/\\/');
      console.log('With three: ', pathPlus);
      //const pathPlusPlus = pathAfterCompress.substring(6, pat);
      const segments = pathAfterCompress.split('file://');
      const withTreePlusPlusTemp = segments[1];
      const withTreePlusPlus = `file:///${withTreePlusPlusTemp}`;
      console.log('With three ajmo: ', withTreePlusPlus);
      const video = await FileSystem.stat(withTreePlusPlus);
      console.log('File size: ', video.size);
      // console.log('Cache: ', Dirs.CacheDir);
      setFileLog(reduceFileDataIntoString(result));
    } catch (error) {
      console.log('ERRRORRRRR: ', JSON.stringify(error));
    }
  }, []);

  const dynamicPlaceholderTextStyle = fileLog ? {} : style.textPlaceholder;

  return (
    <View style={style.rootContainer}>
      <Text numberOfLines={3} style={[style.text, dynamicPlaceholderTextStyle]}>
        {fileLog || placeholderText}
      </Text>
      <EmptySpace width={20} />
      <View>
        <CustomButton
          text={buttonLabel ?? 'Dodaj'}
          isSmall={true}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    color: ColorPallet.plainBlack,
    height: '100%',
    flex: 1,
    textAlignVertical: 'center',
  },
  textPlaceholder: {
    color: ColorPallet.mediumGray,
  },
  rootContainer: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
