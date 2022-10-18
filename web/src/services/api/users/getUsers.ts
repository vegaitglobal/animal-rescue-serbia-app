import { axiosRequest } from '../../axiosConfig';

export interface IUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isActive: boolean;
}

export const getUsers = async (): Promise<IUserResponse[]> => {
  const { data } = await axiosRequest('GET', '/api/admin/Users');
  return data;
};
