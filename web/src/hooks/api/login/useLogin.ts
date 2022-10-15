import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  login,
  ILoginResponse,
  ILoginRequest,
} from '../../../services/api/auth';

type UseLoginOptions = Omit<
  UseMutationOptions<ILoginResponse, Error, ILoginRequest, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useLogin = (queryOptions?: UseLoginOptions) => {
  return useMutation(['login'], login, queryOptions);
};
