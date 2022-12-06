import {ProfileRequestDto, UserDto} from '../../../infrastructure/apiTypes';

export type LogInData = {
  email: string;
  password: string;
};

export type ProfileState = {
  newUpdateData: ProfileUpdateData;
  newRegistration: NewRegistration;
  user: UserDto;
};

export type NewRegistration = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmed: string;
};

export type ProfileUpdateData = ProfileRequestDto;
