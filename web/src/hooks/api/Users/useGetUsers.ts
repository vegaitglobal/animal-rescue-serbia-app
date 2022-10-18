import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUsers, IUserResponse } from '../../../services/api/users/getUsers';

type UseGetUsersOptions = Omit<
  UseQueryOptions<IUserResponse[], Error, IUserResponse[], Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetUsers = (queryOptions?: UseGetUsersOptions) => {
  return useQuery(['getUsers'], getUsers, queryOptions);
};
