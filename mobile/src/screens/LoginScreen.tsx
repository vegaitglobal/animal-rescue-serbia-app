import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {TextInput} from '../components/TextInput';
import {ColorPallet} from '../resources/ColorPallet';
import {SocialButtons} from '../components/SocialButtons';

export const LoginScreen = () => {
  const headerTitle = 'Dobro došli';
  const screenTitle = 'Ulogujete se na vaš nalog';
  const korisnickoIme = 'Korisničko ime';
  const lozinka = 'Lozinka';
  const zaboravljenaLozinka = 'Zaboravljena lozinka?';
  const prijaviteSe = 'Prijavite se';
  const nemateNalog = 'Nemate nalog?';
  const registracija = 'Registrujte se';
  const ili = 'ili';

  const navigation = useNavigation();

  return (
    <ScreenRootContainer title={headerTitle} showLogo hideGoBack>
      <View style={style.container}>
        <Text style={style.screenTitle}>{screenTitle}</Text>
        <View style={style.inputContainer}>
          <TextInput
            placeholder={korisnickoIme}
            placeholderTextColor={ColorPallet.lightGray}
          />
        </View>
        <TextInput
          placeholder={lozinka}
          placeholderTextColor={ColorPallet.lightGray}
        />
        <Text style={style.password}>{zaboravljenaLozinka}</Text>
        <View style={style.buttonContainer}>
          <CustomButton
            text={prijaviteSe}
            onPress={() => navigation.navigate('HomeScreen')} //TODO change
          />
        </View>
        <View style={style.registrationContainer}>
          <Text style={style.password}>{nemateNalog}</Text>
          <View style={style.buttonContainer}>
            <CustomButton
              text={registracija}
              onPress={() => navigation.navigate('Registration')} //TODO change
            />
          </View>
          <SocialButtons />
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
  buttonContainer: {
    marginTop: 20,
  },
  registrationContainer: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
});
