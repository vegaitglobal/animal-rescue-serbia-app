import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

export const getNewViolation = (state: RootState) => state.report.newViolation;

export const getViolationCategories = (state: RootState) =>
  state.report.violationCategories;

export const getLocations = (state: RootState) => state.report.locations;

export const getViolations = (state: RootState) => state.report.violations;

export const getLiteViolations = (state: RootState) =>
  state.report.liteViolations;

export const getSortedLiteViolations = createSelector(
  getLiteViolations,
  violations =>
    violations
      ? [...violations].sort((a, b) => a.location.localeCompare(b.location))
      : [],
);

export const getFilterLocation = (state: RootState) =>
  state.report.violationsFilter.location;

export const getFilterCategory = (state: RootState) =>
  state.report.violationsFilter.violationCategoryId;
