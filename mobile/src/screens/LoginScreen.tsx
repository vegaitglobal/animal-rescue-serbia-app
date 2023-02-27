import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {TextInput} from '../components/TextInput';
import {ColorPallet} from '../resources/ColorPallet';
import {useAppDispatch} from '../hooks/storeHooks';
import {logIn} from '../store/src/profile/actions';
import {
  loadLocations,
  loadViolationCategories,
} from '../store/src/reports/actions';
import {LoginSocialButtons} from './components/LoginSocialButtons';
import {unwrapResult} from '@reduxjs/toolkit';
import {DefaultSocialButtons} from '../components/DefaultSocialButtons';
import {EmptySpace} from '../components/EmptySpace';

export const LoginScreen = () => {
  const headerTitle = 'Dobro došli';
  const screenTitle = 'Ulogujete se na vaš nalog';
  const korisnickoIme = 'Email';
  const lozinka = 'Lozinka';
  const zaboravljenaLozinka = 'Zaboravljena lozinka?';
  const prijaviteSe = 'Prijavite se';
  const nemateNalog = 'Nemate nalog?';
  const registracija = 'Registrujte se';

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isSigningIn, setIsSigningIn] = useState<boolean>();

  const navigation = useNavigation();

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      return;
    }

    setIsSigningIn(true);

    try {
      const result = await dispatch(logIn({email, password}));
      const unwrappedLoginResult = unwrapResult(result);

      if (
        result.meta.requestStatus === 'rejected' ||
        !unwrappedLoginResult?.accessToken
      ) {
        return;
      }

      const categoryResult = await dispatch(loadViolationCategories());
      const unwrappedViolationCategoriesResult = unwrapResult(categoryResult);

      if (
        categoryResult.meta.requestStatus === 'rejected' ||
        !unwrappedViolationCategoriesResult
      ) {
        return;
      }

      const locationResult = await dispatch(loadLocations());
      const unwrappedLocationsResult = unwrapResult(locationResult);

      if (
        locationResult.meta.requestStatus === 'rejected' ||
        !unwrappedLocationsResult
      ) {
        return;
      }
    } catch (error) {
      console.log('Loging unsuccessful: ', error);
      return;
    } finally {
      setIsSigningIn(false);
    }

    navigation.replace('TabNavigator');
  }, [dispatch, email, navigation, password]);

  return (
    <ScreenRootContainer title={headerTitle} showLogo hideGoBack>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>{screenTitle}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={text => setEmail(text.trim())}
            value={email}
            placeholder={korisnickoIme}
            placeholderTextColor={ColorPallet.lightGray}
          />
        </View>
        <TextInput
          onChangeText={text => setPassword(text.trim())}
          value={password}
          secureTextEntry
          keyboardType={'default'}
          textContentType={'password'}
          autoCapitalize={'none'}
          placeholder={lozinka}
          placeholderTextColor={ColorPallet.lightGray}
        />
        {/* <Text style={styles.password}>{zaboravljenaLozinka}</Text> */}
        <EmptySpace height={10} />
        <View style={styles.buttonContainer}>
          <CustomButton
            text={prijaviteSe}
            onPress={handleLogin}
            isLoading={isSigningIn}
          />
        </View>
        <View style={styles.registrationContainer}>
          <Text style={styles.password}>{nemateNalog}</Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              text={registracija}
              onPress={() => navigation.navigate('Registration')}
            />
          </View>
          <View style={styles.socialButtonContainer}>
            <DefaultSocialButtons bubbleSize={50} />
          </View>
        </View>
      </View>
    </ScreenRootContainer>
  );
};

const styles = StyleSheet.create({
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
  socialButtonContainer: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },
});
