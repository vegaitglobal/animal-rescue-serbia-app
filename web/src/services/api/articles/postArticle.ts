import { axiosRequest } from '../../axiosConfig';

export interface IPostArticle {
  article: FormData;
}

export const postArticle = async (
  article: IPostArticle
): Promise<IPostArticle> => {
  const { data } = await axiosRequest<IPostArticle>('POST', '/admin/articles', {
    data: article.article,
  });

  return data;
};
