import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AppThunkApiConfig} from '../../../hooks/storeHooks';
import {ArticleCategoriesDto} from '../../../infrastructure/apiTypes';
import {arsApi} from '../../../infrastructure/arsApi';
import {directUpdateAction} from '../util/helpers';

export const setNewReportFirstName = createAction(
  'reports/setNewReportFirstName',
  directUpdateAction<string>(),
);

export const setNewReportLastName = createAction(
  'reports/setNewReportLastName',
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
