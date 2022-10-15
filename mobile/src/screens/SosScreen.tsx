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
        <SelectionInput
          onValueSelected={item => console.log('Test: ', item)}
          data={[
            {id: 'asdd', label: 'Prvi izbor'},
            {id: 'aasd', label: 'Drugi izbor'},
            {id: 'asfasfas', label: 'Treci izbor'},
          ]}
          placeholderLabel={'Zameni me'}
        />
        <View>
          <Text>test</Text>
        </View>
      </ScreenRootContainer>
    </View>
  );
};
