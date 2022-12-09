import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import jwtTokenApi from '../../services/jwt.service';
import storageApi from '../../services/storage.service';

const Sidebar = () => {
  const navigate = useNavigate();
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const email = localStorage.getItem('email');
  const isAdmin = jwtTokenApi.isAdmin();

  const handleLogOut = () => {
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    storageApi.clearToken();
    navigate('/prijavljivanje');
  };

  return (
    <header className="header">
      <img src={Logo} alt="Logo" className="header__logo" />
      <span className="header__name">{`${firstName} ${lastName}`}</span>
      <span className="header__address">{email}</span>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              to="/prijave"
              className={({ isActive }) =>
                isActive ? 'nav__btn nav__btn--active' : 'nav__btn'
              }
            >
              Prijave
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/stranice"
              className={({ isActive }) =>
                isActive ? 'nav__btn nav__btn--active' : 'nav__btn'
              }
            >
              Stranice
            </NavLink>
          </li>
          {isAdmin && (
            <li className="nav__item">
              <NavLink
                to="/korisnici"
                className={({ isActive }) =>
                  isActive ? 'nav__btn nav__btn--active' : 'nav__btn'
                }
              >
                Korisnici
              </NavLink>
            </li>
          )}
          <li className="nav__item">
            <NavLink
              to="/kategorije"
              className={({ isActive }) =>
                isActive ? 'nav__btn nav__btn--active' : 'nav__btn'
              }
            >
              Kategorije za Prijave
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/kategorije-stranice"
              className={({ isActive }) =>
                isActive ? 'nav__btn nav__btn--active' : 'nav__btn'
              }
            >
              Kategorije za Stranice
            </NavLink>
          </li>
        </ul>
      </nav>
      <button type="button" className="header__logout" onClick={handleLogOut}>
        Odjavi se
      </button>
    </header>
  );
};

export default Sidebar;
