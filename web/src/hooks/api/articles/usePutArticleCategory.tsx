import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IAdminArticleCategory } from '../../../services/api/articles/getAdminArticles';
import {
  IPutArticleCategoryWithId,
  putArticleCategory,
} from '../../../services/api/articles/putArticleCategory';

type UsePutArticleCategoryOptions = Omit<
  UseMutationOptions<
    IAdminArticleCategory,
    Error,
    IPutArticleCategoryWithId,
    Array<string>
  >,
  'queryKey' | 'queryFn'
>;

export const usePutArticleCategory = (
  queryOptions?: UsePutArticleCategoryOptions
) => {
  return useMutation(
    ['updateArticleCategory'],
    putArticleCategory,
    queryOptions
  );
};
