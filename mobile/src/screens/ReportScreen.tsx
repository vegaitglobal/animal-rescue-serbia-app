import React, {useCallback, useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
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
  sendLiteViolation,
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
import {EmptySpace} from '../components/EmptySpace';
import {useAndroidBackNavigationOverride} from '../hooks/useAndroidBackNavigationOverride';
import {ActivityIndicator} from '../components/ActivityIndicator';
import {FormFile} from '../store/src/reports/types';
import Toast from 'react-native-toast-message';
import * as FileSystem from 'expo-file-system';

export const ReportScreen = () => {
  const violationCategories = useAppSelector(getViolationCategories);
  const violationLocations = useAppSelector(getLocations);

  const dispatch = useAppDispatch();

  const headerTitle = 'Prijava';
  const text =
    'Molimo Vas da prjavljujete samo slučajeve u kojima ste direktni učesnik, svedok ili oštećena strana (prijave koje se temelje na glasinama nećemo obrađivati).';

  const imeIPrezime = 'Ime i Prezime*';
  const lokacija = 'Lokacija prekršaja*';
  const adresa = 'Adresa prekršaja*';
  const brTelefona = 'Broj telefona*';
  const tipPrekrsaja = 'Tip prekršaja*';
  const fotoVideo = 'Fotografija / video';

  const navigation = useNavigation();
  const [isEntryModalVisible, setIsEntryModalVisible] = useState(false);
  const [isDeclineModalVisible, setDeclineModalVisible] = useState(false);
  const [isSendReportModalVisible, setSendReport] = useState(false);
  const violation = useAppSelector(getNewViolation);
  const [isSendingReport, setIsSendingReport] = useState(false);

  useEffect(() => setIsEntryModalVisible(true), []);

  useAndroidBackNavigationOverride(() => {
    return isSendingReport;
  });

  const [isLiteReport, setIsLiteReport] = useState(false);

  const handleReport = useCallback(async () => {
    setSendReport(false);

    setIsSendingReport(true);

    const actionToDispatch = isLiteReport
      ? sendLiteViolation({
          location: violation.location,
          violationCategoryId: violation.violationCategoryId,
        })
      : sendViolation(violation);
    const result = await dispatch(actionToDispatch as any);
    if (result.meta.requestStatus === 'rejected') {
      console.log('Report failed');
      Toast.show({
        text1: 'Prijava neuspešna',
        text2: 'Molimo proverite podatke i probajte ponovo',
        position: 'bottom',
        type: 'error',
      });
      setIsSendingReport(false);
      return;
    }

    setIsSendingReport(false);
    Toast.show({text1: 'Uspešno ste prijavili slučaj', position: 'bottom'});
    navigation.goBack();
  }, [dispatch, isLiteReport, navigation, violation]);

  const handleGoBack = () => setSendReport(false);

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

      console.log('COMPRESSSED ONES: ', compressedVideoFilePaths);

      const compressedVideoFilePathsFiltered = compressedVideoFilePaths.filter(
        path => !!path,
      ) as string[];

      console.log('COMPRESSSED Filtered: ', compressedVideoFilePathsFiltered);

      const videosToSend: FormFile[] = compressedVideoFilePathsFiltered.map(
        (path, index) => {
          const video: SelectionResult = videosOnly[index];
          return {
            uri: path,
            name: extractFileNameFromPath(video.path),
            type: video.mime,
          };
        },
      );

      console.log('COMPRESSSED TO SEND: ', videosToSend);

      const file = imagesOnly[0];

      //if (Platform.OS === 'ios' && file.mime === 'image/jpeg') {
      const originalUri = 'file:///' + file.path.substring(1);
      //FileSystem.
      const newUri =
        'file://' +
        `${FileSystem.documentDirectory?.substring(
          7,
        )}resumableUploadManager-${extractFileNameFromPath(file.path)}.jpeg`;

      console.log('ORIGINALLL: ', originalUri);
      console.log('newURI: ', newUri);

      await FileSystem.copyAsync({
        from: originalUri,
        to: newUri,
      });
      // blob = new Blob([await (await fetch(uri)).blob()], {
      //   type: 'image/jpeg',
      // });
      //}

      const imagesToSend =
        //imagesOnly
        [{path: newUri, mime: 'image/jpeg'}].map(file2 => ({
          name: extractFileNameFromPath(file2.path),
          type: file2.mime,
          uri: file2.path,
        }));

      dispatch(setFiles([...videosToSend, ...imagesToSend]));
    },
    [dispatch],
  );

  useEffect(
    () => () => {
      dispatch(unsetViolation());
    },
    [dispatch],
  );

  const handleReportTypeChange = () => {
    setIsLiteReport(currentValue => !currentValue);
  };

  return (
    <ScreenRootContainer title={headerTitle} showLogo>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          {!isLiteReport ? (
            <View style={styles.liteReportContainer}>
              <CustomButton
                onPress={handleReportTypeChange}
                text="Brza prijava"
                style={styles.mainButton}
              />
            </View>
          ) : null}
          {!isLiteReport ? (
            <TextInput
              value={violation.fullName}
              placeholder={imeIPrezime}
              placeholderTextColor={ColorPallet.lightGray}
              onChangeText={value => {
                dispatch(setNameSurname(value));
              }}
            />
          ) : null}

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

          {!isLiteReport ? (
            <>
              <TextInput
                placeholder={adresa}
                placeholderTextColor={ColorPallet.lightGray}
                onChangeText={value => dispatch(setAddress(value))}
              />

              <TextInput
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                placeholder={brTelefona}
                placeholderTextColor={ColorPallet.lightGray}
                onChangeText={value => dispatch(setPhoneNumber(value))}
              />
            </>
          ) : null}
          <View>
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
          {!isLiteReport ? (
            <>
              <View style={styles.photoContainer}>
                <ImageUploadElement
                  placeholderText={fotoVideo}
                  onFilesSelected={onFilesSelected}
                />
              </View>
              <MultilineTextInput
                onChangeText={value => dispatch(setDescription(value))}
                style={styles.textInputContainer}
                placeholder="Opis"
              />
            </>
          ) : null}
          <View style={styles.buttonsContainer}>
            <CustomButton
              onPress={() => setDeclineModalVisible(true)}
              text="Odustani"
              style={styles.mainButton}
            />
            <EmptySpace width={16} />
            <CustomButton
              onPress={() => {
                setSendReport(true);
              }}
              text="Nastavi"
              style={styles.mainButton}
            />
          </View>
          <EmptySpace height={60} />
        </View>
      </ScrollView>
      <CustomModal
        title={headerTitle}
        text={text}
        icon={<Report width={100} height={100} />}
        onPress={() => setIsEntryModalVisible(false)}
        visible={isEntryModalVisible}
      />
      <CustomModalWithButton
        text={text}
        icon={<Report width={100} height={100} />}
        buttonPositive="Vrati se na tekst"
        buttonNegative="Odustani"
        onPressPositiveBtn={() => setDeclineModalVisible(false)}
        onPressNegativeBtn={() => navigation.goBack()}
        visible={isDeclineModalVisible}
      />
      <CustomModalWithButton
        buttonStyle={{marginHorizontal: 20}}
        isOneButtonModal
        title="Saglasnost"
        text={
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae dignissimos quasi aliquid '
        }
        icon={<Report width={100} height={100} />}
        buttonPositive="Prijavi"
        onPressPositiveBtn={handleReport}
        visible={isSendReportModalVisible}
        additionalButton={
          <View style={styles.buttonContainer}>
            <CustomButton
              textStyle={styles.textStyle}
              onPress={handleGoBack}
              text={'Odustani'}
              isSmall={true}
              style={styles.buttonStyle}
            />
          </View>
        }
      />
      {isSendingReport ? (
        <View style={styles.screenBlockingElement}>
          <ActivityIndicator />
        </View>
      ) : null}
    </ScreenRootContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 25,
    backgroundColor: ColorPallet.plainWhite,
    flex: 1,
  },
  text: {
    color: ColorPallet.lightGray,
    fontSize: 18,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  textInputContainer: {
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  mainButton: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  screenBlockingElement: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: ColorPallet.black_20,
    zIndex: 10,
    flex: 1,
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  liteReportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 30,
    alignSelf: 'flex-end',
    marginHorizontal: 20,
  },
  textStyle: {
    fontSize: 12,
  },
  buttonContainer: {
    flex: 1,
  },
});
