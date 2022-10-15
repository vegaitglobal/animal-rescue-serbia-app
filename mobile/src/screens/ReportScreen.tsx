import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import Report from '../assets/icons/educationGrayBg.svg';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {getNewReport} from '../store/src/reports/selectors';
import {TextInput} from '../components/TextInput';
import {CustomButton} from '../components/CustomButton';
import {SelectionInput} from '../components/SelectionInput';
import {MultilineTextInput} from '../components/MulitilineTextInput';
import {CustomModalWithButton} from '../components/CustomModalWithButton';
import {useNavigation} from '@react-navigation/native';

export const ReportScreen = () => {
  const {firstName, lastName} = useAppSelector(getNewReport);
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

  return (
    <ScreenRootContainer title={headerTitle} showLogo>
      <View style={style.container}>
        <View style={style.inputContainer}>
          <TextInput
            placeholder={imeIPrezime}
            placeholderTextColor={ColorPallet.lightGray}
          />
        </View>
        <View style={style.inputContainer}>
          <SelectionInput
            onValueSelected={item => console.log('Test: ', item)}
            data={[
              {id: 'asdd', label: 'Prvi izbor'},
              {id: 'aasd', label: 'Drugi izbor'},
              {id: 'asfasfas', label: 'Treci izbor'},
            ]}
            placeholderLabel={lokacija}
          />
        </View>
        <View style={style.inputContainer}>
          <TextInput
            placeholder={adresa}
            placeholderTextColor={ColorPallet.lightGray}
          />
        </View>
        <View style={style.inputContainer}>
          <TextInput
            placeholder={brTelefona}
            placeholderTextColor={ColorPallet.lightGray}
          />
        </View>
        <View style={style.inputContainer}>
          <SelectionInput
            onValueSelected={item => console.log('Test: ', item)}
            data={[
              {id: 'asdd', label: 'Prvi izbor'},
              {id: 'aasd', label: 'Drugi izbor'},
              {id: 'asfasfas', label: 'Treci izbor'},
            ]}
            placeholderLabel={tipPrekrsaja}
          />
        </View>
        <View style={style.photoContainer}>
          <Text style={style.text}>{fotoVideo}</Text>
          <CustomButton onPress={() => {}} text="Dodaj" isSmall />
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
            onPress={() => setSendReport(true)}
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
    paddingTop: 50,
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
