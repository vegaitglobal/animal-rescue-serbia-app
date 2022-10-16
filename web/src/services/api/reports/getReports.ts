import { axiosRequest } from '../../axiosConfig';

export interface IReportCategory {
  id: string;
  name: string;
  isEnabled: boolean;
}

export enum ReportsStatus {
  Pending = 'Pending',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
  Processed = 'Processed',
}

export interface IMediaContent {
  id: string;
  fileName: string;
  filePath: string;
}

export interface IReportsResponse {
  id: string;
  location: string;
  violationCategory: IReportCategory;
  fullName: string;
  address: string;
  phoneNumber: string;
  description: string;
  adminNotes: string;
  status: ReportsStatus;
  mediaContent: IMediaContent;
}

export const getReports = async (): Promise<IReportsResponse> => {
  const { data } = await axiosRequest('GET', '/api/admin/violations');

  return data;
};
