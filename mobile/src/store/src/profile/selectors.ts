import {RootState} from '../rootReducer';

export const getNewRegistration = (state: RootState) =>
  state.profile.newRegistration;

export const getUsers = (state: RootState) => state.profile.user;
