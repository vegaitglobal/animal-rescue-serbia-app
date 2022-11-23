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
  status?: ReportsStatus | null,
  search?: string,
  location?: string,
  categoryId?: string
): Promise<IReportsPageResponse> => {
  const url = `/api/admin/violations/PaginatedViolations?PageNumber=${pageParam}`;
  const statusParam = status ? `&ViolationStatus=${status}` : '';
  const searchParam = search ? `&SearchText=${search}` : '';
  const locationParam = location ? `&Location=${location}` : '';
  const categoryIdParam = categoryId ? `&CategoryId=${categoryId}` : '';
  const { data } = await axiosRequest(
    'GET',
    url + statusParam + searchParam + locationParam + categoryIdParam
  );

  return data;
};
