import { useInfiniteQuery } from '@tanstack/react-query';
import { getReports } from '../../../services/api/reports/getReports';

export const useGetReports = (status?: number | null, search?: string) => {
  return useInfiniteQuery(
    ['reports', search],
    ({ pageParam = 1 }) => getReports(pageParam, status, search),
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
