import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {StripedBar} from '../components/StripedBar';
import Logo from '../assets/icons/megaphoneLogo.svg';
import {ColorPallet} from '../resources/ColorPallet';

export const SosScreen = () => {
  const phoneNumber = '225883';

  return (
    <ScreenRootContainer title={'Sos poziv'}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo width={100} height={100} />
        </View>
        <StripedBar />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {'Da li ste sigurni da želite uputiti poziv?'}
          </Text>
          <Text style={styles.commonStyle}>
            {
              'Klikom na SOS, upućujete poziv Animal Rescue Serbia koji vam može pomoći sa problemom u kom se nalazite.'
            }
          </Text>
          <Text style={styles.commonStyle}>
            {'*poziv se ne naplaćuje, već važe cene operatera'}
          </Text>
          <CustomButton
            onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
            text="Pozovi"
            style={styles.button}
          />
        </View>
      </View>
    </ScreenRootContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: ColorPallet.yellow,
    flex: 1,
  },
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
    paddingTop: 20,
  },
  textContainer: {
    backgroundColor: ColorPallet.plainWhite,
    alignItems: 'center',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  button: {
    backgroundColor: ColorPallet.plainWhite,
    borderColor: ColorPallet.plainBlack,
    borderWidth: 1,
    marginTop: 30,
  },
  commonStyle: {
    paddingTop: 30,
  },
  logoContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});
