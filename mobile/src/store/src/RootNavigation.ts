import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: any) {
  if (!navigationRef.isReady()) {
    return;
  }

  navigationRef.navigate(name, params);
}

export const resetToRoute = (name: string) => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name}],
  });

  navigationRef.dispatch(resetAction);
};
