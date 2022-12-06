import {ReportState, Violation} from './types';

export const getNewViolationInitialState = (): Violation => ({} as Violation);

export const getInitialState = (): ReportState => ({
  violationCategories: [],
  locations: [],
  newViolation: getNewViolationInitialState(),
  violationsFilter: {location: '', violationCategoryId: ''},
  users: {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    isActive: '',
  },
});
