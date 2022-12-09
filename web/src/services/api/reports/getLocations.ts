import { axiosRequest } from '../../axiosConfig';

export const getLocations = async (): Promise<string[]> => {
  const { data } = await axiosRequest('GET', '/locations');
  return data;
};
