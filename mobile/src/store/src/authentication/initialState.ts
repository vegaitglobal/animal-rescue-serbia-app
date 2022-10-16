import {AuthenticationState} from './types';

export const getInitialState = (): AuthenticationState => ({
  accessToken: '',
});
