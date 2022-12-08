import {
  ArticleResponseDto,
  PaginatedData,
} from '../../../infrastructure/apiTypes';

export type ArticleState = PaginatedData<ArticleResponseDto> & {};
