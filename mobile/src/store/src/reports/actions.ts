import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AppThunkApiConfig} from '../../../hooks/storeHooks';
import {
  ArticleCategoriesDto,
  LiteViolationResponseDto,
  LocationsDto,
  UserDto,
  ViolationCategoryDto,
  ViolationResponseDto,
  ViolationsDto,
} from '../../../infrastructure/apiTypes';
import {arsApi} from '../../../infrastructure/arsApi';
import {directUpdateAction} from '../util/helpers';
import {FormFile, Violation} from './types';

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
  directUpdateAction<FormFile[]>(),
);

export const setDescription = createAction(
  'reports/setDescription',
  directUpdateAction<string>(),
);

export const setViolationCategory = createAction(
  'reports/setViolationCategory',
  directUpdateAction<string>(),
);

export const unsetViolation = createAction(
  'reports/unsetViolationCategory',
  directUpdateAction<void>(),
);

export const setFilterLocation = createAction(
  'reports/setFilterLocation',
  directUpdateAction<string>(),
);

export const setFilterCategory = createAction(
  'reports/setFilterCategory',
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
  return await api.getArticleCategories();
});

export const loadLocations = createAsyncThunk<
  LocationsDto,
  void,
  AppThunkApiConfig
>('reports/loadLocations', async (_, {extra}) => {
  const client = extra.apiClient;
  const api = arsApi(client);
  return await api.getLocations();
});

export const loadViolationCategories = createAsyncThunk<
  ViolationCategoryDto[],
  void,
  AppThunkApiConfig
>('reports/ViolationCategories', async (_, {extra}) => {
  const client = extra.apiClient;
  const api = arsApi(client);
  return await api.getViolationCategories(); //TODO: Think of error handling
});

export const sendViolation = createAsyncThunk<
  ViolationsDto | undefined,
  Violation,
  AppThunkApiConfig
>('reports/Violations', async (data, {extra}) => {
  const client = extra.apiClient;
  const api = arsApi(client);
  return await api.postViolation(data);
});

export const loadViolations = createAsyncThunk<
  ViolationResponseDto[],
  void,
  AppThunkApiConfig
>('reports/loadViolations', async (_, {extra}) => {
  const api = arsApi(extra.apiClient);
  return await api.getViolations();
});

export const loadLiteViolations = createAsyncThunk<
  LiteViolationResponseDto[],
  void,
  AppThunkApiConfig
>('reports/loadLiteViolations', async (_, {extra}) => {
  const api = arsApi(extra.apiClient);
  return await api.getLiteViolations();
});

export const sendLiteViolation = createAsyncThunk<
  LiteViolationResponseDto,
  {location: string; violationCategoryId: string},
  AppThunkApiConfig
>('reports/sendLiteViolation', async (data, {extra}) => {
  const api = arsApi(extra.apiClient);
  return await api.postLiteViolation(data);
});
