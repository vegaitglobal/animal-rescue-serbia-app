import { axiosRequest } from '../../axiosConfig';
import { IAdminArticleCategory } from './getAdminArticles';

export const getArticleCategories = async (): Promise<
  IAdminArticleCategory[]
> => {
  const { data } = await axiosRequest('GET', '/api/admin/ArticleCategories');
  return data;
};
