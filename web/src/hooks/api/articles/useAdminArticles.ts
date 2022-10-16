import { useInfiniteQuery } from '@tanstack/react-query';
import { getAdminArticles } from '../../../services/api/articles/getAdminArticles';

export const useAdminArticles = () => {
  return useInfiniteQuery(
    ['adminArticles'],
    ({ pageParam = 1 }) => getAdminArticles(pageParam),
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
