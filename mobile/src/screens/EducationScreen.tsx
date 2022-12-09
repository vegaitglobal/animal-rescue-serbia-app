import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {clearLoadedArticles, loadArticles} from '../store/src/articles/actions';
import {
  getFilteredArticlesTotalCount,
  getPaginatedArticles,
} from '../store/src/articles/selectors';
import {ArticleList} from './components/ArticleList';

export const EducationScreen = () => {
  const dispatch = useAppDispatch();
  const paginatedArticles = useAppSelector(getPaginatedArticles);
  const paginatedArticlesTotalCount = useAppSelector(
    getFilteredArticlesTotalCount,
  );
  const [currentArticlePage, setCurrentArticlePage] = useState(1);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(true);

  const loadPaginatedArticles = useCallback(async () => {
    setIsLoading(true);

    await dispatch(loadArticles({pageNumber: currentArticlePage, pageSize}));

    setIsLoading(false);
  }, [currentArticlePage, dispatch]);

  useEffect(() => {
    loadPaginatedArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArticlePage]);

  useEffect(
    () => () => {
      dispatch(clearLoadedArticles());
    },
    [dispatch],
  );

  const isLastPageAlreadyLoaded = useMemo(() => {
    const totalPages = paginatedArticlesTotalCount / pageSize;

    return currentArticlePage >= totalPages;
  }, [currentArticlePage, paginatedArticlesTotalCount]);

  const makeNextPageActive = () => {
    if (isLastPageAlreadyLoaded) {
      return;
    }
    setCurrentArticlePage(current => ++current);
  };

  const handleRefresh = () => {
    dispatch(clearLoadedArticles());
    loadPaginatedArticles();
  };

  return (
    <ScreenRootContainer title="Edukacija">
      <ArticleList
        data={paginatedArticles}
        currentArticlePage={currentArticlePage}
        isLoading={isLoading}
        isLastPageAlreadyLoaded={isLastPageAlreadyLoaded}
        onNextPage={makeNextPageActive}
        onRefresh={handleRefresh}
      />
    </ScreenRootContainer>
  );
};
