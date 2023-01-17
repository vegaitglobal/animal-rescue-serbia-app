import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  IPostArticle,
  postArticle,
} from '../../../services/api/articles/postArticle';

type UsePostArticleOptions = Omit<
  UseMutationOptions<IPostArticle, Error, IPostArticle, unknown>,
  'mutationKey' | 'mutationFn'
>;

export const usePostArticle = (mutationOptions?: UsePostArticleOptions) => {
  return useMutation(['postArticle'], postArticle, mutationOptions);
};
