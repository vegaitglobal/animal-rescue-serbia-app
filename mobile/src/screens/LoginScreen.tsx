import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {TextInput} from '../components/TextInput';
import {ColorPallet} from '../resources/ColorPallet';
import {SocialButtons} from '../components/SocialButtons';
import {useAppDispatch} from '../hooks/storeHooks';
import {logIn} from '../store/src/authentication/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {unwrapResult} from '@reduxjs/toolkit';

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

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const navigation = useNavigation();

  const handleLogin = useCallback(async () => {
    //login dispatch
    if (!email || !password) {
      return;
    }

    const result = await dispatch(logIn({email, password}));
    if (result.meta.requestStatus === 'rejected') {
      return;
    }
    const unwraped = unwrapResult(result);
    AsyncStorage.setItem('accessToken', unwraped.accessToken);
    navigation.navigate('HomeScreen');
  }, [dispatch, email, navigation, password]);

  return (
    <ScreenRootContainer title={headerTitle} showLogo hideGoBack>
      <View style={style.container}>
        <Text style={style.screenTitle}>{screenTitle}</Text>
        <View style={style.inputContainer}>
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder={korisnickoIme}
            placeholderTextColor={ColorPallet.lightGray}
          />
        </View>
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder={lozinka}
          placeholderTextColor={ColorPallet.lightGray}
        />
        <Text style={style.password}>{zaboravljenaLozinka}</Text>
        <View style={style.buttonContainer}>
          <CustomButton text={prijaviteSe} onPress={handleLogin} />
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
