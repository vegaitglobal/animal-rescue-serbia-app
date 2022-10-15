import {createAction} from '@reduxjs/toolkit';
import {directUpdateAction} from '../util/helpers';

export const setNewReportFirstName = createAction(
  'reports/setNewReportFirstName',
  directUpdateAction<string>(),
);

export const setNewReportLastName = createAction(
  'reports/setNewReportLastName',
  directUpdateAction<string>(),
);
