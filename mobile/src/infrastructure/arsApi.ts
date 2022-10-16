import {Violation} from '../store/src/reports/types';
import {
  ArticleCategoriesDto,
  LocationsDto,
  LogInRequestDto,
  LogInResponseDto,
  ViolationCategoriesDto,
  ViolationsDto,
} from './apiTypes';
import {IApiClient} from './types';

const articleCategories = '/ArticleCategories';
const logInUri = '/Users/login';
const locations = '/locations';
const violationCategories = '/ViolationCategories';
const setViolations = '/Violations';

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
  getLocations: () => {
    return apiClient.request<LocationsDto>({
      url: locations,
      method: 'get',
    });
  },
  getViolationCategories: () => {
    return apiClient.request<ViolationCategoriesDto[]>({
      url: violationCategories,
      method: 'get',
    });
  },
  postViolation: (violation: Violation) => {
    return apiClient.request<ViolationsDto>({
      url: setViolations,
      method: 'post',
      data: violation,
    });
  },
});
