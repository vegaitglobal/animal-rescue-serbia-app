import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getLocations } from '../../../services/api/reports/getLocations';

type UseGetLocationsOptions = Omit<
  UseQueryOptions<string[], Error, string[], Array<string>>,
  'queryKey' | 'queryFn'
>;

export const useGetLocations = (queryOptions?: UseGetLocationsOptions) => {
  return useQuery(['getLocations'], () => getLocations(), queryOptions);
};
