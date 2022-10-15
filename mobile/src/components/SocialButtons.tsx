import React from 'react';
import {Linking, Pressable, StyleSheet, View} from 'react-native';
import Google from '../assets/icons/google.svg';
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';

export const SocialButtons = () => {
  return (
    <View style={style.iconsContainer}>
      <Pressable onPress={() => Linking.openURL('https://google.com')}>
        <Google width={50} height={50} />
      </Pressable>
      <Pressable onPress={() => Linking.openURL('https://facebook.com')}>
        <Facebook width={50} height={50} />
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
});
