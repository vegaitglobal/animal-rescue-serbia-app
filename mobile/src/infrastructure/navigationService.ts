import {navigate, resetToRoute} from '../store/src/RootNavigation';
import {INavigationService} from './types';

export const navigationService = (): INavigationService => ({
  navigate: (name: string, props?: any) => {
    navigate(name, props);
  },
  resetToRoute: (name: string) => {
    resetToRoute(name);
  },
});
