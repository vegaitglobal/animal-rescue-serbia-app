import axios from 'axios';
import {
  ApiRequest,
  IApiClient,
  IAuthManager,
  INavigationService,
  RequestConfig,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Constants} from '../resources/Constants';

export const apiClient = (
  authManager: IAuthManager,
  navigationService: INavigationService,
): IApiClient => {
  const baseURL = `${Constants.baseUrl}/api`;

  axios?.interceptors?.response?.use?.(
    config => {
      return config;
    },
    error => {
      if (!error?.response?.status) {
        Toast.show({
          type: 'error',
          text2:
            'Povezivanje nije uspelo, molimo, proverite internet konekciju',
          position: 'bottom',
        });
        return Promise.reject(error);
      }

      if (error?.response?.status === 401) {
        // TODO: Maybe move into authentication manager

        // No token so it's login request failing
        if (error?.response.config?.headers?.Authorization === undefined) {
          Toast.show({
            type: 'error',
            text1: 'Prijava neuspesna',
            text2: 'Proverite kredencijale i pokusajte ponovo',
            position: 'bottom',
          });

          return Promise.reject(error);
        }

        Toast.show({
          type: 'info',
          text1: 'Sesija je istekla, molimo prijavite se ponovo.',
          position: 'bottom',
        });

        AsyncStorage.setItem(Constants.tokenPersistanceKey, '');

        navigationService.resetToRoute('Login'); // Once token expires we want to request user to re-sign-in
        return Promise.reject(error);
      }

      console.log('Error: ', error);
      return Promise.reject(error);
    },
  );

  const configureRequest = async (
    manager: IAuthManager,
    config: RequestConfig,
  ): Promise<ApiRequest> => {
    const {url, method, data, headers} = config;

    //TODO: Implement authentication manager
    const token = await AsyncStorage.getItem(Constants.tokenPersistanceKey);

    if (token) {
      const actualHeaders = {
        Authorization: `Bearer ${token}`,
        ...headers,
      };

      return {
        baseURL,
        url,
        method,
        data,
        headers: actualHeaders,
      };
    } else {
      throw Error('Sign-in needs to be performed before doing requests.');
    }
  };
  return {
    async request<TReturn>(config: RequestConfig): Promise<TReturn> {
      try {
        const request = await configureRequest(authManager, config);
        const response = await axios.request({
          ...request,
          headers: {
            ...request.headers,
          },
        });
        return response?.data as TReturn;
      } catch (error) {
        console.log('error ', error);

        throw new Error(
          'Oops. Something wrong just happened and we could not identify exactly what.',
        );
      }
    },
    async nonAuthenticatedRequest<TReturn>(
      config: RequestConfig,
    ): Promise<TReturn> {
      try {
        return (await axios.request({...config, baseURL}))?.data as TReturn;
      } catch (error) {
        console.log('Error: ', error);

        throw new Error(
          'Oops. Something wrong just happened and we could not identify exactly what.',
        );
      }
    },
    async formRequest<TReturn>(config: RequestConfig): Promise<TReturn> {
      try {
        const request = await configureRequest(authManager, config);
        const response = await axios.request({
          transformRequest: something => something, // This resolves Axios form object validation issue as per: https://github.com/axios/axios/issues/4406
          ...request,
          headers: {
            ...request.headers,
            Accept: 'text/plain',
            'Content-Type': 'multipart/form-data',
          },
        });
        return response?.data as TReturn;
      } catch (error) {
        console.log('error ', JSON.stringify(error));

        throw new Error(
          'Oops. Something wrong just happened and we could not identify exactly what.',
        );
      }
    },
  };
};
