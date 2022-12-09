import {ArticleState} from './types';

export const getInitialState = (): ArticleState => ({
  entities: [],
  filteredCount: 0,
  pageNumber: 1,
  pages: {
    entities: [],
    filteredCount: 0,
    pageNumber: 1,
  },
});
