import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import Select, { CSSObjectWithLabel } from 'react-select';
import { useGetSingleUser } from '../../hooks/api/Users/useGetSingleUser';
import { usePutUsers } from '../../hooks/api/Users/usePutUsers';
import { IUserResponse, UserRole } from '../../services/api/users/getUsers';
import { Pencil } from '../../shared/Icons';
import Layout from '../../shared/Layout';

const EditUser: React.FC = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const handleMutationSuccess = () => {
    queryClient.refetchQueries(['getSingleUser']);
  };

  const [user, setUser] = React.useState<IUserResponse>();

  const handleSuccess = (data: IUserResponse) => {
    setUser(data);
  };

  const { data } = useGetSingleUser(id ? id : '', { onSuccess: handleSuccess });

  const { mutate: updateSubmit } = usePutUsers({
    onSuccess: handleMutationSuccess,
  });

  const handleSubmit = () => {
    if (user) {
      updateSubmit({
        id: user?.id,
        putData: {
          ...user,
        },
      });
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({
        ...user,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }
  };

  const handleRoleChange = (event: any) => {
    if (user) {
      setUser({ ...user, role: event.value });
    }
  };

  const roleOptions = [
    { value: UserRole.Moderator, label: 'Moderator' },
    { value: UserRole.User, label: 'Korisnik' },
  ];

  const selectStyles = {
    control: (provided: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
      ...provided,
      border: `1px solid #ccc`,
      boxShadow: `inset 0 0 0 0 ${state.isFocused ? '#3e3d3d' : '#3e3d3d'}`,
      width: '100%',
      '&:hover': {
        cursor: 'pointer',
        borderColor: '#3e3d3d',
      },
    }),
    option: (provided: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
      ...provided,
      fontSize: '15px',
      backgroundColor: state.isFocused ? '#3e3d3dc2' : 'transparent',
      color: state.isFocused ? '#fff' : '#3e3d3d',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#3e3d3dc2',
      },
    }),
  };

  const editFormHTML = (
    <div className="edit">
      <div className="edit__user">
        <div className="edit__profil">
          <span className="edit__name">
            {data && data.firstName + ' ' + data.lastName}
          </span>
        </div>
        <form action="" className="edit__user-form">
          <div className="edit__user-item">
            <label className="edit__user-label">Ime</label>
            <input
              type="text"
              name="firstName"
              value={user?.firstName}
              className="edit__user-input"
              onChange={handleUserChange}
            />
          </div>
          <div className="edit__user-item">
            <label className="edit__user-label">Prezime</label>
            <input
              type="text"
              name="lastName"
              value={user?.lastName}
              className="edit__user-input"
              onChange={handleUserChange}
            />
          </div>
          <div className="edit__user-item">
            <label className="edit__user-label">Korisnicko ime</label>
            <input
              type="text"
              name="username"
              value={user?.username}
              className="edit__user-input"
              onChange={handleUserChange}
            />
          </div>
          <div className="edit__user-item">
            <label className="edit__user-label">E-mail</label>
            <input
              type="text"
              disabled
              value={user?.email}
              className="edit__user-input"
            />
          </div>
          <div className="edit__user-item">
            <label className="edit__user-label">Rola</label>
            <Select
              styles={selectStyles}
              options={roleOptions}
              value={roleOptions.filter((item) => item.value === user?.role)}
              onChange={handleRoleChange}
            />
          </div>
        </form>
      </div>
      <button
        type="button"
        className="edit__btn edit__btn--approve"
        onClick={handleSubmit}
      >
        Sacuvaj
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="intro">
        <div className="intro__left">
          <button type="button" className="intro__back-btn">
            <Pencil />
            Izmena korisnika
          </button>
        </div>
      </div>
      {user && editFormHTML}
    </Layout>
  );
};

export default EditUser;
