import { useGetFakeJson } from '../../hooks/api/fakeJson';
import Layout from '../../shared/Layout';

const Users = () => {
    const { data, isLoading, isError } = useGetFakeJson();

    if (isLoading) return <h1>Loading...</h1>;

    if (isError) return <h1>Error has occured</h1>;

    return <Layout>{JSON.stringify(data)}</Layout>;
};

export default Users;
