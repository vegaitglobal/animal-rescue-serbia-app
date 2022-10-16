import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getCategories,
  ICategoryResponse,
} from '../../../services/api/Categories/getCategories';

type UseGetCategoriesOptions = Omit<
  UseQueryOptions<
    ICategoryResponse[],
    Error,
    ICategoryResponse[],
    Array<string>
  >,
  'queryKey' | 'queruFn'
>;

export const useGetCategories = (queryOptions?: UseGetCategoriesOptions) => {
  return useQuery(['getCategories'], getCategories, queryOptions);
};
