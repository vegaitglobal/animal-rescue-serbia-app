import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AccentedTextBox} from '../components/AccentedTextBox';
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
          <AccentedTextBox title="Devizni racun:">
            374245455400126
          </AccentedTextBox>
        </View>
        <View style={style.donationContainer}>
          <AccentedTextBox title="Dinarski racun:">
            374245455400126
          </AccentedTextBox>
        </View>
        <View style={style.donationContainer}>
          <AccentedTextBox title="PayPal:">374245455400126</AccentedTextBox>
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
  donationContainer: {
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5,
  },
});
