import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AppThunkApiConfig} from '../../../hooks/storeHooks';
import {
  LogInResponseDto,
  RegisterResponseDto,
  UserDto,
} from '../../../infrastructure/apiTypes';
import {arsApi} from '../../../infrastructure/arsApi';
import {directUpdateAction} from '../util/helpers';
import {
  LogInData,
  NewRegistration,
  PasswordUpdateData,
  ProfileUpdateData,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Constants} from '../../../resources/Constants';

export const setFirstName = createAction(
  'profile/setFirstName',
  directUpdateAction<string>(),
);

export const setLastName = createAction(
  'profile/setLastName',
  directUpdateAction<string>(),
);

export const setEmail = createAction(
  'profile/setEmail',
  directUpdateAction<string>(),
);

export const setPassword = createAction(
  'profile/setPassword',
  directUpdateAction<string>(),
);

export const setPasswordConfirmed = createAction(
  'profile/setPasswordConfirmed',
  directUpdateAction<string>(),
);

export const setUsername = createAction(
  'profile/setUsername',
  directUpdateAction<string>(),
);

export const setProfileUpdateData = createAction(
  'profile/setProfileUpdateData',
  directUpdateAction<Partial<ProfileUpdateData>>(),
);

export const clearProfileUpdateData = createAction(
  'profile/clearProfileUpdateData',
  directUpdateAction<void>(),
);

export const setPasswordUpdateData = createAction(
  'profile/setPasswordUpdateData',
  directUpdateAction<Partial<PasswordUpdateData>>(),
);

export const clearPasswordUpdateData = createAction(
  'profile/clearPasswordUpdateData',
  directUpdateAction<void>(),
);

export const logIn = createAsyncThunk<
  LogInResponseDto,
  LogInData,
  AppThunkApiConfig
>('profile/logIn', async (data, {extra}) => {
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
  'profile/register',
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

export const updateProfile = createAsyncThunk<UserDto, void, AppThunkApiConfig>(
  'profile/updateProfile',
  async (_, {extra, getState}) => {
    const api = arsApi(extra.apiClient);

    const state = getState();
    const {
      profile: {
        newUpdateData,
        user: {id: userId},
      },
    } = state;

    return await api.putUpdateProfile(userId, newUpdateData);
  },
);

export const loadCurrentUser = createAsyncThunk<
  UserDto,
  void,
  AppThunkApiConfig
>('reports/loadUsers', async (_, {extra}) => {
  const api = arsApi(extra.apiClient);
  return await api.getCurrentUser();
});

export const updatePassword = createAsyncThunk<
  UserDto,
  void,
  AppThunkApiConfig
>('profile/updatePassword', async (_, {extra, getState}) => {
  const api = arsApi(extra.apiClient);

  const state = getState();
  const {
    profile: {
      user: {id: userId},
      newPasswordData,
    },
  } = state;

  return await api.putUpdatePassword(userId, newPasswordData);
});
