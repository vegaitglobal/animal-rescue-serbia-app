import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {AccentedTextBox} from '../components/AccentedTextBox';
import {EmptySpace} from '../components/EmptySpace';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {SocialButtons} from '../components/SocialButtons';
import {ColorPallet} from '../resources/ColorPallet';
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';
import Globe from '../assets/icons/globe.svg';

type SocialIconType = 'instagram' | 'facebook' | 'website';

export const ArsInfoScreen = () => {
  const aboutUs =
    'Animal Rescue Serbia (ARS) je prvo zvanično neprofitno udruženje građana koje dobrovoljno spasava životinje u Srbiji. Finansirano od strane donacija, vrši besplatno spasavanje u 5 opština: Beograd, Novi Sad, Niš, Srbobran i Vršac.';

  const handleSocialIconPress = (id: SocialIconType) => {
    switch (id) {
      case 'instagram': {
        Linking.openURL('https://www.instagram.com/animal_rescue_serbia');
        return;
      }
      case 'facebook': {
        Linking.openURL('https://www.facebook.com/animalrescueserbia/');
        return;
      }
      case 'website':
      default: {
        Linking.openURL('https://www.animalrescueserbia.org/');
      }
    }
  };

  return (
    <ScreenRootContainer title="Animal rescue serbia">
      <View style={styles.rootContainer}>
        <EmptySpace height={60} />

        <Text style={styles.aboutUsText}>{aboutUs}</Text>

        <EmptySpace height={20} />

        <View style={styles.contactRowContainer}>
          <Text style={styles.contact}>Kontakt</Text>
          <View style={styles.socialButtonContainer}>
            <SocialButtons
              bubbleSize={30}
              icons={[
                {id: 'instagram', icon: <Instagram />},
                {id: 'facebook', icon: <Facebook />},
                {id: 'website', icon: <Globe />},
              ]}
              onPress={handleSocialIconPress}
            />
          </View>
        </View>

        <EmptySpace height={16} />

        <AccentedTextBox title="Telefon:">'+38164 8210200'</AccentedTextBox>

        <EmptySpace height={textBoxSpacing} />

        <AccentedTextBox title="e-Pošta">ars@ars.com</AccentedTextBox>
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
