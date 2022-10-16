import Layout from '../../shared/Layout';
import UserItem from './Components/UserItem';

function Users() {
  const users = [1, 2, 3, 4, 5].map((u) => {
    return <UserItem key={u} />;
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
          <tr>
            <th>r.br</th>
            <th></th>
            <th>Korisničko ime</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>E-mail</th>
            <th>Akcije</th>
          </tr>
          {users}
        </table>
      </div>
    </Layout>
  );
}

export default Users;
