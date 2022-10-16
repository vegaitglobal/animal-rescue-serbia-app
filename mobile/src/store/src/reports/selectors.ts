import {RootState} from '../rootReducer';

export const getNewViolation = (state: RootState) => state.report.violation;

export const getViolationCategories = (state: RootState) =>
  state.report.violationCategories;

export const getLocations = (state: RootState) => state.report.locations;
