import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useGetArticleCategories } from '../../hooks/api/articles/useGetArticleCategories';
import { usePostArticleCategory } from '../../hooks/api/articles/usePostArticleCategory';
import Plus from '../../shared/Icons/Plus/Plus';
import Layout from '../../shared/Layout';
import Loader from '../../shared/Loader';
import ArticleCategoryItem from './components/ArticleCategoryItem';

const ArticleCategories = () => {
  const queryClient = useQueryClient();

  const handlePostSuccess = () => {
    queryClient.refetchQueries(['getArticleCategories']);
  };

  const [name, setName] = useState('');

  const { mutate: postSubmit } = usePostArticleCategory({
    onSuccess: handlePostSuccess,
  });

  const { data: articleCategories, isLoading } = useGetArticleCategories();

  const articleCategoryEnabledItemsHTML = articleCategories
    ?.filter((category) => category.isEnabled)
    .map((item) => <ArticleCategoryItem category={item} key={item.id} />);

  const articleCategoryDisabledItemsHTML = articleCategories
    ?.filter((category) => !category.isEnabled)
    .map((item) => <ArticleCategoryItem category={item} key={item.id} />);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleNewCategoryClick = () => {
    postSubmit({ name: name });
    setName('');
  };

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <div className="intro">
        <div className="intro__left">
          <h1 className="intro__title">Kategorije </h1>
        </div>
      </div>
      <div className="category">
        <h3 className="category__title">Kategorije za Stranice</h3>
        <div className="category__container">
          <div className="category__holder">
            <input
              type="text"
              className="category__input"
              value={name}
              onChange={handleOnChange}
            />
            <button
              className="category__add-btn"
              onClick={handleNewCategoryClick}
            >
              <Plus />
              Dodaj kategoriju
            </button>
          </div>
          <div className="category__container">
            <h3>Aktivne Kategorije</h3>
            <div className="category__buttons">
              {articleCategoryEnabledItemsHTML}
            </div>
          </div>
          <div className="category__container">
            <h3>Arhivirane Kategorije</h3>
            <div className="category__buttons">
              {articleCategoryDisabledItemsHTML}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticleCategories;
