import {RootState} from '../rootReducer';

export const getPaginatedArticles = (state: RootState) =>
  state.article.entities;

export const getFilteredArticlesTotalCount = (state: RootState) =>
  state.article.filteredCount;
