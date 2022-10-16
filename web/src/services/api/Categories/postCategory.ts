import { axiosRequest } from '../../axiosConfig';
import { ICategoryResponse } from './getCategories';

export interface IPostCategoryRequest {
  name: string;
}

export const postCategory = async (
  catData: IPostCategoryRequest
): Promise<ICategoryResponse> => {
  const { data } = await axiosRequest(
    'POST',
    '/api/admin/ViolationCategories',
    {
      data: catData,
    }
  );

  return data;
};
