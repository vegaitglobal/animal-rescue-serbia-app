import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ICategoryResponse } from '../../../services/api/Categories/getCategories';
import {
  IPutCategoryWithId,
  putCategory,
} from '../../../services/api/Categories/putCategory';

type UsePutCategoryOptions = Omit<
  UseMutationOptions<
    ICategoryResponse,
    Error,
    IPutCategoryWithId,
    Array<string>
  >,
  'queryKey' | 'queryFn'
>;

export const usePutCategory = (queryOptions?: UsePutCategoryOptions) => {
  return useMutation(['updateCategory'], putCategory, queryOptions);
};
