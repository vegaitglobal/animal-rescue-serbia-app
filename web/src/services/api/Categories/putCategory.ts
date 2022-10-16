import { axiosRequest } from '../../axiosConfig';
import { ICategoryResponse } from './getCategories';

export interface IPutCategoryRequest {
  name: string;
  isEnabled: boolean;
}

export interface IPutCategoryWithId {
  id: string;
  putData: IPutCategoryRequest;
}

export const putCategory = async (
  updateData: IPutCategoryWithId
): Promise<ICategoryResponse> => {
  const { data } = await axiosRequest(
    'PUT',
    '/admin/ViolationCategories/' + updateData.id,
    {
      data: updateData.putData,
    }
  );

  return data;
};
