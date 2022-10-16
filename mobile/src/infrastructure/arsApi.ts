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
  postViolation: (data: Violation) => {
    // const {
    //   address,
    //   description,
    //   files,
    //   fullName,
    //   location,
    //   phoneNumber,
    //   violationCategoryId,
    // } = data;

    const {files, ...rest} = data;
    // console.log('ASDf: ', fullName);
    // const form = new FormData();
    // form.append('Location', location);
    // form.append('ViolationCategoryId', violationCategoryId);
    // form.append('FullName', fullName);
    // form.append('Address', address);
    // form.append('PhoneNumber', phoneNumber);
    // //form.append('Files', files);
    // form.append('Description', description);
    //form.append('Files', []);
    //form.getAll();
    return apiClient.request<ViolationsDto>({
      url: setViolations,
      method: 'post',
      data: rest,
    });
  },
});
