import React from 'react';
import {Linking, Pressable, StyleSheet, View} from 'react-native';
import Viber from '../assets/icons/viber.svg';
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';
import {ColorPallet} from '../resources/ColorPallet';

export const SocialButtons = () => {
  const viberNumber = '225883';
  return (
    <View style={style.iconsContainer}>
      <Pressable
        style={style.pressableContainer}
        onPress={() =>
          Linking.openURL(`https://viber.com/contact?number=${viberNumber}`)
        }>
        <Viber width={28} height={28} />
      </Pressable>
      <Pressable
        style={style.pressableContainer}
        onPress={() => Linking.openURL('https://facebook.com')}>
        <Facebook width={40} height={40} />
      </Pressable>
      <Pressable onPress={() => Linking.openURL('https://instagram.com')}>
        <Instagram width={50} height={50} />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  iconsContainer: {
    paddingTop: 30,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pressableContainer: {
    backgroundColor: ColorPallet.gray,
    borderRadius: 50,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
