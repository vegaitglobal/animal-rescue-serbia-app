import { axiosRequest } from '../../axiosConfig';

export interface ILoginResponse {
  email: string;
  accessToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export const login = async (
  loginData: ILoginRequest
): Promise<ILoginResponse> => {
  const { data } = await axiosRequest('POST', '/api/Users/login', {
    data: loginData,
  });

  return data;
};
