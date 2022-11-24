import { useInfiniteQuery } from '@tanstack/react-query';
import { getAdminArticles } from '../../../services/api/articles/getAdminArticles';

export const useAdminArticles = (search: string) => {
  return useInfiniteQuery(
    ['adminArticles', search],
    ({ pageParam = 1 }) => getAdminArticles(pageParam, search),
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
