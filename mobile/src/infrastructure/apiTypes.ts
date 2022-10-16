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
