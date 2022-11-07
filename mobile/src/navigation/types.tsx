import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

type DefaultScreenParams = NativeStackNavigationOptions;

export type RootStackNavigatorParams = {
  Home?: DefaultScreenParams;
  Registration?: DefaultScreenParams;
  Report?: DefaultScreenParams;
  Information?: DefaultScreenParams;
  ArsInfo?: DefaultScreenParams;
  DonatorsAndFriends?: DefaultScreenParams;
  Donation?: DefaultScreenParams;
  Violations?: DefaultScreenParams;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackNavigatorParams {}
  }
}
