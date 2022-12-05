import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {EmptySpace} from '../components/EmptySpace';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import UserAvatar from '../assets/icons/userAvatar.svg';
import {useAppDispatch} from '../hooks/storeHooks';
import {signOut} from '../store/src/authentication/actions';
import {useNavigation} from '@react-navigation/native';

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleSignOut = () => {
    dispatch(signOut());
    navigation.navigate('Login');
  };
  return (
    <ScreenRootContainer title="Profil" showLogo>
      <View style={styles.container}>
        <View style={styles.userDataHeaderContainer}>
          <View style={styles.profilePicturePlaceholderContainer}>
            <UserAvatar width={100} height={100} />
          </View>

          <EmptySpace width={30} />

          <View style={styles.userInfoContainer}>
            <Text style={styles.userFullNameText}>John Doe</Text>

            <EmptySpace height={4} />

            <Text style={styles.emailText}>j.doe@gmail.com</Text>

            <EmptySpace height={16} />

            <View style={styles.bubbleButtonContainer}>
              <Text style={styles.bubbleButtonText}>Uredi profil</Text>
            </View>
          </View>
        </View>

        <EmptySpace height={50} />

        <CustomButton text="Istorija prijava" onPress={() => {}} />

        <EmptySpace height={buttonSpacing} />

        <CustomButton text="Moje novosti" onPress={() => {}} />

        <EmptySpace height={buttonSpacing} />

        <CustomButton text="Moji oglasi" onPress={() => {}} />

        <EmptySpace height={buttonSpacing} />

        <CustomButton text="Odjavi se" onPress={handleSignOut} />
      </View>
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
  },
  userFullNameText: {
    fontSize: 20,
    fontWeight: '700',
    color: ColorPallet.plainBlack,
  },
  emailText: {
    fontWeight: '600',
  },
  userInfoContainer: {
    justifyContent: 'flex-end',
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
