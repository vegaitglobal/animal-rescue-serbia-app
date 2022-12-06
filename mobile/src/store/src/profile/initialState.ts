import {
  ProfileState,
  NewRegistration,
  ProfileUpdateData,
  PasswordUpdateData,
} from './types';

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

export const getInitialNewPasswordUpdateState = (): PasswordUpdateData => ({
  oldPassword: '',
  password: '',
  passwordConfirm: '',
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
  newPasswordData: getInitialNewPasswordUpdateState(),
});
