import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppThunkApiConfig} from '../../../hooks/storeHooks';
import {
  PaginatedData,
  ArticleResponseDto,
  ArticleRequestDto,
} from '../../../infrastructure/apiTypes';
import {arsApi} from '../../../infrastructure/arsApi';

export const loadArticles = createAsyncThunk<
  PaginatedData<ArticleResponseDto>,
  ArticleRequestDto,
  AppThunkApiConfig
>('profile/loadArticles', async (data, {extra}) => {
  const api = arsApi(extra.apiClient);

  return await api.getArticles(data);
});
