import { axiosRequest } from '../../axiosConfig';
import { IReportCategory } from './getReports';

export const getReportCategories = async (): Promise<IReportCategory[]> => {
  const { data } = await axiosRequest('GET', '/ViolationCategories');
  return data;
};
