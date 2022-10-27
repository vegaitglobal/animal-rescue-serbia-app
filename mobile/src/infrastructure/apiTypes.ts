export type ArticleCategoriesDto = {
  id: string;
  name: string;
  isEnabled: boolean;
};

export type LogInRequestDto = {
  email: string;
  password: string;
};

export type LogInResponseDto = {
  email: string;
  accessToken: string;
};

export type LocationsDto = string[];

export type ViolationsDto = {
  location: string;
  violationCategoryId: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  files: string[];
  desctiption: string;
};

export type ViolationCategoriesDto = {
  id: string;
  name: string;
  isEnabled: boolean;
};

export type RegistrationDto = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type RegisterResponseDto = {
  email: string;
  accessToken: string;
};