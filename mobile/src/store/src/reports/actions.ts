import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AppThunkApiConfig} from '../../../hooks/storeHooks';
import {
  ArticleCategoriesDto,
  LocationsDto,
  ViolationCategoriesDto,
  ViolationsDto,
} from '../../../infrastructure/apiTypes';
import {arsApi} from '../../../infrastructure/arsApi';
import {directUpdateAction} from '../util/helpers';
import {Violations} from './types';

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

export const setViolations = createAsyncThunk<
  Violations,
  Violations,
  AppThunkApiConfig
>('reports/Violations', async (_, {extra}) => {
  const client = extra.apiClient;
  const api = arsApi(client);
  const data = {} as Violations;
  const response = await api.postViolation(data);

  return response;
});
