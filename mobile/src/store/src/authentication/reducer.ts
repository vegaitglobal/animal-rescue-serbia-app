import {createSlice} from '@reduxjs/toolkit';
import {
  logIn,
  register,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setPasswordConfirmed,
  setUsername,
} from './actions';
import {getInitialState} from './initialState';

const initialState = getInitialState();

export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logIn.fulfilled, (state, {payload}) => {
        state.accessToken = payload.accessToken; //TODO: Remove
      })
      .addCase(register.fulfilled, (_, {}) => {
        //TODO:
      })
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
      });
  },
});

//TODO:
// .addCase(logIn.rejected, (state, {payload}) => {
//   state. = payload;
// });
export const authenticationReducer = reportSlice.reducer;
