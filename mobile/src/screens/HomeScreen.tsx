import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={style.rootContainer}>
        <Text>Hello world</Text>
        <Button
          title="Navigate"
          onPress={() => {
            navigation.navigate('Some');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  rootContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
