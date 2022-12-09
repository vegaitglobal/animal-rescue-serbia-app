import {RootState} from '../rootReducer';

export const getPaginatedArticles = (state: RootState) =>
  state.article.entities;

export const getFilteredArticlesTotalCount = (state: RootState) =>
  state.article.filteredCount;

export const getPaginatedPages = (state: RootState) =>
  state.article.pages.entities;

export const getFilteredPagesTotalCount = (state: RootState) =>
  state.article.pages.filteredCount;
