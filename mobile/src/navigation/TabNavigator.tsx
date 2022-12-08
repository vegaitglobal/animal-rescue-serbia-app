import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {SosScreen} from '../screens/SosScreen';
import HomeActive from '../assets/icons/homeActive.svg';
import HomeInactive from '../assets/icons/homeInactive.svg';
import SosActive from '../assets/icons/sosActive.svg';
import SosInactive from '../assets/icons/sosInactive.svg';
import ProfileActive from '../assets/icons/profileActive.svg';
import ProfileInactive from '../assets/icons/profileInactive.svg';
import {Platform, StyleSheet} from 'react-native';
import {ColorPallet} from '../resources/ColorPallet';
import {TabIcon, TabIconProps} from '../components/TabIcon';
import {HomeStackNavigator} from './HomeStackNavigator';
import {RootStackNavigatorParams} from './types';
import {ProfileStackNavigator} from './ProfileStackNavigator';

export const TabNavigator = () => {
  const Tab = createBottomTabNavigator<RootStackNavigatorParams>();

  const renderTabIcon = useCallback(
    (
        additional: Pick<
          TabIconProps,
          'activeIcon' | 'inactiveIcon' | 'iconContainerStyle'
        >,
      ) =>
      (props: {focused: boolean; color: string; size: number}) =>
        <TabIcon {...props} {...additional} />,
    [],
  );

  const size = 40;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: ColorPallet.gray, minHeight: 60},
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: renderTabIcon({
            activeIcon: <HomeActive width={size} height={size} />,
            inactiveIcon: <HomeInactive width={size} height={size} />,
            iconContainerStyle: styles.iconContainer,
          }),
        }}
      />
      <Tab.Screen
        name="Sos"
        component={SosScreen}
        options={{
          tabBarIcon: renderTabIcon({
            activeIcon: <SosActive width={60} height={60} />,
            inactiveIcon: <SosInactive width={60} height={60} />,
            iconContainerStyle: styles.sosIconContainer,
          }),
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: renderTabIcon({
            activeIcon: <ProfileActive width={size} height={size} />,
            inactiveIcon: <ProfileInactive width={size} height={size} />,
            iconContainerStyle: styles.iconContainer,
          }),
        }}
      />
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
