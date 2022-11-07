import {RootState} from '../rootReducer';

export const getNewRegistration = (state: RootState) =>
  state.authentication.newRegistration;
