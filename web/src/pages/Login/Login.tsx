import React from 'react';
import Logo from '../../assets/logo.png';

const Login = () => {
    return (
        <>
            <header className="login-header">
                <img src={Logo} alt="Logo" className="login-header__logo" />
            </header>
            <main>
                <div className="login">
                    <h2 className="login__title">ULOGUJTE SE NA VAŠ NALOG</h2>
                    <form action="" className="form">
                        <input
                            type="text"
                            placeholder="Korisnicko ime"
                            className="form__input"
                        />
                        <input
                            type="password"
                            placeholder="Lozinka"
                            className="form__input"
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
