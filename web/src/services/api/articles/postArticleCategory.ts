import { axiosRequest } from '../../axiosConfig';
import { IAdminArticleCategory } from './getAdminArticles';

export interface IPostArticleCategoryRequest {
  name: string;
}

export const postArticleCategory = async (
  categoryData: IPostArticleCategoryRequest
): Promise<IAdminArticleCategory> => {
  const { data } = await axiosRequest('POST', '/api/admin/ArticleCategories', {
    data: categoryData,
  });

  return data;
};
