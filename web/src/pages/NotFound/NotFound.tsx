import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="not-found">
      <div className="not-found__holder">
        <h1 className="not-found__title">Tražena stranica nije pronađena</h1>
        <Link to="/prijave" className="not-found__btn">
          Nazad na prijave
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
