import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Create } from '../../shared/Icons';
import Layout from '../../shared/Layout';
import Search from '../../shared/Search';
import Articles from './Articles';

const ArticlesPage = () => {
  const navigate = useNavigate();

  const handleCreatePageClick = () => navigate('/stranice/kreiranje');

  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  return (
    <Layout>
      <div className="intro">
        <div className="intro__left">
          <button
            className="cards__create-button"
            onClick={handleCreatePageClick}
          >
            <Create />
            Kreiraj stranicu
          </button>
        </div>
        <Search value={searchQuery} handleValueChange={handleSearchChange} />
      </div>
      <Articles searchQuery={searchQuery} />
    </Layout>
  );
};

export default ArticlesPage;
