import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

type DefaultScreenParams = NativeStackNavigationOptions;

export type RootStackNavigatorParams = {
  Home?: DefaultScreenParams;
  Information?: DefaultScreenParams;
  ArsInfo?: DefaultScreenParams;
  DonatorsAndFriends?: DefaultScreenParams;
  Violations?: DefaultScreenParams;

  Splash?: DefaultScreenParams;
  Login?: DefaultScreenParams;
  Registration?: DefaultScreenParams;
  TabNavigator?: DefaultScreenParams;
  Report?: DefaultScreenParams;
  Donation?: DefaultScreenParams;

  HomeNavigator?: DefaultScreenParams;
  Sos?: DefaultScreenParams;
  Profile?: DefaultScreenParams;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackNavigatorParams {}
  }
}
