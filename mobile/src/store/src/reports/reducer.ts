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
  setViolationCategory,
  unsetViolation,
  loadViolations,
  loadLiteViolations,
  setFilterLocation,
  setFilterCategory,
  loadCurrentUser,
} from './actions';
import {getInitialState, getNewViolationInitialState} from './initialState';

const initialState = getInitialState();

export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setNameSurname, (state, {payload}) => {
        state.newViolation.fullName = payload;
      })
      .addCase(setLocation, (state, {payload}) => {
        state.newViolation.location = payload;
      })
      .addCase(setAddress, (state, {payload}) => {
        state.newViolation.address = payload;
      })
      .addCase(setPhoneNumber, (state, {payload}) => {
        state.newViolation.phoneNumber = payload;
      })
      .addCase(setFiles, (state, {payload}) => {
        state.newViolation.files = payload;
      })
      .addCase(setDescription, (state, {payload}) => {
        state.newViolation.description = payload;
      })
      .addCase(unsetViolation, state => {
        state.newViolation = getNewViolationInitialState();
      })
      .addCase(setViolationCategory, (state, {payload}) => {
        state.newViolation.violationCategoryId = payload;
      })
      .addCase(loadViolationCategories.fulfilled, (state, action) => {
        state.violationCategories = action.payload;
      })
      .addCase(loadLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(loadViolations.fulfilled, (state, {payload}) => {
        state.violations = payload;
      })
      .addCase(loadLiteViolations.fulfilled, (state, {payload}) => {
        state.liteViolations = payload;
      })
      .addCase(setFilterLocation, (state, {payload}) => {
        state.violationsFilter.location = payload;
      })
      .addCase(setFilterCategory, (state, {payload}) => {
        state.violationsFilter.violationCategoryId = payload;
      });
  },
});

export const reportReducer = reportSlice.reducer;
