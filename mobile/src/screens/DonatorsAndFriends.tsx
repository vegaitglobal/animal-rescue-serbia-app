import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AccentedTextBox} from '../components/AccentedTextBox';
import {EmptySpace} from '../components/EmptySpace';
import {PersonBio} from '../components/PersonBio';
import {ScreenRootContainer} from '../components/ScreenRootContainer';

export const DonatorsAndFriends = () => {
  const firstBio =
    'Osnivač ARS-a, istovremeno i naš najveći donator, bez čijeg doprinosa ne bi bilo moguće da naša ideja zaživi i razvija se. Zahvaljujemo se na tvojoj velikoj posvećenosti i pomoći.';
  const secondBio =
    'Osim što je virtuelni staratelj nekoliko ARS-ovih spasenih životinja, jedan je od pokretača našeg pravnog tima i njegova finansijska potpora.';

  return (
    <ScreenRootContainer title={'Donatori i prijatelji'}>
      <EmptySpace height={68} />

      <PersonBio fullName="Aleksandar Gavrić" bio={firstBio} />

      <EmptySpace height={bioSpacing} />

      <PersonBio fullName="Biljana Alieno" bio={secondBio} />

      <EmptySpace height={bioSpacing} />
      {/* //TODO: Make sure to change bio here, once it's provided */}

      <PersonBio fullName="Miloš Gačanović" bio={firstBio} />

      <EmptySpace height={40} />

      <View style={styles.accentedTextBoxContainer}>
        <AccentedTextBox>+381649903332</AccentedTextBox>

        <EmptySpace height={accentedTextBoxSpacing} />

        <AccentedTextBox>+381649903332</AccentedTextBox>

        <EmptySpace height={accentedTextBoxSpacing} />

        <AccentedTextBox>+381649903332</AccentedTextBox>
      </View>
    </ScreenRootContainer>
  );
};

export const bioSpacing = 24;
export const accentedTextBoxSpacing = 20;

export const styles = StyleSheet.create({
  accentedTextBoxContainer: {
    paddingHorizontal: 28,
  },
});
