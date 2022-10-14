import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={style.rootContainer}>
          <Text>Hello world</Text>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;

const style = StyleSheet.create({
  rootContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
