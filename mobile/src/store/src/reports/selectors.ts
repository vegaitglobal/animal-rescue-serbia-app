import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

export const getNewViolation = (state: RootState) => state.report.newViolation;

export const getViolationCategories = (state: RootState) =>
  state.report.violationCategories;

const removeAccents = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const ENGLISH_CITIES = ['Belgrade'];

export const getLocations = (state: RootState) => {
  const filtered = state.report.locations.filter((loc, index) => {
    if (ENGLISH_CITIES.includes(loc)) {
      return false;
    }

    return !state.report.locations
      .slice(index + 1)
      .find(location => loc === removeAccents(location));
  });

  return [...filtered].sort((a, b) => a.localeCompare(b));
};

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
