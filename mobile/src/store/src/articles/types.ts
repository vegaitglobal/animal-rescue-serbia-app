import {
  ArticleResponseDto,
  PaginatedData,
} from '../../../infrastructure/apiTypes';

export type ArticleState = {
  articles: PaginatedData<ArticleResponseDto>;
};
