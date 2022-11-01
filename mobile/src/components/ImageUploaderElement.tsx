import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ColorPallet} from '../resources/ColorPallet';
import {CustomButton} from './CustomButton';
import {EmptySpace} from './EmptySpace';
import {reduceFileDataIntoString} from '../util/helpers';
import {SelectionResult} from './types';

type ImageUploadElementProps = {
  placeholderText: string;
  buttonLabel?: string;
  onFilesSelected: (data: SelectionResult[]) => void;
};

export const ImageUploadElement = ({
  buttonLabel,
  placeholderText,
  onFilesSelected,
}: ImageUploadElementProps) => {
  const [fileLog, setFileLog] = useState('');

  const onPress = useCallback(async () => {
    const pickedFiles = await ImagePicker.openPicker({
      multiple: true,
      mediaType: 'any',
    });

    setFileLog(reduceFileDataIntoString(pickedFiles));
    onFilesSelected(pickedFiles.map(({path, mime}) => ({path, mime})));
  }, [onFilesSelected]);

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
    flex: 1,
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
