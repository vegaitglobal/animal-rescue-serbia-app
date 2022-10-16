import Layout from '../../shared/Layout';

const EditUser = () => {
  return (
    <Layout>
      <div className="intro">
        <div className="intro__left">
          <button type="button" className="intro__back-btn">
            <svg
              width="11"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m9.926 19.117.86-.816c.171-.215.171-.559 0-.73L3.007 9.75l7.777-7.777c.172-.172.172-.516 0-.73l-.86-.817a.495.495 0 0 0-.73 0L.172 9.406a.582.582 0 0 0 0 .73l9.023 8.981a.495.495 0 0 0 .73 0Z"
                fill="#000"
              />
            </svg>
            Izmena korisnika
          </button>
        </div>
      </div>
      <div className="edit">
        <div className="edit__user">
          <div className="edit__profil">
            <span className="edit__name">Petar Petrovic</span>
          </div>
          <form action="" className="edit__user-form">
            <div className="edit__user-item">
              <label className="edit__user-label">Ime</label>
              <input type="text" value="Petar" className="edit__user-input" />
            </div>
            <div className="edit__user-item">
              <label className="edit__user-label">Prezime</label>
              <input
                type="text"
                value="Petrovic"
                className="edit__user-input"
              />
            </div>
            <div className="edit__user-item">
              <label className="edit__user-label">Korisnicko ime</label>
              <input
                type="text"
                value="p.petrovic"
                className="edit__user-input"
              />
            </div>
            <div className="edit__user-item">
              <label className="edit__user-label">E-mail</label>
              <input
                type="text"
                value="petar.petrovic@gmail.com"
                className="edit__user-input"
              />
            </div>
            <div className="edit__user-item">
              <label className="edit__user-label">Lozinka</label>
              <input
                type="password"
                value="Pass4Vega"
                className="edit__user-input"
              />
            </div>
            <div className="edit__user-item">
              <label className="edit__user-label">Ponovi lozinku</label>
              <input
                type="password"
                value="Pass4Vega"
                className="edit__user-input"
              />
            </div>
          </form>
        </div>
        <button type="button" className="edit__btn edit__btn--approve">
          Sacuvaj
        </button>
      </div>
    </Layout>
  );
};

export default EditUser;
