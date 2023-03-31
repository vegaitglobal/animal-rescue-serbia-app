import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';
import Report from '../assets/icons/educationGrayBg.svg';
import {TextInput} from '../components/TextInput';
import {ScrollView} from 'react-native-gesture-handler';
import MagnifyingGlass from '../assets/icons/magnifyingGlass.svg';
import {EmptySpace} from '../components/EmptySpace';

export const InformationScreen = () => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setVisible(true);
  }, []);

  const introText = useMemo(
    () =>
      'Ovde možete pronaći sve važne kontakte za teritoriju opštine na koju izaberete (institucije, službe, veterinari, pet šopovi, organizacije i sl.)',
    [],
  );

  const infoText = useMemo(
    () =>
      'Delatnost službe:\n\n1. SPASAVANJE\n\nARS Beograd +381 (0) 64 8 210 200\n\nARS Novi Sad +381 (0) 64 8 210 200\n\nARS Niš +381 (0) 64 8 210 200\n\nARS Vrčac +381 (0) 64 8 210 200\n\n\n2. LEČENJE, STERILIZACIJA I KASTRACIJA\n\n\nBeograd:\n\n\nJKP „Veterina Beograd”\nHitna pomoć za životinje:\n\n+381 (0) 62 80 90 340\n+381 (0) 62 80 90 333\nwww.veterinabeograd.rs\n\nNapomena: \nBesplatna sterilizacija i kastracija za nevlasničke životinje\n\n\nVeterinarska ambulanta „Dr Vet”\n+381 (0) 63 23 62 40\n+381 (0) 69 74 72 92\nNapomena: \nBesplatna sterilizacija i kastracija za nevlasničke životinje\n\n\nCentar za pse i mačke „Jasenak”\n\n+381 (0) 34 24 68 452\n\nwww.centarzapseimackejasenak.rs\n\nNapomena: \nJeftinije sterilizacije i kastracije od ostalih u gradu, ali ne besplatno.\n\n\nNovi Sad:\n\n\nPrihvatilište „Zoohigijena i Veterina“\n\n+381 (0) 21 64 03 220\n+381 (0) 64 80 31 432\nEmail:\nprihvatilistenovisad@gmail.com\nAdresa: Šajkaškog odreda bb\n\nNapomena:\nBesplatna sterilizacija i kastracija za nevlasničke životinje\n\n\n3. PRIHVATILIŠTA:\n\n\nBeograd:\n\n\nJKP „Veterina Beograd”\n\n+381 (0) 11 17 64 366\n+381 (0) 11 3293099\n+381 (0) 63 54 91 61\nwww.veterinabeograd.rs\n\n\nPomoć životinjama\nwww.helpanimals.org.rs\nNapomena: Mačke\n\nNada za životinje „Riska”\nwww.animalhope.org.rs\n\nNapomena: Psi\n\nPrihvatilište „Draževac”\n+381 (0) 65 87 80 177\nwww.prihvatilistedrazevac.wordpress.com\nNapomena: Psi i mačke\n\nAzil „Oaza” Avala\n+381 (0) 65 8901 189\n+381 (0) 63 2362 40\nNapomena: Psi\n\n\nNovi Sad:\n\n\nUdruženje za zaštitu životinja „S.O.S. For Dogs”\n\n+381 (0) 21 89 788\n\nNapomena: Psi',
    [],
  );

  const parts = useMemo(
    () => (searchText.length ? infoText.split(searchText) : [infoText]),
    [infoText, searchText],
  );

  const spannableText = useMemo(
    () =>
      parts.map((part, index) => (
        <Text key={part + index}>
          <Text>{part}</Text>
          {index === parts.length - 1 ? null : (
            <Text style={{backgroundColor: ColorPallet.yellow}}>
              {searchText}
            </Text>
          )}
        </Text>
      )),
    [parts, searchText],
  );
  return (
    <ScreenRootContainer title={'Informisanje'} showLogo>
      <ScrollView>
        <View style={style.container}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="Pretraži"
              placeholderTextColor={ColorPallet.lightGray}
              style={{flex: 1}}
              onChangeText={setSearchText}
            />
            <View style={style.chevronContainer}>
              <MagnifyingGlass width={15} height={15} />
            </View>
          </View>

          <Text
            style={{
              paddingTop: 40,
              textAlign: 'left',
            }}>
            {spannableText}
          </Text>
        </View>

        <EmptySpace height={50} />
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
    right: '3%',
    bottom: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
