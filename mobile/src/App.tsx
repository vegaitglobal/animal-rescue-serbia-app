import React, {useEffect} from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {HomeStackNavigator} from './navigation/HomeStackNavigator';
import {Provider} from 'react-redux';
import {createStoreWithInjections} from './store/configureStore';
import {navigationRef} from './store/src/util/navigationHelpers';
import {navigationService} from './infrastructure/navigationService';
import SplashScreen from 'react-native-splash-screen';

const store = createStoreWithInjections(navigationService()); //TODO Check the ref approach

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={style.rootGestureView}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            {/* {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />} */}
            <StatusBar hidden />
            <HomeStackNavigator />
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
