import { axiosRequest } from '../../axiosConfig';

export interface IEditArticle {
  id: string;
  article: FormData;
}

export const editArticle = async (params: IEditArticle) => {
  const { data } = await axiosRequest<IEditArticle>(
    'PATCH',
    '/admin/articles/' + params.id,
    { data: params.article }
  );

  return data;
};
