import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

// const BASE_URL = 'https://fakeUrl';

export const axiosRequest = <T = any>(
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT',
  path: string,
  config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'baseURL'>
): AxiosPromise<T> => {
  const axiosConfig: AxiosRequestConfig = {
    url: path,
    method: method,
    ...config,
  };

  return axios(axiosConfig);
};
