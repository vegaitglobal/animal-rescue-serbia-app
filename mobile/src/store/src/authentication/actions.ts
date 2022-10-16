import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppThunkApiConfig} from '../../../hooks/storeHooks';
import {LogInResponseDto} from '../../../infrastructure/apiTypes';
import {arsApi} from '../../../infrastructure/arsApi';
import {LogInData} from './types';

export const logIn = createAsyncThunk<
  LogInResponseDto,
  LogInData,
  AppThunkApiConfig
>('authentication/logIn', async (data, {extra}) => {
  const client = extra.apiClient;
  const api = arsApi(client);
  return await api.postLogIn(data);
});
