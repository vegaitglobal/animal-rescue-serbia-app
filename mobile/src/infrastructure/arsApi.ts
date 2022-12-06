import {Violation} from '../store/src/reports/types';
import {
  ArticleCategoriesDto,
  LiteViolationRequestDto,
  LiteViolationResponseDto,
  LocationsDto,
  LogInRequestDto,
  LogInResponseDto,
  PasswordRequestDto,
  ProfileRequestDto,
  RegisterResponseDto,
  RegistrationDto,
  UserDto,
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
const liteViolationsUri = '/LiteViolations';
const registrationUri = '/Users/register';
const userUri = '/Users/me';
const usersUri = '/Users';
const userCredentialsUri = `${usersUri}/updateCredentials`;

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
  postLiteViolation: (data: LiteViolationRequestDto) => {
    return apiClient.request<LiteViolationResponseDto>({
      url: liteViolationsUri,
      method: 'post',
      data,
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
  getLiteViolations: () => {
    return apiClient.request<LiteViolationResponseDto[]>({
      url: liteViolationsUri,
      method: 'get',
    });
  },
  getCurrentUser: () => {
    return apiClient.request<UserDto>({
      url: userUri,
      method: 'get',
    });
  },
  putUpdateProfile: (userId: string, profileData: ProfileRequestDto) => {
    return apiClient.request<UserDto>({
      url: `${usersUri}/${userId}`,
      method: 'put',
      data: profileData,
    });
  },
  putUpdatePassword: (userId: string, passwordData: PasswordRequestDto) => {
    return apiClient.request<UserDto>({
      url: `${userCredentialsUri}/${userId}`,
      method: 'put',
      data: passwordData,
    });
  },
});
