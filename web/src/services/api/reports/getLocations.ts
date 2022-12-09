import { axiosRequest } from '../../axiosConfig';

export const getLocations = async (): Promise<string[]> => {
  const { data } = await axiosRequest('GET', '/api/locations');
  return data;
};
