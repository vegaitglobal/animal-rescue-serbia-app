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

export interface IReportsPageResponse {
  pageNumber: number;
  filteredCount: number;
  entities: IReportsResponse[];
}

export const getReports = async (
  pageParam: number,
  status?: number | null,
  search?: string
): Promise<IReportsPageResponse> => {
  const url = `/api/admin/violations/PaginatedViolations?PageNumber=${pageParam}`;
  const statusParam = status ? `/ViolationStatus=${status}` : '';
  const searchParam = search ? `/Search=${search}` : '';
  const { data } = await axiosRequest('GET', url + statusParam + searchParam);

  return data;
};
