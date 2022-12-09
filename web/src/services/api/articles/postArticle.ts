import { axiosRequest } from '../../axiosConfig';

export interface IPostArticle {
  article: FormData;
}

export const postArticle = async (
  article: IPostArticle
): Promise<IPostArticle> => {
  const { data } = await axiosRequest<IPostArticle>(
    'POST',
    '/api/admin/articles',
    {
      data: article.article,
    }
  );

  return data;
};
