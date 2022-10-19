import {createSlice} from '@reduxjs/toolkit';
import {
  loadLocations,
  loadViolationCategories,
  setAddress,
  setDescription,
  setFiles,
  setLocation,
  setNameSurname,
  setPhoneNumber,
  sendViolation,
  setViolationCategory,
  unsetViolation,
} from './actions';
import {getInitialState, getNewReportInitialState} from './initialState';

const initialState = getInitialState();

export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setNameSurname, (state, {payload}) => {
        state.violation.fullName = payload;
      })
      .addCase(setLocation, (state, {payload}) => {
        state.violation.location = payload;
      })
      .addCase(setAddress, (state, {payload}) => {
        state.violation.address = payload;
      })
      .addCase(setPhoneNumber, (state, {payload}) => {
        state.violation.phoneNumber = payload;
      })
      .addCase(setFiles, (state, {payload}) => {
        state.violation.files = payload;
      })
      .addCase(setDescription, (state, {payload}) => {
        state.violation.description = payload;
      })
      .addCase(unsetViolation, state => {
        state.violation = getNewReportInitialState();
      })
      .addCase(setViolationCategory, (state, {payload}) => {
        state.violation.violationCategoryId = payload;
      })
      .addCase(loadViolationCategories.fulfilled, (state, action) => {
        state.violationCategories = action.payload;
      })
      .addCase(loadLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(sendViolation.fulfilled, (state, action) => {
        //state.violation = action.payload; //TODO: cleanup
      });
  },
});

export const reportReducer = reportSlice.reducer;
