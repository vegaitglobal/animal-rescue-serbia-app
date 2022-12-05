import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AppThunkApiConfig} from '../../../hooks/storeHooks';
import {
  LogInResponseDto,
  RegisterResponseDto,
} from '../../../infrastructure/apiTypes';
import {arsApi} from '../../../infrastructure/arsApi';
import {directUpdateAction} from '../util/helpers';
import {LogInData, NewRegistration} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constants} from '../../../Constants';

export const setFirstName = createAction(
  'authentication/setFirstName',
  directUpdateAction<string>(),
);

export const setLastName = createAction(
  'authentication/setLastName',
  directUpdateAction<string>(),
);

export const setEmail = createAction(
  'authentication/setEmail',
  directUpdateAction<string>(),
);

export const setPassword = createAction(
  'authentication/setPassword',
  directUpdateAction<string>(),
);

export const setPasswordConfirmed = createAction(
  'authentication/setPasswordConfirmed',
  directUpdateAction<string>(),
);

export const setUsername = createAction(
  'authentication/setUsername',
  directUpdateAction<string>(),
);

export const logIn = createAsyncThunk<
  LogInResponseDto,
  LogInData,
  AppThunkApiConfig
>('authentication/logIn', async (data, {extra}) => {
  const client = extra.apiClient;
  const api = arsApi(client);

  //TODO: Check why type inference doesn't work here
  const result: LogInResponseDto = await api.postLogIn(data);
  AsyncStorage.setItem(Constants.tokenPersistanceKey, result.accessToken);
  return result;
});

export const signOut = createAsyncThunk('authentication/logIn', () => {
  return AsyncStorage.setItem(Constants.tokenPersistanceKey, '');
});

export const register = createAsyncThunk<
  RegisterResponseDto,
  NewRegistration,
  AppThunkApiConfig
>(
  'authentication/register',
  async (
    {email, firstName, lastName, password, passwordConfirmed, username},
    {extra},
  ) => {
    const api = arsApi(extra.apiClient);

    const result = await api.postRegistration({
      email,
      firstName,
      lastName,
      username,
      password,
      passwordConfirm: passwordConfirmed,
    });

    AsyncStorage.setItem(Constants.tokenPersistanceKey, result.accessToken);

    return result;
  },
);
