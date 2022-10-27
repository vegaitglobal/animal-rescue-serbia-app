import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {TextInput} from '../components/TextInput';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {ColorPallet} from '../resources/ColorPallet';
import {
  register,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setPasswordConfirmed,
  setUsername,
} from '../store/src/authentication/actions';
import {getNewRegistration} from '../store/src/authentication/selectors';

export const RegistrationScreen = () => {
  const headerTitle = 'Registracija';
  const ime = 'Ime';
  const prezime = 'Prezime';
  const emailPlaceholder = 'E-mail';
  const uredu = 'u redu';
  const lozinka = 'Lozinka';
  const confirmPasswordPlaceholder = 'Potvrdi lozinku';
  const usernamePlaceholder = 'Korisnicko ime';

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const registrationData = useAppSelector(getNewRegistration);

  const {email, username, firstName, lastName, password, passwordConfirmed} =
    registrationData;

  const [isLoading, setIsLoading] = useState(false);

  const onRegisterPress = useCallback(async () => {
    setIsLoading(true);

    const result = await dispatch(register(registrationData));

    setIsLoading(false);

    if (result.meta.requestStatus === 'rejected') {
      console.log('Registration failed');
      return;
    }

    navigation.navigate('HomeScreen');
  }, [dispatch, navigation, registrationData]);

  return (
    <ScreenRootContainer title={headerTitle} showLogo hideGoBack>
      <View style={style.container}>
        <View style={style.rootInputContainer}>
          <View style={style.inputContainer}>
            <TextInput
              value={firstName}
              //Try creating bind function for this scenario
              onChangeText={text => dispatch(setFirstName(text))}
              placeholder={ime}
              placeholderTextColor={ColorPallet.lightGray}
            />
          </View>
          <View style={style.inputContainer}>
            <TextInput
              value={lastName}
              onChangeText={text => dispatch(setLastName(text))}
              placeholder={prezime}
              placeholderTextColor={ColorPallet.lightGray}
            />
          </View>
          <View style={style.inputContainer}>
            <TextInput
              value={email}
              onChangeText={text => dispatch(setEmail(text))}
              placeholder={emailPlaceholder}
              placeholderTextColor={ColorPallet.lightGray}
            />
          </View>
          <View style={style.inputContainer}>
            <TextInput
              value={username}
              onChangeText={text => dispatch(setUsername(text))}
              placeholder={usernamePlaceholder}
              placeholderTextColor={ColorPallet.lightGray}
            />
          </View>
          <TextInput
            value={password}
            onChangeText={text => dispatch(setPassword(text))}
            secureTextEntry={true}
            keyboardType={'default'}
            textContentType={'password'}
            autoCapitalize={'none'}
            placeholder={lozinka}
            placeholderTextColor={ColorPallet.lightGray}
          />
          <TextInput
            value={passwordConfirmed}
            onChangeText={text => dispatch(setPasswordConfirmed(text))}
            secureTextEntry={true}
            keyboardType={'default'}
            textContentType={'password'}
            autoCapitalize={'none'}
            placeholder={confirmPasswordPlaceholder}
            placeholderTextColor={ColorPallet.lightGray}
          />
        </View>
        <View style={style.buttonContainer}>
          <CustomButton
            isLoading={isLoading}
            onPress={onRegisterPress}
            text={uredu}
          />
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
  rootInputContainer: {
    flex: 1,
  },
});
