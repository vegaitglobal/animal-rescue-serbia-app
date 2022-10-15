import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {SelectionInput} from '../components/SelectionInput';
import {EmptySpace} from '../components/EmptySpace';

export const SosScreen = () => {
  return (
    <View>
      <ScreenRootContainer title="Sos poziv" showLogo>
        <EmptySpace height={30} />
        <SelectionInput data={['asdasd', 'asdfas', 'dasds']} />
        <View>
          <Text>test</Text>
        </View>
      </ScreenRootContainer>
    </View>
  );
};
