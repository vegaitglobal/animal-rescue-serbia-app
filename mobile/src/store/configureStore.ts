import {configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit';
import {rootReducer} from './src/rootReducer';

export default configureStore({
  reducer: rootReducer,
} as ConfigureStoreOptions);
