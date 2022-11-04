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

const store = createStoreWithInjections(navigationService()); //TODO Check the ref approach

const App = () => {
  return (
    <GestureHandlerRootView style={style.rootGestureView}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            {/* {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />} */}
            <StatusBar hidden />
            <RootStackNavigator />
          </NavigationContainer>
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
