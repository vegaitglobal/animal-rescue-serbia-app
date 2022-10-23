import {RootState} from '../rootReducer';

export const getAccessToken = (state: RootState) =>
  state.authentication.accessToken;

export const getNewRegistration = (state: RootState) =>
  state.authentication.newRegistration;
