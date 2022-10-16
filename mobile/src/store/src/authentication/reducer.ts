import {createSlice} from '@reduxjs/toolkit';
import {logIn} from './actions';
import {getInitialState} from './initialState';

const initialState = getInitialState();

export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(logIn.fulfilled, (state, {payload}) => {
      state.accessToken = payload.accessToken;
    });
  },
});

// .addCase(logIn.rejected, (state, {payload}) => {
//   state. = payload;
// });
export const authenticationReducer = reportSlice.reducer;
