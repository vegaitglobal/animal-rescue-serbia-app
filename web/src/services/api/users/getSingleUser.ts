import { axiosRequest } from '../../axiosConfig';
import { IUserResponse } from './getUsers';

export const getSingleUser = async (id: string): Promise<IUserResponse> => {
  const { data } = await axiosRequest('GET', `/api/admin/Users/${id}`);
  return data;
};
