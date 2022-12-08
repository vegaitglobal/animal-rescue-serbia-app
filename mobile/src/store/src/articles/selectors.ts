import {RootState} from '../rootReducer';

export const getPaginatedArticles = (state: RootState) =>
  state.article.articles;
