import {ProfileState, NewRegistration, ProfileUpdateData} from './types';

export const getInitialNewRegistrationState = (): NewRegistration => ({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  passwordConfirmed: '',
});

export const getInitialNewProfileUpdateState = (): ProfileUpdateData => ({
  firstName: '',
  lastName: '',
  username: '',
});

export const getInitialState = (): ProfileState => ({
  newUpdateData: getInitialNewProfileUpdateState(),
  newRegistration: getInitialNewRegistrationState(),
  user: {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    isActive: '',
  },
});
