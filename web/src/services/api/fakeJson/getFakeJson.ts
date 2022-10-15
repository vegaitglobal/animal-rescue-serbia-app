import { axiosRequest } from '../../axiosConfig';

export interface IFakeJsonResponse {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const getFakeJson = async (): Promise<IFakeJsonResponse> => {
    const { data } = await axiosRequest(
        'GET',
        'https://jsonplaceholder.typicode.com/todos/1'
    );

    return data;
};
