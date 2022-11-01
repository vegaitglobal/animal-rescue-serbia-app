import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard, Platform, StyleSheet, View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import Report from '../assets/icons/educationGrayBg.svg';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {
  getLocations,
  getNewViolation,
  getViolationCategories,
} from '../store/src/reports/selectors';
import {TextInput} from '../components/TextInput';
import {CustomButton} from '../components/CustomButton';
import {SelectionInput} from '../components/SelectionInput';
import {MultilineTextInput} from '../components/MulitilineTextInput';
import {CustomModalWithButton} from '../components/CustomModalWithButton';
import {useNavigation} from '@react-navigation/native';
import {ImageUploadElement} from '../components/ImageUploaderElement';
import {SelectionResult} from '../components/types';
import {batchCompress, extractFileNameFromPath} from '../util/helpers';
import {
  sendViolation,
  setAddress,
  setDescription,
  setFiles,
  setLocation,
  setNameSurname,
  setPhoneNumber,
  setViolationCategory,
  unsetViolation,
} from '../store/src/reports/actions';
import {ItemData} from '../components/commonTypes';
import {ScrollView} from 'react-native-gesture-handler';

export const ReportScreen = () => {
  // const {firstName, lastName} = useAppSelector(getNewReport);

  const violationCategories = useAppSelector(getViolationCategories);

  const violationLocations = useAppSelector(getLocations);

  //console.log('locations ', locations);

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
  const violation = useAppSelector(getNewViolation);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setVisible(true), []);

  const handleReport = useCallback(async () => {
    setSendReport(false);

    setIsLoading(true);

    const result = await dispatch(sendViolation(violation));
    if (result.meta.requestStatus === 'rejected') {
      console.log('Report failed');
      return;
    }
    navigation.navigate('Home');

    setIsLoading(false);
    dispatch(unsetViolation());
  }, [dispatch, navigation, violation]);

  const onFilesSelected = useCallback(
    async (selectedFiles: SelectionResult[]) => {
      const imagesOnly = selectedFiles.filter(file =>
        file.mime.startsWith('image'),
      );

      dispatch(
        setFiles(
          selectedFiles.map(file => ({
            name: extractFileNameFromPath(file.path),
            type: file.mime,
            uri: file.path,
          })),
        ),
      );

      //TODO: remove
      const videosOnly = selectedFiles.filter(file =>
        file.mime.startsWith('video'),
      );

      const compressedVideoFilePaths = await batchCompress(
        videosOnly.map(file => file.path),
      );

      console.log('Image paths: ', imagesOnly);
      console.log('Video PATHS: ', compressedVideoFilePaths);
    },
    [dispatch],
  );

  return (
    <ScreenRootContainer title={headerTitle} showLogo>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={style.container}>
          <View style={style.inputContainer}>
            <TextInput
              value={violation.fullName}
              placeholder={imeIPrezime}
              placeholderTextColor={ColorPallet.lightGray}
              onChangeText={value => {
                dispatch(setNameSurname(value));
              }}
            />
          </View>
          <View style={style.inputContainer}>
            <SelectionInput
              onValueSelected={item => dispatch(setLocation(item.label))}
              data={violationLocations?.map(
                (item, index) =>
                  ({
                    label: item,
                    id: index.toString(),
                  } as ItemData),
              )}
              placeholderLabel={lokacija}
            />
          </View>
          <View style={style.inputContainer}>
            <TextInput
              placeholder={adresa}
              placeholderTextColor={ColorPallet.lightGray}
              onChangeText={value => dispatch(setAddress(value))}
            />
          </View>
          <View style={style.inputContainer}>
            <TextInput
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              placeholder={brTelefona}
              placeholderTextColor={ColorPallet.lightGray}
              onChangeText={value => dispatch(setPhoneNumber(value))}
            />
          </View>
          <View style={style.inputContainer}>
            <SelectionInput
              onValueSelected={item => {
                item.id && dispatch(setViolationCategory(item.id));
              }}
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
            onChangeText={value => dispatch(setDescription(value))}
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
              isLoading={isLoading}
              onPress={() => {
                setSendReport(true);
              }}
              text="Prijavi"
              isSmall
            />
          </View>
        </View>
      </ScrollView>
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
        onPressPositiveBtn={handleReport}
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
