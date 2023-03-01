import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {StripedBar} from '../components/StripedBar';
import Logo from '../assets/icons/megaphoneLogo.svg';
import {ColorPallet} from '../resources/ColorPallet';
import Toast from 'react-native-toast-message';

export const SosScreen = () => {
  const phoneNumber = '+38164 8210200';

  return (
    <ScreenRootContainer title={'Sos poziv'}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo width={100} height={100} />
        </View>
        <View
          style={{
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            overflow: 'hidden',
            borderColor: ColorPallet.lightGray,
            borderTopWidth: 1,
            borderStartWidth: 1,
            borderEndWidth: 1,
          }}>
          <StripedBar />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {'Da li ste sigurni da želite uputiti poziv?'}
          </Text>
          <Text style={[styles.commonText, styles.messageText]}>
            {
              'Klikom na SOS, upućujete poziv Animal Rescue Serbia koji vam može pomoći oko problema u kom se nalazite.'
            }
          </Text>
          <Text style={styles.commonText}>
            {'*poziv se ne naplaćuje, već važe cene operatera'}
          </Text>
          <Text style={[styles.commonText, styles.additionalNote]}>
            {
              '*odazivamo se samo na telefonske pozive sa identifikacionim brojem, a svi pozivi se snimaju u svrhu poboljšanja usluga'
            }
          </Text>
          <CustomButton
            onPress={() => {
              Toast.show({
                text1: 'Poziv za tehničko spasavanje trenutno nije u funkciji',
                position: 'bottom',
                type: 'info',
              });
              //Linking.openURL(`tel:${phoneNumber}`);
            }}
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
    textAlign: 'center',
    fontWeight: '600',
    color: ColorPallet.plainBlack,
  },
  textContainer: {
    backgroundColor: ColorPallet.plainWhite,
    alignItems: 'center',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderColor: ColorPallet.lightGray,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: ColorPallet.plainWhite,
    borderColor: ColorPallet.plainBlack,
    borderWidth: 1,
    marginTop: 30,
    marginHorizontal: 40,
    marginBottom: 20,
  },
  commonText: {
    paddingTop: 30,
    textAlign: 'center',
    paddingHorizontal: 30,
    color: ColorPallet.plainBlack,
  },
  messageText: {
    fontSize: 16,
  },
  logoContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  additionalNote: {
    paddingTop: 10,
  },
});
