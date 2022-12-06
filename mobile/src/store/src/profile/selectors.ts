import {RootState} from '../rootReducer';
import {PasswordUpdateData} from './types';

export const getNewRegistration = (state: RootState) =>
  state.profile.newRegistration;

export const getUsers = (state: RootState) => state.profile.user;

export const getPasswordUpdateData = ({
  profile: {newPasswordData},
}: RootState): PasswordUpdateData => ({
  oldPassword: newPasswordData.oldPassword.trim(),
  password: newPasswordData.password.trim(),
  passwordConfirm: newPasswordData.passwordConfirm.trim(),
});
