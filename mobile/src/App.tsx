import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStackNavigator} from './navigation/RootStackNavigator';
import {Provider} from 'react-redux';
import {createStoreWithInjections} from './store/configureStore';
import {navigationRef} from './store/src/util/navigationHelpers';
import {navigationService} from './infrastructure/navigationService';
import {ColorPallet} from './resources/ColorPallet';
import Toast from 'react-native-toast-message';

const store = createStoreWithInjections(navigationService());

const App = () => {
  return (
    <GestureHandlerRootView style={style.rootGestureView}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <StatusBar backgroundColor={ColorPallet.gray} />
            <RootStackNavigator />
          </NavigationContainer>
          <Toast />
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const style = StyleSheet.create({
  rootGestureView: {
    flex: 1,
  },
});
