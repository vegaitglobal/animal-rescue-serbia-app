import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ICategoryResponse } from '../../../services/api/Categories/getCategories';
import {
  IPostCategoryRequest,
  postCategory,
} from '../../../services/api/Categories/postCategory';

type UsePostCategoryOptions = Omit<
  UseMutationOptions<
    ICategoryResponse,
    Error,
    IPostCategoryRequest,
    Array<string>
  >,
  'queryKey' | 'queryFn'
>;

export const usePostCategory = (queryOptions?: UsePostCategoryOptions) => {
  return useMutation(['postCategory'], postCategory, queryOptions);
};
