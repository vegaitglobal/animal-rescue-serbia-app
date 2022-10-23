import {AuthenticationState, NewRegistration} from './types';

export const getInitialNewRegistrationState = (): NewRegistration => ({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  passwordConfirmed: '',
});

export const getInitialState = (): AuthenticationState => ({
  accessToken: '',
  newRegistration: getInitialNewRegistrationState(),
});
