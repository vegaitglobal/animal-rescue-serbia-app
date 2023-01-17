import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { API_URL } from '../config';
import storageApi from './storage.service';

const BASE_URL = API_URL;

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
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        storageApi.clearToken();
        window.location.href = '/prijavljivanje';
        return;
      }
      return err.response;
    }
  );

  axios.interceptors.request.use((config) => {
    const accessToken = storageApi.getToken();
    if (config.headers && config.url !== '/api/Users/login' && !!accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  });

  return axios(axiosConfig);
};
