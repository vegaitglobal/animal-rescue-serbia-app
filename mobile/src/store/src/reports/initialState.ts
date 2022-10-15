import {NewReport, ReportState} from './types';

export const getNewReportInitialState = (): NewReport => ({
  firstName: '',
  lastName: '',
});

export const getInitialState = (): ReportState => ({
  newReport: getNewReportInitialState(),
});
