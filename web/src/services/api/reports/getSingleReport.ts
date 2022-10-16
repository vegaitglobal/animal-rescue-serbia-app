import { axiosRequest } from '../../axiosConfig';
import { IReportsResponse } from './getReports';

export const getSingleReport = async (
  id: string
): Promise<IReportsResponse> => {
  const { data } = await axiosRequest('GET', `/api/admin/violations/${id}`);
  return data;
};
