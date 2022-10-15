import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ColorPallet} from '../resources/ColorPallet';
import {CustomButton} from './CustomButton';
import {EmptySpace} from './EmptySpace';
import {reduceFileDataIntoString} from './helpers';
import {Video} from 'react-native-compressor';

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

    const firstElement = result?.[0] ?? {};
    console.log('PathBeforeCompress: ', firstElement.path);
    console.log('File size before: ', firstElement);
    const pathAfterCompress = await Video.compress(firstElement.path, {
      minimumFileSizeForCompress: 9,
    });

    console.log('PATH: ', pathAfterCompress);
    setFileLog(reduceFileDataIntoString(result));
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
