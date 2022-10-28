import {RootState} from '../rootReducer';

export const getNewViolation = (state: RootState) => state.report.newViolation;

export const getViolationCategories = (state: RootState) =>
  state.report.violationCategories;

export const getLocations = (state: RootState) => state.report.locations;

export const getViolations = (state: RootState) => state.report.violations;
