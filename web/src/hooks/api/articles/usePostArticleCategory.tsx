import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IAdminArticleCategory } from '../../../services/api/articles/getAdminArticles';
import {
  IPostArticleCategoryRequest,
  postArticleCategory,
} from '../../../services/api/articles/postArticleCategory';

type UsePostArticleCategoryOptions = Omit<
  UseMutationOptions<
    IAdminArticleCategory,
    Error,
    IPostArticleCategoryRequest,
    Array<string>
  >,
  'queryKey' | 'queryFn'
>;

export const usePostArticleCategory = (
  queryOptions?: UsePostArticleCategoryOptions
) => {
  return useMutation(
    ['postArticleCategory'],
    postArticleCategory,
    queryOptions
  );
};
