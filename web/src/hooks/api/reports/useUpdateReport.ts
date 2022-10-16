import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IReportsResponse } from '../../../services/api/reports/getReports';
import {
  IPutReportWithId,
  putSingleReport,
} from '../../../services/api/reports/putSingleReport';

type UseUpdateReportOptions = Omit<
  UseMutationOptions<IReportsResponse, Error, IPutReportWithId, Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useUpdateReport = (queryOptions?: UseUpdateReportOptions) => {
  return useMutation(['updateReport'], putSingleReport, queryOptions);
};
