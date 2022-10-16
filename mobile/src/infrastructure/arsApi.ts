import {
  ArticleCategoriesDto,
  LogInRequestDto,
  LogInResponseDto,
} from './apiTypes';
import {IApiClient} from './types';

const articleCategories = '/ArticleCategories';
const logInUri = '/Users/login';

export const arsApi = (apiClient: IApiClient) => ({
  getArticleCategories: () => {
    return apiClient.request<ArticleCategoriesDto>({
      url: articleCategories,
      method: 'get',
    });
  },
  postLogIn: (data: LogInRequestDto) => {
    return apiClient.signInRequest<LogInResponseDto>({
      url: logInUri,
      method: 'post',
      data,
    });
  },
});
