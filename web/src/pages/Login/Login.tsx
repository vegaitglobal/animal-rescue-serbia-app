import jwt_decode from 'jwt-decode';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useLogin } from '../../hooks/api/login/useLogin';
import { ILoginRequest, ILoginResponse } from '../../services/api/auth';
import storageApi from '../../services/storage.service';

interface User {
  name: string;
  family_name: string;
  email: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setloginData] = useState<ILoginRequest>({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    if (storageApi.hasToken()) {
      navigate('/prijave');
    }
  }, [navigate]);

  const handleSuccess = (data: ILoginResponse) => {
    const decodedToken: User = jwt_decode(data.accessToken);
    localStorage.setItem('firstName', decodedToken.name);
    localStorage.setItem('lastName', decodedToken.family_name);
    localStorage.setItem('email', decodedToken.email);

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
