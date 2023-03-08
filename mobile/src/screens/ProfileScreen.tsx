import React, {useCallback, useEffect, useState} from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {EmptySpace} from '../components/EmptySpace';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {useNavigation} from '@react-navigation/native';
import {getUsers} from '../store/src/profile/selectors';
import {loadCurrentUser, signOut} from '../store/src/profile/actions';
import {ActivityIndicator} from '../components/ActivityIndicator';
import {Constants} from '../resources/Constants';

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const handleSignOut = () => {
    dispatch(signOut());
    navigation.replace('Login');
  };

  const loadUsersData = useCallback(async () => {
    setIsLoading(true);

    await dispatch(loadCurrentUser());

    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadUsersData();
  }, [loadUsersData]);

  const user = useAppSelector(getUsers);

  const handleProfileUpdatePress = () => navigation.navigate('ProfileUpdate');
  const handleChangePasswordPress = () => navigation.navigate('PasswordUpdate');

  return (
    <ScreenRootContainer title="Profil" showLogo>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.userDataHeaderContainer}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <View style={styles.userInfoContainer}>
                <Text
                  numberOfLines={2}
                  style={styles.userFirstNameText}>{`${user.firstName}`}</Text>

                <EmptySpace height={4} />

                <Text style={styles.emailText}>{user.email}</Text>

                <EmptySpace height={16} />

                <Pressable onPress={handleProfileUpdatePress}>
                  <View style={styles.bubbleButtonContainer}>
                    <Text style={styles.bubbleButtonText}>Uredi profil</Text>
                  </View>
                </Pressable>
              </View>
            )}
          </View>

          <EmptySpace height={50} />
          {/*
        <CustomButton text="Istorija prijava" onPress={() => {}} />

        <EmptySpace height={buttonSpacing} />

        <CustomButton text="Moje novosti" onPress={() => {}} />

        <EmptySpace height={buttonSpacing} />

        <CustomButton text="Moji oglasi" onPress={() => {}} /> */}

          <EmptySpace height={buttonSpacing} />

          <CustomButton
            text="Uslovi korišćenja i sadržaj"
            onPress={() => Linking.openURL(Constants.termsAndConditionsUrl)}
          />

          <EmptySpace height={20} />

          <CustomButton
            text="Promeni lozinku"
            onPress={handleChangePasswordPress}
          />

          <EmptySpace height={20} />

          <CustomButton text="Odjavi se" onPress={handleSignOut} />
        </View>
      </ScrollView>
    </ScreenRootContainer>
  );
};

const buttonSpacing = 30;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: ColorPallet.plainWhite,
    flex: 1,
  },
  btnContainer: {
    paddingTop: 50,
  },
  bubbleButtonContainer: {
    borderColor: ColorPallet.plainBlack,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  bubbleButtonText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    color: ColorPallet.plainBlack,
    alignSelf: 'center',
    fontSize: 17,
  },
  userFirstNameText: {
    fontSize: 40,
    fontWeight: '700',
    color: ColorPallet.plainBlack,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 25,
    fontWeight: '600',
  },
  userInfoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  profilePicturePlaceholderContainer: {
    borderWidth: 2,
    borderColor: ColorPallet.plainBlack,
    paddingHorizontal: 10,
    flexShrink: 1,
    width: 132,
    height: 132,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDataHeaderContainer: {
    flexDirection: 'row',
  },
});
