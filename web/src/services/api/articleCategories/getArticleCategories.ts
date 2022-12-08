import { axiosRequest } from '../../axiosConfig';

export interface IArticleCategory {
  id: string;
  name: string;
  isEnabled: string;
}

export const getArticleCategories = async (): Promise<IArticleCategory[]> => {
  const { data } = await axiosRequest('GET', '/api/admin/ArticleCategories');
  return data;
};
