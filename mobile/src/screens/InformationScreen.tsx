import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import Report from '../assets/icons/educationGrayBg.svg';
import {TextInput} from '../components/TextInput';
import {SelectionInput} from '../components/SelectionInput';
import {CustomButton} from '../components/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import {Chevron, Orientation} from '../components/Chevron';

export const InformationScreen = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const introText =
    'Ovde možete pronaći sve važne kontakte za teritoriju opštine na koju izaberete (institucije, službe, veterinari, pet šopovi, organizacije i sl.)';

  const infoText = `Delatnost službe:\n\n 1. SPASAVANJE\n\n ARS Beograd +381 (0) 64 8 210
  200\n\n ARS Novi Sad +381 (0) 64 8 210 200\n\n ARS Niš +381 (0) 64 8
  210 200\n\n ARS Vrčac +381 (0) 64 8 210 200\n\n\n\n 2. LEČENJE,
  STERILIZACIJA I KASTRACIJA\n\n Beograd:\n\n\n\n JKP „Veterina
  Beograd”\n Hitna pomoć za životinje:\n\n +381 (0) 62 80 90 340\n +381
  (0) 62 80 90 333\n www.veterinabeograd.rs\n\n Napomena: \n Besplatna
  sterilizacija i kastracija za nevlasničke životinje\n\n\n\n
  Veterinarska ambulanta „Dr Vet”\n +381 (0) 63 23 62 40\n +381 (0) 69
  74 72 92\n Napomena: \n Besplatna sterilizacija i kastracija za
  nevlasničke životinje\n\n\n\n Centar za pse i mačke „Jasenak”\n\n +381
  (0) 34 24 68 452\n\n www.centarzapseimackejasenak.rs\n\n Napomena: \n
  Jeftinije sterilizacije i kastracije od ostalih u gradu, ali ne
  besplatno.\n\n\n\n Novi Sad:\n\n\n Prihvatilište „Zoohigijena i
  Veterina“\n\n +381 (0) 21 64 03 220\n +381 (0) 64 80 31 432\n Email:\n
  prihvatilistenovisad@gmail.com\n Adresa: Šajkaškog odreda bb\n\n
  Napomena:\n Besplatna sterilizacija i kastracija za nevlasničke
  životinje\n\n\n\n 3. PRIHVATILIŠTA:\n\n\n\n Beograd:\n\n\n\n JKP
  „Veterina Beograd”\n\n +381 (0) 11 17 64 366\n +381 (0) 11 3293099\n
  +381 (0) 63 54 91 61\n www.veterinabeograd.rs\n\n\n Pomoć
  životinjama\n www.helpanimals.org.rs\n Napomena: Mačke\n\n Nada za
  životinje „Riska”\n www.animalhope.org.rs\n\n Napomena: Psi\n\n
  Prihvatilište „Draževac”\n +381 (0) 65 87 80 177\n
  www.prihvatilistedrazevac.wordpress.com\n Napomena: Psi i mačke\n\n
  Azil „Oaza” Avala\n +381 (0) 65 8901 189\n +381 (0) 63 2362 40\n
  Napomena: Psi\n\n Novi Sad:\n\n Udruženje za zaštitu životinja „S.O.S.
  For Dogs”\n\n +381 (0) 21 89 788\n\n Napomena: Psi`;

  return (
    <ScreenRootContainer title={'Informisanje'} showLogo>
      <ScrollView>
        <View style={style.container}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="Delatnost službe"
              placeholderTextColor={ColorPallet.lightGray}
              style={{flex: 1}}
            />
            <View style={style.chevronContainer}>
              <Chevron
                orientation={Orientation.Forward}
                color={ColorPallet.mediumGray}
              />
            </View>
          </View>

          <Text style={{paddingTop: 40}}>{infoText}</Text>
        </View>
      </ScrollView>
      <CustomModal
        title={'Informisanje'}
        text={introText}
        icon={<Report width={100} height={100} />}
        onPress={() => setVisible(false)}
        visible={visible}
      />
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
  chevronContainer: {
    position: 'absolute',
    right: 5,
    bottom: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
