import axios from 'axios';
import {
  ApiRequest,
  IApiClient,
  IAuthManager,
  INavigationService,
  RequestConfig,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiClient = (
  authManager: IAuthManager,
  navigationService: INavigationService,
): IApiClient => {
  const baseURL = 'https://c2e0-212-200-247-75.eu.ngrok.io/api';
  //const baseURL = 'http://10.0.2.2:5113/api';

  axios?.interceptors?.response?.use?.(
    config => {
      //console.log('CONFIG: ', config);
      return config;
    },
    error => {
      if (error.response.status === 401) {
        // TODO: Maybe move into authentication manager
        navigationService.resetToRoute('Login'); // Once token expires we want to request user to re-sign-in
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

    //TODO: access token key constant
    //TODO: Implement manager
    // const token = await manager.getAccessToken();
    const token = await AsyncStorage.getItem('accessToken');

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
            //'Content-Type': 'application/json',
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
