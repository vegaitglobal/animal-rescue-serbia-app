import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {HomeStackNavigator} from './navigation/HomeStackNavigator';
import {Provider} from 'react-redux';
import store from './store/configureStore';

const App = () => (
  <GestureHandlerRootView style={style.rootGestureView}>
    <BottomSheetModalProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar hidden />
          <HomeStackNavigator />
        </NavigationContainer>
      </Provider>
    </BottomSheetModalProvider>
  </GestureHandlerRootView>
);

export default App;

const style = StyleSheet.create({
  rootGestureView: {
    flex: 1,
  },
});
