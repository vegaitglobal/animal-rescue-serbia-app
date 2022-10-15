import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-svg';
import {ScreenRootContainer} from '../components/ScreenRootContainer';

export const SosScreen = () => {
  return (
    <View>
      <ScreenRootContainer title="tekst">
        <View>
          <Text>test</Text>
        </View>
      </ScreenRootContainer>
    </View>
  );
};
