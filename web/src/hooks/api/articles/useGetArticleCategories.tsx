import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { IAdminArticleCategory } from '../../../services/api/articles/getAdminArticles';
import { getArticleCategories } from '../../../services/api/articles/getArticleCategories';

type UseGetArticleCategoriesOptions = Omit<
  UseQueryOptions<
    IAdminArticleCategory[],
    Error,
    IAdminArticleCategory[],
    Array<string>
  >,
  'queryKey' | 'queryFn'
>;

export const useGetArticleCategories = (
  queryOptions?: UseGetArticleCategoriesOptions
) => {
  return useQuery(['getArticleCategories'], getArticleCategories, queryOptions);
};
