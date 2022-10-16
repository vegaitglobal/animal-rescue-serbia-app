import axios from 'axios';
import {ApiRequest, IApiClient, IAuthManager, RequestConfig} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiClient = (authManager: IAuthManager): IApiClient => {
  const baseURL = 'https://2556-82-117-210-2.ngrok.io/api';
  const tokens =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwQHRlc3QuY29tIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE2NjU4NjY5MzcsImV4cCI6MTY2NTk1MzMzNywiaWF0IjoxNjY1ODY2OTM3fQ.EWB4MXKfd-cDk6q9QbomBWFr5Z6EQVvTFrdWmOHSRzSkOeEqbelIIpwJ4UAneTYv-3F3TjXMNQ7eDof4KiD46Q';

  const configureRequest = async (
    manager: IAuthManager,
    config: RequestConfig,
  ): Promise<ApiRequest> => {
    const {url, method, data, headers} = config;

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
            'Content-Type': 'application/json',
          },
        });
        return response.data as TReturn;
      } catch (error) {
        console.log('error ', error);

        throw new Error(
          'Oops. Something wrong just happened and we could not identify exactly what.',
        );
      }
    },
    async signInRequest<TReturn>(config: RequestConfig): Promise<TReturn> {
      try {
        return (await axios.request(config)).data as TReturn;
      } catch (error) {
        console.log('Error: ', error);

        throw new Error(
          'Oops. Something wrong just happened and we could not identify exactly what.',
        );
      }
    },
  };
};
