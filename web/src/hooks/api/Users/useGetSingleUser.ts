import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getSingleUser } from '../../../services/api/users/getSingleUser';
import { IUserResponse } from '../../../services/api/users/getUsers';

type UseGetSingleUserOptions = Omit<
  UseQueryOptions<IUserResponse, Error, IUserResponse, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetSingleUser = (
  userId: string,
  queryOptions?: UseGetSingleUserOptions
) => {
  return useQuery(
    ['getSingleUser', userId],
    () => getSingleUser(userId),
    queryOptions
  );
};
