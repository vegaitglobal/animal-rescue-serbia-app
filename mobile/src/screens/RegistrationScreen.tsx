import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {TextInput} from '../components/TextInput';
import {ColorPallet} from '../resources/ColorPallet';

export const RegistrationScreen = () => {
  const headerTitle = 'Registracija';
  const ime = 'Ime';
  const prezime = 'Prezime';
  const email = 'E-mail';
  const uredu = 'u redu';
  const lozinka = 'Lozinka';

  return (
    <ScreenRootContainer title={headerTitle} showLogo hideGoBack>
      <View style={style.container}>
        <View style={{flex: 1}}>
          <View style={style.inputContainer}>
            <TextInput
              placeholder={ime}
              placeholderTextColor={ColorPallet.lightGray}
            />
          </View>
          <View style={style.inputContainer}>
            <TextInput
              placeholder={prezime}
              placeholderTextColor={ColorPallet.lightGray}
            />
          </View>
          <View style={style.inputContainer}>
            <TextInput
              placeholder={email}
              placeholderTextColor={ColorPallet.lightGray}
            />
          </View>
          <TextInput
            placeholder={lozinka}
            placeholderTextColor={ColorPallet.lightGray}
          />
        </View>
        <View style={style.buttonContainer}>
          <CustomButton onPress={() => {}} text={uredu} />
        </View>
      </View>
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
  screenTitle: {
    fontSize: 18,
    textTransform: 'uppercase',
    alignSelf: 'center',
    paddingBottom: 30,
  },
  inputContainer: {
    marginBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  password: {
    alignSelf: 'center',
    paddingTop: 20,
    fontSize: 15,
  },

  registrationContainer: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  text: {
    color: ColorPallet.lightGray,
    fontSize: 22,
  },
  secondContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'flex-start',
    paddingBottom: 20,
  },
});
