import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SosScreen} from '../screens/SosScreen';
import {HomeStackNavigator} from './HomeStackNavigator';
import HomeActive from '../assets/icons/homeActive.svg';
import HomeInactive from '../assets/icons/homeInactive.svg';
import SosActive from '../assets/icons/sosActive.svg';
import SosInactive from '../assets/icons/sosInactive.svg';
import ProfileActive from '../assets/icons/profileActive.svg';
import ProfileInactive from '../assets/icons/profileInactive.svg';
import {ProfileScreen} from '../screens/ProfileScreen';
import {Platform, StyleSheet, View} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';

export const RootTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let width = 40;
          let height = 40;
          if (route.name === 'Home') {
            return focused ? (
              <View style={styles.iconContainer}>
                <HomeActive width={width} height={height} />
              </View>
            ) : (
              <View style={styles.iconContainer}>
                <HomeInactive width={width} height={height} />
              </View>
            );
          } else if (route.name === 'Sos') {
            return focused ? (
              <View style={styles.sosIconContainer}>
                <SosActive width={60} height={60} />
              </View>
            ) : (
              <View style={styles.sosIconContainer}>
                <SosInactive width={60} height={60} />
              </View>
            );
          } else if (route.name === 'Profile') {
            return focused ? (
              <View style={styles.iconContainer}>
                <ProfileActive width={width} height={height} />
              </View>
            ) : (
              <View style={styles.iconContainer}>
                <ProfileInactive width={width} height={height} />
              </View>
            );
          }
        },
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: ColorPallet.gray, minHeight: 60},
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Sos"
        component={SosScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  sosIconContainer: {
    paddingBottom: 30,
  },
  iconContainer: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});
