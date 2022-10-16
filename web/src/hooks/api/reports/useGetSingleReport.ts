import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { IReportsResponse } from '../../../services/api/reports/getReports';
import { getSingleReport } from '../../../services/api/reports/getSingleReport';

type UseGetSingleReportOptions = Omit<
  UseQueryOptions<IReportsResponse, Error, IReportsResponse, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetSingleReport = (
  reportId: string,
  queryOptions?: UseGetSingleReportOptions
) => {
  return useQuery(
    ['getSingleReport', reportId],
    () => getSingleReport(reportId),
    queryOptions
  );
};
