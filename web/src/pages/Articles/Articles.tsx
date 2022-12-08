import React from 'react';
import { useAdminArticles } from '../../hooks/api/articles/useAdminArticles';
import Loader from '../../shared/Loader';
import { ArticleCard } from './Components';

interface IProps {
  searchQuery: string;
}

const Articles: React.FC<IProps> = ({ searchQuery }) => {
  const {
    data: adminArticles,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useAdminArticles(searchQuery);

  const renderAdminArticles = adminArticles?.pages?.map((page) =>
    page?.entities?.map((article) => (
      <ArticleCard
        key={article.id}
        id={article.id}
        photoUrl={article.mediaContent?.relativeFilePath}
        title={article.title}
        description={article.decription}
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

export default Articles;
