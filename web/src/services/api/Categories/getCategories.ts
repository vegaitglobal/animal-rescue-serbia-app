import { axiosRequest } from '../../axiosConfig';

export interface ICategoryResponse {
  id: string;
  name: string;
  isEnabled: boolean;
}

export const getCategories = async (): Promise<ICategoryResponse[]> => {
  const { data } = await axiosRequest('GET', '/admin/ViolationCategories');
  return data;
};
