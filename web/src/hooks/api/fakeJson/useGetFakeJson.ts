import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getFakeJson, IFakeJsonResponse } from '../../../services/api/fakeJson';

type UseGetFakeJsonOptions = Omit<
    UseQueryOptions<IFakeJsonResponse, Error, IFakeJsonResponse, Array<string>>,
    'queryKey' | 'queryFn'
>;

export const useGetFakeJson = (queryOptions?: UseGetFakeJsonOptions) => {
    return useQuery(['fakeJson'], getFakeJson, queryOptions);
};
