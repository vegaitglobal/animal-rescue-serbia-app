import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { IAdminArticle } from '../../../services/api/articles/getAdminArticles';
import { getArticle } from '../../../services/api/articles/getArticle';

type UseGetArticleOptions = Omit<
  UseQueryOptions<IAdminArticle, Error, IAdminArticle, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetArticle = (
  id: string,
  queryOptions?: UseGetArticleOptions
) => {
  return useQuery(['getAdminArticle', id], () => getArticle(id), queryOptions);
};
