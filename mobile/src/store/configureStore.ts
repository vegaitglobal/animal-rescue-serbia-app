import {configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit';
import {apiClient} from '../infrastructure/apiClient';
import {rootReducer} from './src/rootReducer';

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {apiClient: apiClient({})},
      },
    }),
} as ConfigureStoreOptions);
