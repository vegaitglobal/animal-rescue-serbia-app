import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {CustomButton} from '../components/CustomButton';
import {EmptySpace} from '../components/EmptySpace';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {TextInput} from '../components/TextInput';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {
  setPasswordUpdateData,
  updatePassword,
} from '../store/src/profile/actions';
import {getPasswordUpdateData} from '../store/src/profile/selectors';

export const PasswordUpdateScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const {oldPassword, password, passwordConfirm} = useAppSelector(
    getPasswordUpdateData,
  );

  const handleSave = async () => {
    const result = await dispatch(updatePassword());
    if (result.meta.requestStatus === 'rejected') {
      Toast.show({
        type: 'error',
        text1: 'Azuriranje lozinke nije uspelo',
        text2: 'Proverite podatke i pokusajte ponovo',
        position: 'bottom',
      });
    }

    Toast.show({
      type: 'success',
      text1: 'Azuriranje uspesno',
      position: 'bottom',
    });

    navigation.goBack();
  };
  return (
    <ScreenRootContainer title="Promeni lozinku">
      {/* // TODONFFF: Util for this */}
      <View style={styles.screenContainer}>
        <TextInput
          autoCapitalize={'none'}
          value={oldPassword}
          placeholder="Stara lozinka"
          onChangeText={text =>
            dispatch(setPasswordUpdateData({oldPassword: text}))
          }
        />
        <TextInput
          secureTextEntry
          keyboardType={'default'}
          textContentType={'password'}
          autoCapitalize={'none'}
          value={password}
          placeholder="Nova lozinka"
          onChangeText={text =>
            dispatch(setPasswordUpdateData({password: text}))
          }
        />
        <TextInput
          secureTextEntry
          keyboardType={'default'}
          textContentType={'password'}
          autoCapitalize={'none'}
          value={passwordConfirm}
          placeholder="Ponovi novu lozinku"
          onChangeText={text =>
            dispatch(setPasswordUpdateData({passwordConfirm: text}))
          }
        />

        <EmptySpace height={40} />

        <CustomButton text="Sacuvaj" onPress={handleSave} />
      </View>
    </ScreenRootContainer>
  );
};

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
});
