import { useNavigate } from 'react-router-dom';
import Layout from '../../shared/Layout';
import Search from '../../shared/Search';
import { PagesCard } from './Components';

const Pages = () => {
  const navigate = useNavigate();

  const handleCreatePageClick = () => navigate('/stranice/kreiranje');

  return (
    <Layout>
      <div className="intro">
        <div className="intro__left">
          <button
            className="cards__create-button"
            onClick={handleCreatePageClick}
          >
            Kreiraj stranicu
          </button>
        </div>
        <Search />
      </div>
      <div className="cards">
        <PagesCard
          photoUrl="./animal-1.jpg"
          title="Naslov 1"
          description="Opis"
          type="Tip 1"
        />
        <PagesCard
          photoUrl="./animal-2.jpg"
          title="Naslov 2"
          description="Opis"
          type="Tip 2"
        />
        <PagesCard
          photoUrl="./animal-3.jpg"
          title="Naslov 3"
          description="Opis"
          type="Tip 3"
        />
        <PagesCard
          photoUrl="./animal-4.jpg"
          title="Naslov 4"
          description="Opis"
          type="Tip 4"
        />
      </div>
    </Layout>
  );
};

export default Pages;
