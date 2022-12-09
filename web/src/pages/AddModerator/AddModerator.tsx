import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostModerator } from '../../hooks/api/Users/usePostModerator';
import { IPostModeratorRequest } from '../../services/api/users/postModerator';
import { Pencil } from '../../shared/Icons';
import Layout from '../../shared/Layout';

const AddModerator = () => {
  const navigate = useNavigate();
  const [moderator, setModerator] = React.useState<IPostModeratorRequest>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
    username: '',
  });

  const handleSuccess = () => {
    navigate('/korisnici');
  };

  const { mutate: updateSubmit } = usePostModerator({
    onSuccess: handleSuccess,
    onError: (error) => {
      alert(error);
    },
  });

  const handleSubmit = () => {
    if (moderator) {
      if (moderator.password !== moderator.passwordConfirm) {
        alert('Lozinke moraju biti iste.');
        return;
      }
      if (moderator.password.length < 3) {
        alert('Lozinka mora imati minimum 3 karaktera');
      }
      updateSubmit(moderator);
    }
  };

  const handleModeratorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (moderator) {
      setModerator({
        ...moderator,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }
  };

  const addFormHTML = (
    <div className="edit">
      <div className="edit__user">
        <form action="" className="edit__user-form">
          <div className="edit__user-item">
            <label className="edit__user-label">Ime</label>
            <input
              type="text"
              name="firstName"
              value={moderator?.firstName}
              className="edit__user-input"
              onChange={handleModeratorChange}
            />
          </div>
          <div className="edit__user-item">
            <label className="edit__user-label">Prezime</label>
            <input
              type="text"
              name="lastName"
              value={moderator?.lastName}
              className="edit__user-input"
              onChange={handleModeratorChange}
            />
          </div>
          <div className="edit__user-item">
            <label className="edit__user-label">Korisnicko ime</label>
            <input
              type="text"
              name="username"
              value={moderator?.username}
              className="edit__user-input"
              onChange={handleModeratorChange}
            />
          </div>
          <div className="edit__user-item">
            <label className="edit__user-label">E-mail</label>
            <input
              type="text"
              name="email"
              value={moderator?.email}
              className="edit__user-input"
              onChange={handleModeratorChange}
            />
          </div>
          <div className="edit__user-item">
            <label className="edit__user-label">Lozinka</label>
            <input
              type="password"
              name="password"
              value={moderator?.password}
              className="edit__user-input"
              onChange={handleModeratorChange}
            />
          </div>
          <div className="edit__user-item">
            <label className="edit__user-label">Potvrdi lozinku</label>
            <input
              type="password"
              name="passwordConfirm"
              value={moderator?.passwordConfirm}
              className="edit__user-input"
              onChange={handleModeratorChange}
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
            Dodaj moderatora
          </button>
        </div>
      </div>
      {moderator && addFormHTML}
    </Layout>
  );
};

export default AddModerator;
