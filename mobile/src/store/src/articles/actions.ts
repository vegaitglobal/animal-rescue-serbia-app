import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AppThunkApiConfig} from '../../../hooks/storeHooks';
import {
  PaginatedData,
  ArticleResponseDto,
  ArticleRequestDto,
} from '../../../infrastructure/apiTypes';
import {arsApi} from '../../../infrastructure/arsApi';
import {directUpdateAction} from '../util/helpers';

export const clearLoadedArticles = createAction(
  'article/clearLoadedArticles',
  directUpdateAction<void>(),
);

export const clearLoadedPages = createAction(
  'article/clearLoadedPages',
  directUpdateAction<void>(),
);

export const loadArticles = createAsyncThunk<
  PaginatedData<ArticleResponseDto>,
  Omit<ArticleRequestDto, 'type'>,
  AppThunkApiConfig
>('article/loadArticles', async (data, {extra}) => {
  const api = arsApi(extra.apiClient);

  return await api.getArticles({...data, type: 'Article'});
});

export const loadPages = createAsyncThunk<
  PaginatedData<ArticleResponseDto>,
  Omit<ArticleRequestDto, 'type'>,
  AppThunkApiConfig
>('article/loadPages', async (data, {extra}) => {
  const api = arsApi(extra.apiClient);

  return await api.getArticles({...data, type: 'Page'});
});
