import {ReportState, Violation} from './types';

export const getNewReportInitialState = (): Violation => ({} as Violation);

export const getInitialState = (): ReportState => ({
  violationCategories: [],
  locations: [],
  violation: getNewReportInitialState(),
});
