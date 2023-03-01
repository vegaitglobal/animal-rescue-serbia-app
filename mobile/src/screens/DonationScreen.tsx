import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  AccentedTextBox,
  AccentedTextBoxProps,
} from '../components/AccentedTextBox';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import CopyIcon from '../assets/icons/copy.svg';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ScrollView} from 'react-native-gesture-handler';

export const DonationScreen = () => {
  return (
    <ScreenRootContainer title={'Doniraj'} showLogo>
      <ScrollView>
        <View style={style.container}>
          <View style={style.donationContainer}>
            <AccentedBoxWithCopyOption title="Devizni racun:">
              IBAN RS35205007080004418763
            </AccentedBoxWithCopyOption>
          </View>
          <View style={style.donationContainer}>
            <AccentedBoxWithCopyOption title="Dinarski racun:">
              205-230047-05
            </AccentedBoxWithCopyOption>
          </View>
          <View style={style.donationContainer}>
            <AccentedBoxWithCopyOption title="PayPal:">
              info@animalrescueserbia.org
            </AccentedBoxWithCopyOption>
          </View>
          <Text style={{textAlign: 'justify', paddingTop: 20}}>
            {
              'Svrhe uplate: \n\nDonacija za PRIJAVI\nDonacija za RC\nDonacija za SPASAVANJE\nDonacija za MVE\nDonacija za STH\nDonacija za prava životinja\nDonacija za BPKŽ\nDonacija za BPP\nDonacija za kućice\nDonacija za ARS'
            }
          </Text>
        </View>
      </ScrollView>
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
  donationContainer: {
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5,
  },
});

export const AccentedBoxWithCopyOption = ({
  title,
  children,
  ...accentedTextBoxProps
}: AccentedTextBoxProps & {children: string}) => {
  const copyToClipboard = () => {
    Clipboard.setString(children);
    Toast.show({
      text1: 'Tekst uspešno kopiran',
      text2: children,
      position: 'bottom',
      type: 'info',
    });
  };

  return (
    <AccentedTextBox
      rightSideElement={<CopyIcon width={30} height={30} />}
      onPress={copyToClipboard}
      title={title}
      {...accentedTextBoxProps}>
      {children}
    </AccentedTextBox>
  );
};
