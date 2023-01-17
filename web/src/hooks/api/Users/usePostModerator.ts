import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IUserResponse } from '../../../services/api/users/getUsers';
import {
  IPostModeratorRequest,
  postModerator,
} from '../../../services/api/users/postModerator';

type UsePostModeratorOptions = Omit<
  UseMutationOptions<
    IUserResponse,
    Error,
    IPostModeratorRequest,
    Array<string>
  >,
  'queryKey' | 'queryFn'
>;

export const usePostModerator = (queryOptions?: UsePostModeratorOptions) => {
  return useMutation(['postModerator'], postModerator, queryOptions);
};
