import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

type DefaultScreenParams = NativeStackNavigationOptions;

export type RootStackNavigatorParams = {
  Home?: DefaultScreenParams;
  Report?: DefaultScreenParams;
  Violations?: DefaultScreenParams;
  Donation?: DefaultScreenParams;
  Information?: DefaultScreenParams;
  DonatorsAndFriends?: DefaultScreenParams;
  ArsInfo?: DefaultScreenParams;

  Splash?: DefaultScreenParams;
  Login?: DefaultScreenParams;
  Registration?: DefaultScreenParams;
  TabNavigator?: DefaultScreenParams;

  HomeNavigator?: DefaultScreenParams;
  Sos?: DefaultScreenParams;
  Profile?: DefaultScreenParams;
  Education?: DefaultScreenParams;
  ProfileUpdate?: DefaultScreenParams;
  PasswordUpdate?: DefaultScreenParams;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackNavigatorParams {}
  }
}
