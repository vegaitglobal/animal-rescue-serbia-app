import React, {useCallback, useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import Report from '../assets/icons/educationGrayBg.svg';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {
  getLocations,
  getNewReport,
  getViolationCategories,
} from '../store/src/reports/selectors';
import {TextInput} from '../components/TextInput';
import {CustomButton} from '../components/CustomButton';
import {SelectionInput} from '../components/SelectionInput';
import {MultilineTextInput} from '../components/MulitilineTextInput';
import {CustomModalWithButton} from '../components/CustomModalWithButton';
import {useNavigation} from '@react-navigation/native';
import {ImageUploadElement} from '../components/ImageUploaderElement';
import axios from 'axios';
import {SelectionResult} from '../components/types';
import {batchCompress} from '../components/helpers';
import {
  loadLocations,
  loadViolationCategories,
  setAddress,
  setDescription,
  setNameSurname,
  setPhoneNumber,
} from '../store/src/reports/actions';

export const ReportScreen = () => {
  // const {firstName, lastName} = useAppSelector(getNewReport);

  const violationCategories = useAppSelector(getViolationCategories);

  const locations = useAppSelector(getLocations);

  console.log('locations ', locations);

  const dispatch = useAppDispatch();

  const headerTitle = 'Prijava prekršaja';
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!';

  const imeIPrezime = 'Ime i Prezime';
  const lokacija = 'Lokacija prekršaja';
  const adresa = 'Adresa prekršaja';
  const brTelefona = 'Broj telefona';
  const tipPrekrsaja = 'Tip prekršaja';
  const fotoVideo = 'Foto/video';

  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [sendReport, setSendReport] = useState(false);

  useEffect(() => setVisible(true), []);

  useEffect(() => {
    dispatch(loadViolationCategories());
    dispatch(loadLocations());
  }, [dispatch]);

  const onFilesSelected = useCallback(
    async (selectedFiles: SelectionResult[]) => {
      const imagesOnly = selectedFiles.filter(file =>
        file.mime.startsWith('image'),
      );
      const videosOnly = selectedFiles.filter(file =>
        file.mime.startsWith('video'),
      );

      const compressedVideoFilePaths = await batchCompress(
        videosOnly.map(file => file.path),
      );

      console.log('Image paths: ', imagesOnly);
      console.log('Video PATHS: ', compressedVideoFilePaths);
    },
    [],
  );

  return (
    <ScreenRootContainer title={headerTitle} showLogo>
      <View style={style.container}>
        <View style={style.inputContainer}>
          <TextInput
            placeholder={imeIPrezime}
            placeholderTextColor={ColorPallet.lightGray}
            onChangeText={value => setNameSurname(value)}
          />
        </View>
        <View style={style.inputContainer}>
          <SelectionInput
            onValueSelected={item => console.log('Test: ', item)}
            data={locations?.locations?.map((item, index) => ({
              label: item,
              id: index.toString(),
            }))}
            placeholderLabel={lokacija}
          />
        </View>
        <View style={style.inputContainer}>
          <TextInput
            placeholder={adresa}
            placeholderTextColor={ColorPallet.lightGray}
            onChangeText={value => setAddress(value)}
          />
        </View>
        <View style={style.inputContainer}>
          <TextInput
            placeholder={brTelefona}
            placeholderTextColor={ColorPallet.lightGray}
            onChangeText={value => setPhoneNumber(value)}
          />
        </View>
        <View style={style.inputContainer}>
          <SelectionInput
            onValueSelected={item => console.log('Test: ', item)}
            data={violationCategories?.map(
              item =>
                ({
                  id: item.id,
                  label: item.name,
                } ?? []),
            )}
            placeholderLabel={tipPrekrsaja}
          />
        </View>
        <View style={style.photoContainer}>
          <ImageUploadElement
            placeholderText={fotoVideo}
            onFilesSelected={onFilesSelected}
          />
        </View>
        <MultilineTextInput
          style={style.textInputContainer}
          placeholder="Opis"
        />
        <View style={style.buttonsContainer}>
          <CustomButton
            onPress={() => setDeclineModalVisible(true)}
            text="Odustani"
            isSmall
          />
          <CustomButton
            onPress={() => {
              setSendReport(true);
            }}
            text="Prijavi"
            isSmall
          />
        </View>
      </View>
      <CustomModal
        title={headerTitle}
        text={text}
        icon={<Report width={100} height={100} />}
        onPress={() => setVisible(false)}
        visible={visible}
      />
      <CustomModalWithButton
        text={text}
        icon={<Report width={100} height={100} />}
        buttonPositive="Vrati se na tekst"
        buttonNegative="Odustani"
        onPressPositiveBtn={() => setDeclineModalVisible(false)}
        onPressNegativeBtn={() => navigation.goBack()}
        visible={declineModalVisible}
      />
      <CustomModalWithButton
        isOneButtonModal
        title="Tvoja prijava je prosledjena"
        text={'Neko od nasih volontera ce te uskoro kontaktirati'}
        icon={<Report width={100} height={100} />}
        buttonPositive="U redu"
        onPressPositiveBtn={() => {
          setSendReport(false);
          navigation.navigate('Home');
        }}
        visible={sendReport}
      />
    </ScreenRootContainer>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 25,
    backgroundColor: ColorPallet.plainWhite,
    flex: 1,
  },
  inputContainer: {
    marginBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  text: {
    color: ColorPallet.lightGray,
    fontSize: 18,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
  },
  textInputContainer: {
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 10,
  },
});
