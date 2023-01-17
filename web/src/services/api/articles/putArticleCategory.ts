import { axiosRequest } from '../../axiosConfig';
import { IAdminArticleCategory } from './getAdminArticles';

export interface IPutArticleCategoryRequest {
  name: string;
  isEnabled: boolean;
}

export interface IPutArticleCategoryWithId {
  id: string;
  putData: IPutArticleCategoryRequest;
}

export const putArticleCategory = async (
  updateData: IPutArticleCategoryWithId
): Promise<IAdminArticleCategory> => {
  const { data } = await axiosRequest(
    'PUT',
    '/api/admin/ArticleCategories/' + updateData.id,
    {
      data: updateData.putData,
    }
  );

  return data;
};
