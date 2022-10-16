import {ReportState, Violation} from './types';

export const getInitialState = (): ReportState => ({
  violationCategories: [],
  locations: [],
  violation: {} as Violation,
});
