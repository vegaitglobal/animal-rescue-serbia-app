import {RootState} from '../rootReducer';

export const getAccessToken = (state: RootState) =>
  state.authentication.accessToken;