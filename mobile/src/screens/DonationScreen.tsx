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
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {EmptySpace} from '../components/EmptySpace';

export const DonationScreen = () => {
  const donationCauses = [
    {
      label: 'Donacija za PRIJAVI',
      popupText: 'Donacija za dalji razvoj aplikacije prijavi',
    },
    {
      label: 'Donacija za RC',
      popupText: 'Donacija za pomoć životinjama u ARS rehabilitacionom centru',
    },
    {
      label: 'Donacija za SPASAVANJE',
      popupText:
        'Donacija za tehničko spasavanje životinja - sa visina, iz dubina i sa vode',
    },
    {
      label: 'Donacija za MVE',
      popupText:
        'Donacija za edukaciju osnovaca i srednjoškolaca kroz program Mjau-vau ekspert',
    },
    {
      label: 'Donacija za STH',
      popupText:
        'Donacija za sakupljanje hrane za napuštene životinje kroz projekat "Sto tona hrane"',
    },
    {
      label: 'Donacija za prava životinja',
      popupText: 'Donacija za pravnu pomoć i promenu zakona',
    },
    {
      label: 'Donacija za BPKŽ',
      popupText: 'Donacija za borbu protiv krijumčarenja životinja',
    },
    {label: 'Donacija za BPP', popupText: 'Donacija za borbu protiv petardi'},
    {
      label: 'Donacija za kućice',
      popupText:
        'Donacija za pravljenje i postavljanje, kućica, hranilica i pojilica, za napuštene pse, mačke i ptice',
    },
    {
      label: 'Donacija za ARS',
      popupText:
        'donacija za rad organizacije, gde se donirana sredstva, raspoređuju prema prioritetnim potrebama',
    },
  ];
  return (
    <ScreenRootContainer title={'Doniraj'} showLogo>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.donationContainer}>
            <AccentedBoxWithCopyOption title="Devizni racun:">
              IBAN RS35205007080004418763
            </AccentedBoxWithCopyOption>
          </View>
          <View style={styles.donationContainer}>
            <AccentedBoxWithCopyOption title="Dinarski racun:">
              205-230047-05
            </AccentedBoxWithCopyOption>
          </View>
          <View style={styles.donationContainer}>
            <AccentedBoxWithCopyOption title="PayPal:">
              info@animalrescueserbia.org
            </AccentedBoxWithCopyOption>
          </View>
          <Text style={styles.donationCauseTitle}>Svrhe uplate:</Text>
          <>
            {donationCauses.map(cause => (
              <TouchableOpacity
                onPress={() =>
                  Toast.show({
                    text2: cause.popupText,
                    position: 'bottom',
                    type: 'info',
                  })
                }
                style={styles.donationCauseItem}>
                <Text key={cause.label}>{cause.label}</Text>
              </TouchableOpacity>
            ))}
          </>
          <EmptySpace height={30} />
        </View>
      </ScrollView>
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
  donationContainer: {
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5,
  },
  donationCauseTitle: {
    textAlign: 'justify',
    paddingTop: 20,
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5,
  },
  donationCauseItem: {
    height: 40,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 5,
    paddingStart: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
