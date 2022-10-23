export type LogInData = {
  email: string;
  password: string;
};

export type AuthenticationState = {
  accessToken: string;
  newRegistration: NewRegistration;
};

export type NewRegistration = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmed: string;
};
