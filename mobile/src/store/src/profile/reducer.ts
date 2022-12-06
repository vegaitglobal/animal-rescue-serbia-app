import {createSlice} from '@reduxjs/toolkit';
import {
  clearPasswordUpdateData,
  clearProfileUpdateData,
  loadCurrentUser,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setPasswordConfirmed,
  setPasswordUpdateData,
  setProfileUpdateData,
  setUsername,
  updatePassword,
  updateProfile,
} from './actions';
import {
  getInitialNewPasswordUpdateState,
  getInitialNewProfileUpdateState,
  getInitialState,
} from './initialState';

const initialState = getInitialState();

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setFirstName, (state, {payload}) => {
        state.newRegistration.firstName = payload;
      })
      .addCase(setLastName, (state, {payload}) => {
        state.newRegistration.lastName = payload;
      })
      .addCase(setUsername, (state, {payload}) => {
        state.newRegistration.username = payload;
      })
      .addCase(setEmail, (state, {payload}) => {
        state.newRegistration.email = payload;
      })
      .addCase(setPassword, (state, {payload}) => {
        state.newRegistration.password = payload;
      })
      .addCase(setPasswordConfirmed, (state, {payload}) => {
        state.newRegistration.passwordConfirmed = payload;
      })
      .addCase(setProfileUpdateData, (state, {payload}) => {
        state.newUpdateData = {...state.newUpdateData, ...payload};
      })
      .addCase(loadCurrentUser.fulfilled, (state, {payload}) => {
        state.user = payload;
      })
      .addCase(updateProfile.fulfilled, (state, {payload}) => {
        state.user = payload;
      })
      .addCase(updatePassword.fulfilled, (state, {payload}) => {
        state.user = payload;
      })
      .addCase(setPasswordUpdateData, (state, {payload}) => {
        state.newPasswordData = {...state.newPasswordData, ...payload};
      })
      .addCase(clearPasswordUpdateData, state => {
        state.newPasswordData = getInitialNewPasswordUpdateState();
      })
      .addCase(clearProfileUpdateData, state => {
        state.newUpdateData = getInitialNewProfileUpdateState();
      });
  },
});

export const profileReducer = profileSlice.reducer;
