import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getReportCategories } from '../../../services/api/reports/getReportCategories';
import { IReportCategory } from '../../../services/api/reports/getReports';

type UseGetReportCategoriesOptions = Omit<
  UseQueryOptions<IReportCategory[], Error, IReportCategory[], Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetReportCategories = (
  queryOptions?: UseGetReportCategoriesOptions
) => {
  return useQuery(
    ['getReportCategories'],
    () => getReportCategories(),
    queryOptions
  );
};
