import {Violation} from '../store/src/reports/types';
import {
  ArticleCategoriesDto,
  LocationsDto,
  LogInRequestDto,
  LogInResponseDto,
  RegisterResponseDto,
  RegistrationDto,
  ViolationCategoryDto,
  ViolationResponseDto,
  ViolationsDto,
} from './apiTypes';
import {IApiClient} from './types';

const articleCategories = '/ArticleCategories';
const logInUri = '/Users/login';
const locations = '/locations';
const violationCategories = '/ViolationCategories';
const violationsUri = '/Violations';
const registrationUri = '/Users/register';

export const arsApi = (apiClient: IApiClient) => ({
  getArticleCategories: () => {
    return apiClient.request<ArticleCategoriesDto>({
      url: articleCategories,
      method: 'get',
    });
  },
  postLogIn: (data: LogInRequestDto) => {
    return apiClient.nonAuthenticatedRequest<LogInResponseDto>({
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
    return apiClient.request<ViolationCategoryDto[]>({
      url: violationCategories,
      method: 'get',
    });
  },
  postViolation: ({
    address,
    description,
    files,
    fullName,
    location,
    phoneNumber,
    violationCategoryId,
  }: Violation) => {
    const form = new FormData();
    form.append('Location', location);
    form.append('ViolationCategoryId', violationCategoryId);
    form.append('FullName', fullName);
    form.append('Address', address);
    form.append('PhoneNumber', phoneNumber);
    form.append('Description', description);
    files?.forEach(file => {
      form.append('Files', file);
    });

    return apiClient.formRequest<ViolationsDto>({
      url: violationsUri,
      method: 'post',
      data: form,
    });
  },
  postRegistration: (registration: RegistrationDto) => {
    return apiClient.nonAuthenticatedRequest<RegisterResponseDto>({
      url: registrationUri,
      method: 'post',
      data: registration,
    });
  },
  getViolations: () => {
    return apiClient.request<ViolationResponseDto[]>({
      url: violationsUri,
      method: 'get',
    });
  },
});
