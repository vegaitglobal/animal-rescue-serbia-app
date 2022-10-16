import { axiosRequest } from '../../axiosConfig';
import { IReportsResponse } from './getReports';

export interface IPutReportRequest {
  description: string;
  adminNotes: string;
  status: string;
}

export interface IPutReportWithId {
  putData: IPutReportRequest;
  id: string;
}

export const putSingleReport = async (
  updateData: IPutReportWithId
): Promise<IReportsResponse> => {
  const { data } = await axiosRequest(
    'PUT',
    '/api/admin/violations/' + updateData.id,
    {
      data: updateData.putData,
    }
  );

  return data;
};
