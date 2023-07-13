import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

export const getNewViolation = (state: RootState) => state.report.newViolation;

export const getViolationCategories = (state: RootState) =>
  state.report.violationCategories;

const removeAccents = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const getLocations = (state: RootState) => {
  const mapped = state.report.locations.map(item =>
    item === 'Belgrade' ? 'Beograd' : item,
  );
  const filtered = mapped.filter((loc, index) => {
    return !mapped
      .slice(index + 1)
      .find(location => loc === removeAccents(location));
  });

  return [...filtered].sort((a, b) => a.localeCompare(b));
};

export const getViolations = (state: RootState) => state.report.violations;

export const getLiteViolations = (state: RootState) =>
  state.report.liteViolations;

export const getLiteViolationsOnly = createSelector(
  getViolations,
  getLiteViolations,
  (violations, liteViolations) =>
    liteViolations.filter(
      violation => !violations.find(v => v.id === violation.id),
    ),
);

export const getSortedLiteViolations = createSelector(
  getLiteViolationsOnly,
  violations =>
    violations
      ? [...violations].sort((a, b) => a.location.localeCompare(b.location))
      : [],
);

export const getFilterLocation = (state: RootState) =>
  state.report.violationsFilter.location;

export const getFilterCategory = (state: RootState) =>
  state.report.violationsFilter.violationCategoryId;
