import { axiosRequest } from '../../axiosConfig';
import { IAdminArticle } from './getAdminArticles';

export const getArticle = async (id: string): Promise<IAdminArticle> => {
  const { data } = await axiosRequest('GET', '/admin/articles/' + id);

  return data;
};
