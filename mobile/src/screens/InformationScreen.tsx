import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import Report from '../assets/icons/educationGrayBg.svg';
import {TextInput} from '../components/TextInput';
import {SelectionInput} from '../components/SelectionInput';
import {CustomButton} from '../components/CustomButton';

export const InformationScreen = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const text =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!';

  return (
    <ScreenRootContainer title={'Informisanje'} showLogo>
      <View style={style.container}>
        <TextInput
          placeholder="Delatnost službe"
          placeholderTextColor={ColorPallet.lightGray}
        />
        <TextInput
          placeholder="Lokacija"
          placeholderTextColor={ColorPallet.lightGray}
        />
        <SelectionInput
          placeholderLabel="Kategorija problema"
          data={[]}
          onValueSelected={() => {}}
        />
        <View style={style.btnContainer}>
          <CustomButton text="Pretraži" onPress={() => {}} />
        </View>
      </View>
      <CustomModal
        title={'Informisanje'}
        text={text}
        icon={<Report width={100} height={100} />}
        onPress={() => setVisible(false)}
        visible={visible}
      />
    </ScreenRootContainer>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: ColorPallet.plainWhite,
    flex: 1,
  },
  btnContainer: {
    paddingTop: 50,
  },
});
