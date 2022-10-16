import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {ColorPallet} from '../resources/ColorPallet';

export const ProfileScreen = () => {
  return (
    <ScreenRootContainer title={'Profil'} showLogo>
      <View style={style.container}>
        <View style={{paddingTop: 30}}>
          <CustomButton text="Istorija prijava" />
        </View>
        <View style={{paddingTop: 30}}>
          <CustomButton text="Moje novosti" />
        </View>
        <View style={{paddingTop: 30}}>
          <CustomButton text="Moi oglasi" />
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
  btnContainer: {
    paddingTop: 50,
  },
});
