import { useInfiniteQuery } from '@tanstack/react-query';
import { IReportsFilters } from '../../../pages/Reports/ReportsContainer';
import { getReports } from '../../../services/api/reports/getReports';

export const useGetReports = (filters: IReportsFilters) => {
  return useInfiniteQuery(
    ['reports', filters],
    ({ pageParam = 1 }) =>
      getReports(
        pageParam,
        filters.status,
        filters.search,
        filters.location,
        filters.categoryId
      ),
    {
      cacheTime: 0,
      getNextPageParam: (lastPage, allPages) => {
        let count = 0;
        allPages.forEach((page) => {
          count = count + page.entities.length;
        });

        return count >= lastPage.filteredCount
          ? undefined
          : lastPage.pageNumber + 1;
      },
    }
  );
};
