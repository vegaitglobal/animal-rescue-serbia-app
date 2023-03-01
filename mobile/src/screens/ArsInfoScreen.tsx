import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {AccentedTextBox} from '../components/AccentedTextBox';
import {EmptySpace} from '../components/EmptySpace';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import {DefaultSocialButtons} from '../components/DefaultSocialButtons';

export const ArsInfoScreen = () => {
  const aboutUs =
    'Animal Rescue Serbia (ARS) je prvo zvanično neprofitno udruženje građana koje dobrovoljno spasava životinje u Srbiji. Finansirano od strane donacija, vrši besplatno spasavanje u 5 opština: Beograd, Novi Sad, Niš, Srbobran i Vršac.';

  //const telephoneNumber = '+38164 8210200';
  const email = 'ars@ars.com';

  return (
    <ScreenRootContainer title="Animal rescue serbia">
      <View style={styles.rootContainer}>
        <EmptySpace height={60} />

        <Text style={styles.aboutUsText}>{aboutUs}</Text>

        <EmptySpace height={20} />

        <View style={styles.contactRowContainer}>
          <Text style={styles.contact}>Kontakt</Text>
          <View style={styles.socialButtonContainer}>
            <DefaultSocialButtons />
          </View>
        </View>

        <EmptySpace height={16} />

        {/* <AccentedTextBox
          title="Telefon:"
          onPress={() => Linking.openURL(`tel:${telephoneNumber}`)}>
          {telephoneNumber}
        </AccentedTextBox> */}

        <EmptySpace height={textBoxSpacing} />

        <AccentedTextBox
          title="e-Pošta"
          onPress={() => Linking.openURL(`mailto:${email}`)}>
          {email}
        </AccentedTextBox>
      </View>
    </ScreenRootContainer>
  );
};

const textBoxSpacing = 4;

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 32,
  },
  aboutUsText: {
    color: ColorPallet.plainBlack,
    fontSize: 16,
  },
  contact: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5,
  },
  contactRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialButtonContainer: {
    width: 110,
  },
});
