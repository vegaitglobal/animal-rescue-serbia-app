import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useLogin } from '../../hooks/api/login/useLogin';
import { ILoginRequest, ILoginResponse } from '../../services/api/auth';
import storageApi from '../../services/storage.service';

const Login = () => {
  const [loginData, setloginData] = useState<ILoginRequest>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSuccess = (data: ILoginResponse) => {
    storageApi.storeToken(data.accessToken);
    navigate('/prijave');
  };
  const { mutate: loginSubmit } = useLogin({ onSuccess: handleSuccess });

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginSubmit(loginData);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setloginData({ ...loginData, email: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setloginData({ ...loginData, password: event.target.value });
  };

  return (
    <>
      <header className="login-header">
        <img src={Logo} alt="Logo" className="login-header__logo" />
      </header>
      <main>
        <div className="login">
          <h2 className="login__title">ULOGUJTE SE NA VAŠ NALOG</h2>
          <form onSubmit={handleLoginSubmit} className="form">
            <input
              type="text"
              placeholder="Korisnicko ime"
              className="form__input"
              onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="Lozinka"
              className="form__input"
              onChange={handlePasswordChange}
            />
            <button type="submit" className="form__btn">
              Prijavite se
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
