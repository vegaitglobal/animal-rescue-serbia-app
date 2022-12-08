import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { usePutUsers } from '../../../../hooks/api/Users/usePutUsers';
import { IUserResponse } from '../../../../services/api/users/getUsers';
import { Pencil } from '../../../../shared/Icons';

type Props = {
  user: IUserResponse;
  orderNumber: number;
};

const UserItem: React.FC<Props> = ({ user, orderNumber }) => {
  const editLink = '/korisnici/' + user.id;
  const queryClient = useQueryClient();

  const handleMutationSuccess = () => {
    queryClient.refetchQueries(['getUsers']);
  };

  const { mutate: updateSubmit } = usePutUsers({
    onSuccess: handleMutationSuccess,
  });

  const toggleArchive = () => {
    updateSubmit({
      id: user.id,
      putData: {
        ...user,
        isActive: !user.isActive,
      },
    });
  };

  const archiveText = user.isActive ? 'Arhiviraj' : 'Aktiviraj';

  const isUserActive = user.isActive;

  return (
    <tr>
      <td>{orderNumber}</td>
      <td>
        <img src="./user.jpg" alt="" />
      </td>
      <td>{user.username}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td className="users__buttons">
        <Link
          to={editLink}
          type="button"
          className="users__btn users__btn--change"
        >
          <Pencil />
          Izmeni
        </Link>
        <button
          type="button"
          className={`users__btn ${
            isUserActive ? 'users__btn--active' : 'users__btn--delete'
          }`}
          onClick={toggleArchive}
        >
          {archiveText}
        </button>
      </td>
    </tr>
  );
};

export default UserItem;
