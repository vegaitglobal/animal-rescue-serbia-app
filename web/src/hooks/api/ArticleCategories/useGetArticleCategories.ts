import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getArticleCategories,
  IArticleCategory,
} from '../../../services/api/articleCategories/getArticleCategories';

type UseGetArticleCategoriesOptions = Omit<
  UseQueryOptions<IArticleCategory[], Error, IArticleCategory[], Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetArticleCategories = (
  queryOptions?: UseGetArticleCategoriesOptions
) => {
  return useQuery(['getArticleCategories'], getArticleCategories, queryOptions);
};
