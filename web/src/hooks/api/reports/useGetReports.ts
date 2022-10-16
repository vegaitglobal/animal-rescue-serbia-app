import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getReports,
  IReportsResponse,
} from '../../../services/api/reports/getReports';

type UseGetReportsOptions = Omit<
  UseQueryOptions<IReportsResponse, Error, IReportsResponse[], Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetReports = (queryOptions?: UseGetReportsOptions) => {
  return useQuery(['getReports'], getReports, queryOptions);
};
