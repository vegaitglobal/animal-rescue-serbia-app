import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ColorPallet} from '../resources/ColorPallet';
import {fileDataAsStringArray} from '../util/helpers';
import {CustomButton} from './CustomButton';
import {EmptySpace} from './EmptySpace';
import {SelectionResult} from './types';

type ImageUploadElementProps = {
  placeholderText: string;
  buttonLabel?: string;
  customBodyText?: string;
  onFilesSelected: (data: SelectionResult[]) => void;
  isLoading?: boolean;
};

export const ImageUploadElement = ({
  buttonLabel,
  placeholderText,
  onFilesSelected,
  customBodyText,
  isLoading,
}: ImageUploadElementProps) => {
  const [fileLogs, setFileLogs] = useState<string[]>([]);

  const onPress = useCallback(async () => {
    try {
      const pickedFiles = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'any',
      });

      setFileLogs(fileDataAsStringArray(pickedFiles));
      onFilesSelected(pickedFiles.map(({path, mime}) => ({path, mime})));
    } catch (error) {
      console.log('Media selection cancelled');
    }
  }, [onFilesSelected]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.fileLogContainer}>
        {customBodyText ? (
          <Text style={styles.text}>{customBodyText}</Text>
        ) : fileLogs.length ? (
          fileLogs.slice(0, 3).map(fileLog => (
            <Text key={fileLog} numberOfLines={1} style={[styles.text]}>
              {fileLog}
            </Text>
          ))
        ) : (
          <Text style={styles.textPlaceholder}>{placeholderText}</Text>
        )}
      </View>

      <EmptySpace width={20} />
      <View>
        <CustomButton
          isLoading={isLoading}
          text={buttonLabel ?? 'Dodaj'}
          isSmall={true}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: ColorPallet.plainBlack,
  },
  textPlaceholder: {
    color: ColorPallet.lightGray,
  },
  rootContainer: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileLogContainer: {
    justifyContent: 'center',
    flex: 1,
  },
});
