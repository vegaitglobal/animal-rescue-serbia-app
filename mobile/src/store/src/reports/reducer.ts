import {createSlice} from '@reduxjs/toolkit';
import {setNewReportFirstName, setNewReportLastName} from './actions';
import {getInitialState} from './initialState';

const initialState = getInitialState();

export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setNewReportFirstName, (state, {payload}) => {
        state.newReport.firstName = payload;
      })
      .addCase(setNewReportLastName, (state, {payload}) => {
        state.newReport.lastName = payload;
      });
  },
});

export const reportReducer = reportSlice.reducer;
