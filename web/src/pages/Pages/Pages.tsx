import React from 'react';
import { useAdminArticles } from '../../hooks/api/articles/useAdminArticles';
import Loader from '../../shared/Loader';
import { PagesCard } from './Components';

interface IProps {
  searchQuery: string;
}

const Pages: React.FC<IProps> = ({ searchQuery }) => {
  const {
    data: adminArticles,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useAdminArticles(searchQuery);

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
    <>
      <div className="cards">{renderAdminArticles}</div>
      {hasNextPage && (
        <button className="load-more__button" onClick={handleLoadMore}>
          Učitaj još
        </button>
      )}
    </>
  );
};

export default Pages;
