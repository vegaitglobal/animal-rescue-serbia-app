import { axiosRequest } from '../../axiosConfig';
import { IUserResponse } from './getUsers';

export interface IPostModeratorRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const postModerator = async (
  user: IPostModeratorRequest
): Promise<IUserResponse> => {
  const res = await axiosRequest<any>('POST', '/api/admin/Users', {
    data: user,
  });
  if (res.status === 400) throw new Error(res.data.detail);
  return res.data;
};
