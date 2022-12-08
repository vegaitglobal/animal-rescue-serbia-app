import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
import {Switch} from '../components/Switch';

export const ReportScreen = () => {
  const violationCategories = useAppSelector(getViolationCategories);
  const violationLocations = useAppSelector(getLocations);

  const dispatch = useAppDispatch();

  const headerTitle = 'Prijava prekršaja';
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!';

  const imeIPrezime = 'Ime i Prezime';
  const lokacija = 'Lokacija prekršaja';
  const adresa = 'Adresa prekršaja';
  const brTelefona = 'Broj telefona';
  const tipPrekrsaja = 'Tip prekršaja';
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
      setIsSendingReport(false);
      return;
    }

    setIsSendingReport(false);
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

      const imagesToSend = imagesOnly.map(file => ({
        name: extractFileNameFromPath(file.path),
        type: file.mime,
        uri: file.path,
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
      <ScrollView contentContainerStyle={style.scroll}>
        <View style={style.container}>
          <View style={style.toggleContainer}>
            <Text>Brza prijava</Text>
            <Switch
              value={isLiteReport}
              onValueChange={handleReportTypeChange}
            />
          </View>
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
            </>
          ) : null}
          <View style={style.buttonsContainer}>
            <CustomButton
              onPress={() => setDeclineModalVisible(true)}
              text="Odustani"
              style={style.mainButton}
            />
            <EmptySpace width={16} />
            <CustomButton
              isLoading={isSendingReport}
              onPress={() => {
                setSendReport(true);
              }}
              text="Nastavi"
              style={style.mainButton}
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
          <View style={style.buttonContainer}>
            <CustomButton
              textStyle={style.textStyle}
              onPress={handleGoBack}
              text={'Odustani'}
              isSmall={true}
              style={style.buttonStyle}
            />
          </View>
        }
      />
      {isSendingReport ? (
        <View style={style.screenBlockingElement}>
          <ActivityIndicator />
        </View>
      ) : null}
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
