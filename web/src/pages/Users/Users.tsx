import { useState } from 'react';
import { useGetUsers } from '../../hooks/api/Users/useGetUsers';
import { IUserResponse } from '../../services/api/users/getUsers';
import Layout from '../../shared/Layout';
import Loader from '../../shared/Loader';
import UserItem from './Components/UserItem';

function Users() {
  const handleSuccess = (data: IUserResponse[]) => {
    setUsers(data);
  };

  const [users, setUsers] = useState<IUserResponse[]>();

  const { isLoading } = useGetUsers({ onSuccess: handleSuccess });

  if (isLoading) return <Loader />;

  const usersHTML = users?.map((item, index) => {
    return <UserItem user={item} key={item.id} orderNumber={index} />;
  });

  return (
    <Layout>
      <div className="intro">
        <div className="intro__left">
          <button type="button" className="intro__back-btn">
            Korisnici
          </button>
        </div>
      </div>
      <div className="users">
        <table className="users__table">
          <thead>
            <tr>
              <th>r.br</th>
              <th></th>
              <th>Korisničko ime</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>E-mail</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>{usersHTML}</tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Users;
