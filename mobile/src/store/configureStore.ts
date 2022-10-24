import {configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit';
import {apiClient} from '../infrastructure/apiClient';
import {INavigationService} from '../infrastructure/types';
import {rootReducer} from './src/rootReducer';

export const createStoreWithInjections = (
  navigationService: INavigationService,
) =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {apiClient: apiClient({}, navigationService)},
        },
      }),
  } as ConfigureStoreOptions);
