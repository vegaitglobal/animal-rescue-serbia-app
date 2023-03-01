import React from 'react';
import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import {AccentedTextBox} from '../components/AccentedTextBox';
import {DefaultSocialButtons} from '../components/DefaultSocialButtons';
import {EmptySpace} from '../components/EmptySpace';
import {ScreenRootContainer} from '../components/ScreenRootContainer';

export const DonatorsAndFriends = () => {
  const title = 'Dosadašnji razvoj aplikacije omogućili';
  const message =
    'Pridružite se daljem razvoju aplikacije - novčanom donacijom ili uslugom (razvoja aplikacije, pravnom, veterinarskom, i sl.)';
  const contactUsTitle = 'Kontaktirajte nas:';
  const arsMail = 'info@animalrescueserbia.org';

  return (
    <ScreenRootContainer title={'Donatori aplikacije'} showLogo>
      <View style={styles.rootContainer}>
        <EmptySpace height={68} />

        <Text style={styles.title}>{title}</Text>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 30,
            justifyContent: 'space-around',
            alignItems: 'center',
            marginStart: '-5%', // Logo has white space around, this is mitigating that
          }}>
          <Image
            style={{width: 130, height: 100}}
            source={require('../assets/icons/vegaItLogo.png')}
          />

          <Image
            style={{width: 70, height: 70, backgroundColor: 'red'}}
            source={require('../assets/icons/splashLogo.png')}
          />
        </View>

        <EmptySpace height={40} />

        <Text style={{fontSize: 14}}>{message}</Text>

        <EmptySpace height={40} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {contactUsTitle}
          </Text>
          <DefaultSocialButtons style={{width: 120}} />
        </View>

        <EmptySpace height={30} />

        <AccentedTextBox onPress={() => Linking.openURL(`mailto:${arsMail}`)}>
          {arsMail}
        </AccentedTextBox>
      </View>
    </ScreenRootContainer>
  );
};

export const bioSpacing = 24;
export const accentedTextBoxSpacing = 20;

export const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
