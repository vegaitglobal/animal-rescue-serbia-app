import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ColorPallet} from '../resources/ColorPallet';
import {CustomButton} from './CustomButton';
import {EmptySpace} from './EmptySpace';
import {reduceFileDataIntoString} from './helpers';

export const ImageUploadElement = () => {
  const [path, setPath] = useState('Dodajte fotografiju');

  const onPress = useCallback(async () => {
    const result = await ImagePicker.openPicker({
      multiple: true,
      mediaType: 'any',
    });

    setPath(reduceFileDataIntoString(result));
  }, []);

  return (
    <View style={style.rootContainer}>
      <Text numberOfLines={3} style={style.text}>
        {path}
      </Text>
      <EmptySpace width={20} />
      <View>
        <CustomButton text="Dodaj" isSmall={true} onPress={onPress} />
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
  rootContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
