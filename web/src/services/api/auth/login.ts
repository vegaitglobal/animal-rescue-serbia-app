import { axiosRequest } from '../../axiosConfig';

export interface ILoginResponse {
  email: string;
  accessToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

const BASE_URL = process.env.REACT_APP_API_URL || 'https://192.168.65.224:7113';

export const login = async (
  loginData: ILoginRequest
): Promise<ILoginResponse> => {
  const { data } = await axiosRequest('POST', BASE_URL + '/api/Users/login', {
    data: loginData,
  });

  return data;
};
