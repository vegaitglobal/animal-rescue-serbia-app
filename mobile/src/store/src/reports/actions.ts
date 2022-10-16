import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AppThunkApiConfig} from '../../../hooks/storeHooks';
import {
  ArticleCategoriesDto,
  LocationsDto,
  ViolationCategoriesDto,
  ViolationsDto,
} from '../../../infrastructure/apiTypes';
import {arsApi} from '../../../infrastructure/arsApi';
import {RootState} from '../rootReducer';
import {directUpdateAction} from '../util/helpers';
import {Violation} from './types';

export const setNameSurname = createAction(
  'reports/setNameSurname',
  directUpdateAction<string>(),
);

export const setLocation = createAction(
  'reports/setLocation',
  directUpdateAction<string>(),
);
export const setAddress = createAction(
  'reports/setAddress',
  directUpdateAction<string>(),
);

export const setPhoneNumber = createAction(
  'reports/setPhoneNumber',
  directUpdateAction<string>(),
);

export const setFiles = createAction(
  'reports/setFiles',
  directUpdateAction<string[]>(),
);

export const setDescription = createAction(
  'reports/setDescription',
  directUpdateAction<string>(),
);

export const setViolationCategory = createAction(
  'reports/setViolationCategory',
  directUpdateAction<string>(),
);

export const loadArticleCategories = createAsyncThunk<
  ArticleCategoriesDto,
  void,
  AppThunkApiConfig
>('reports/loadArticleCategories', async (_, {extra}) => {
  console.log('action');

  const client = extra.apiClient;
  const api = arsApi(client);
  const response = await api.getArticleCategories();
  console.log('response ', response);

  return response;
});

export const loadLocations = createAsyncThunk<
  LocationsDto,
  void,
  AppThunkApiConfig
>('reports/loadLocations', async (_, {extra}) => {
  const client = extra.apiClient;
  const api = arsApi(client);
  const response = await api.getLocations();

  return response;
});

export const loadViolationCategories = createAsyncThunk<
  ViolationCategoriesDto[],
  void,
  AppThunkApiConfig
>('reports/ViolationCategories', async (_, {extra}) => {
  const client = extra.apiClient;
  const api = arsApi(client);
  const response = await api.getViolationCategories();

  return response;
});

export const sendViolation = createAsyncThunk<
  ViolationsDto,
  Violation,
  AppThunkApiConfig
>('reports/Violations', async (data, {extra, getState}) => {
  const client = extra.apiClient;
  const api = arsApi(client);

  try {
    console.log('fadffsdafds: ', data);
    return await api.postViolation(data);
  } catch (error) {
    console.log('error: ', error);
  }
});
