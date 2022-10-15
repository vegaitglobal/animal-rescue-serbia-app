import React from 'react';
import Logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <header className="header">
      <img src={Logo} alt="Logo" className="header__logo" />
      <span className="header__name">Petar Petrović</span>
      <span className="header__address">petar_petrovic@gmail.com</span>
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
        </ul>
      </nav>
      <button type="button" className="header__logout">
        Odjavi se
      </button>
    </header>
  );
};

export default Sidebar;
