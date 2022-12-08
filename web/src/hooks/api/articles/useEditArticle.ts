import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { editArticle } from '../../../services/api/articles/editArticle';
import { IPostArticle } from '../../../services/api/articles/postArticle';

type UseEditArticleOptions = Omit<
  UseMutationOptions<IPostArticle, Error, IPostArticle, unknown>,
  'mutationKey' | 'mutationFn'
>;

export const useEditArticle = (mutationOptions?: UseEditArticleOptions) => {
  return useMutation(['postArticle'], editArticle, mutationOptions);
};
