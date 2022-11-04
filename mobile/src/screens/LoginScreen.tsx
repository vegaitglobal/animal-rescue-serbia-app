import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {TextInput} from '../components/TextInput';
import {ColorPallet} from '../resources/ColorPallet';
import {useAppDispatch} from '../hooks/storeHooks';
import {logIn} from '../store/src/authentication/actions';
import {
  loadLocations,
  loadViolationCategories,
} from '../store/src/reports/actions';
import {LoginSocialButtons} from './components/LoginSocialButtons';

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

    const result = await dispatch(logIn({email, password}));

    setIsSigningIn(false);

    if (result.meta.requestStatus === 'rejected') {
      return;
    }

    const categoryResult = await dispatch(loadViolationCategories());

    if (categoryResult.meta.requestStatus === 'rejected') {
      return;
    }

    const locationResult = await dispatch(loadLocations());

    if (locationResult.meta.requestStatus === 'rejected') {
      return;
    }

    navigation.replace('HomeScreen');
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
          placeholder={lozinka}
          placeholderTextColor={ColorPallet.lightGray}
        />
        <Text style={styles.password}>{zaboravljenaLozinka}</Text>
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
              onPress={() => navigation.navigate('Registration')} //TODO change
            />
          </View>
          <View style={styles.socialButtonContainer}>
            <LoginSocialButtons />
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
