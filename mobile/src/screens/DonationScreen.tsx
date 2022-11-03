import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {AccentedTextBox} from '../components/AccentedTextBox';
import {CustomModal} from '../components/CustomModal';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';

export const DonationScreen = () => {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!';

  return (
    <ScreenRootContainer title={'Donacije'} showLogo>
      <View style={style.container}>
        <Text style={style.text}>{text}</Text>
        <View style={style.donationContainer}>
          <Text style={style.boldText}>{'Devizni racun:'}</Text>
          <AccentedTextBox>374245455400126</AccentedTextBox>
        </View>
        <View style={style.donationContainer}>
          <Text style={style.boldText}>{'Dinarski racun:'}</Text>
          <AccentedTextBox>374245455400126</AccentedTextBox>
        </View>
        <View style={style.donationContainer}>
          <Text style={style.boldText}>{'PayPal:'}</Text>
          <AccentedTextBox>374245455400126</AccentedTextBox>
        </View>
      </View>
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
  text: {
    fontSize: 16,
    alignSelf: 'center',
    paddingBottom: 20,
  },
  yellowContainer: {
    height: 50,
    backgroundColor: ColorPallet.yellow,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  donationContainer: {
    paddingTop: 10,
  },
  boldText: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5,
  },
});
