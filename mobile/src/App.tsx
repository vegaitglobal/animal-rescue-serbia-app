import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootTabNavigator as RootTabNavigator} from './navigation/RootTabNavigator';

const App = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <BottomSheetModalProvider>
      <NavigationContainer>
        <RootTabNavigator />
      </NavigationContainer>
    </BottomSheetModalProvider>
  </GestureHandlerRootView>
);

export default App;
