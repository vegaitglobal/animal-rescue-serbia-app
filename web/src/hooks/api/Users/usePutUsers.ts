import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IUserResponse } from '../../../services/api/users/getUsers';
import {
  IPutUsersWithId,
  putUsers,
} from '../../../services/api/users/putUsers';

type UsePutUserOptions = Omit<
  UseMutationOptions<IUserResponse, Error, IPutUsersWithId, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const usePutUsers = (queryOptions?: UsePutUserOptions) => {
  return useMutation(['updateUsers'], putUsers, queryOptions);
};
