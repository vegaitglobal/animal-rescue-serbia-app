import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategories } from '../../hooks/api/Categories/useGetCategories';
import { usePostCategory } from '../../hooks/api/Categories/usePostCategory';
import Plus from '../../shared/Icons/Plus/Plus';
import Layout from '../../shared/Layout';
import Loader from '../../shared/Loader';
import CategoryItem from './Components/CategoryItem';

const Categories = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handlePostSuccess = () => {
    queryClient.refetchQueries(['getCategories']);
  };

  const [name, setName] = useState('');

  const { data: categories, isLoading } = useGetCategories();

  const { mutate: postSubmit } = usePostCategory({
    onSuccess: handlePostSuccess,
  });

  const reportItemsHTML = categories
    ?.filter((category) => category.isEnabled)
    .map((item) => <CategoryItem category={item} key={item.id} />);

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
          <h1 className="intro__title">Kategorije i Tipovi</h1>
        </div>
      </div>
      <div className="category">
        <h3 className="category__title">Kategorije</h3>
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
          <div className="category__buttons">{reportItemsHTML}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
