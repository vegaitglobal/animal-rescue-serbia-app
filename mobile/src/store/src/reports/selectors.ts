import {RootState} from '../rootReducer';

// export const getNewReport = (state: RootState) => state.report.newReport;

export const getViolationCategories = (state: RootState) =>
  state.report.violationCategories;

export const getLocations = (state: RootState) => state.report.locations;

export const setViolations = (state: RootState) => state.report.violation;
