import { useNavigate } from 'react-router-dom';
import { useAdminArticles } from '../../hooks/api/articles/useAdminArticles';
import Layout from '../../shared/Layout';
import Loader from '../../shared/Loader';
import Search from '../../shared/Search';
import { PagesCard } from './Components';

const Pages = () => {
  const navigate = useNavigate();

  const handleCreatePageClick = () => navigate('/stranice/kreiranje');

  const {
    data: adminArticles,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useAdminArticles();

  const renderAdminArticles = adminArticles?.pages?.map((page) =>
    page?.entities?.map((article) => (
      <PagesCard
        key={article.id}
        photoUrl={article.mediaContent?.filePath}
        title={article.title}
        description={article.description}
        type={article.type}
      />
    ))
  );

  const handleLoadMore = () => fetchNextPage();

  if (isLoading) return <Loader />;

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
      <div className="cards">{renderAdminArticles}</div>
      {hasNextPage && (
        <button className="load-more__button" onClick={handleLoadMore}>
          Učitaj još
        </button>
      )}
    </Layout>
  );
};

export default Pages;
