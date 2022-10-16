import {ArticleCategoriesDto} from './apiTypes';
import {IApiClient} from './types';

const articleCategories = '/ArticleCategories';

export const arsApi = (apiClient: IApiClient) => ({
  getArticleCategories: () => {
    return apiClient.request<ArticleCategoriesDto>({
      url: articleCategories,
      method: 'get',
    });
  },
});
