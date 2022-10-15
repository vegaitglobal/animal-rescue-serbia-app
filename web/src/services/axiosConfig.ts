import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import storageApi from './storage.service';

const BASE_URL = process.env.REACT_APP_API_URL;

export const axiosRequest = <T = any>(
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT',
  path: string,
  config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'baseURL'>
): AxiosPromise<T> => {
  const axiosConfig: AxiosRequestConfig = {
    url: path,
    method: method,
    ...config,
    baseURL: BASE_URL,
  };

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        window.location.href = '/prijavljivanje';
      }
    }
  );

  axios.interceptors.request.use((config) => {
    const accessToken = storageApi.getToken();
    if (config.url !== '/api/Users/login' && !!accessToken) {
      axios.defaults.headers.common['Authorization'] = accessToken;
    }
    return config;
  });

  return axios(axiosConfig);
};
