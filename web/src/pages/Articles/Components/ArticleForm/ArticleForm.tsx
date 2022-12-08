import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { useGetArticleCategories } from '../../../../hooks/api/ArticleCategories/useGetArticleCategories';
import { usePostArticle } from '../../../../hooks/api/articles/usePostArticle';
import { IArticleCategory } from '../../../../services/api/articleCategories/getArticleCategories';
import { Back } from '../../../../shared/Back';
import Layout from '../../../../shared/Layout';
import { selectStyles } from '../../../../styles/selectStyles';

interface IArticle {
  title: string;
  type: string;
  category: string;
  file: File | string;
  slug: string;
  description: string;
}

interface ITypeSelect {
  value: string;
  label: string;
}

const typeOptions: ITypeSelect[] = [
  { label: 'Stranica', value: 'Article' },
  { label: 'Blog', value: 'Article' },
];

const initialData: IArticle = {
  title: '',
  type: '',
  category: '',
  file: '',
  slug: '',
  description: '',
};

const ArticleForm = () => {
  const { data: categories, isLoading: categoriesLoading } =
    useGetArticleCategories();
  const [data, setData] = useState<IArticle>(initialData);
  const navigate = useNavigate();
  const { mutate: postArticle } = usePostArticle({
    onSuccess: () => navigate('/stranice'),
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      !(
        event.target.files?.[0].type.includes('image/png') ||
        event.target.files?.[0].type.includes('image/jpg') ||
        event.target.files?.[0].type.includes('image/webp')
      )
    ) {
      alert('Izabrani tip fajla nije podrzan.');
      return;
    }

    if (event.target.files?.[0])
      setData({ ...data, file: event.target.files[0] });
  };

  const handleTypeSelectChange = (option: SingleValue<ITypeSelect>) => {
    if (option?.value) setData({ ...data, type: option.value });
  };

  const handleArticleCategoryChange = (
    option: SingleValue<IArticleCategory>
  ) => {
    if (option?.id) setData({ ...data, category: option.id });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !data.title ||
      !data.category ||
      !data.description ||
      !data.file ||
      !data.type
    ) {
      alert('Molimo Vas, popunite sva polja i pokušajte ponovo.');
      return;
    }

    const article = new FormData();

    article.append('Title', data.title);
    article.append('Decription', data.description);
    article.append('Type', data.type);
    article.append('CategoryId', data.category);
    article.append('File', data.file);

    postArticle({ article });
  };

  return (
    <Layout>
      <div className="intro">
        <div className="intro__left">
          <Back text="Stranice" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="edit">
        <div className="post">
          <div className="post__item">
            <span className="post__name">Naslov:</span>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleInputChange}
              className="post__input"
            />
          </div>
          <div className="post__item">
            <span className="post__name">Tip:</span>
            <Select
              styles={selectStyles}
              options={typeOptions}
              getOptionLabel={(type) => type.label}
              getOptionValue={(type) => type.value}
              onChange={handleTypeSelectChange}
            />
          </div>
          <div className="post__item">
            <span className="post__name">Kategorija:</span>
            <Select
              isLoading={categoriesLoading}
              styles={selectStyles}
              options={categories}
              getOptionLabel={(category) => category.name}
              getOptionValue={(category) => category.id}
              onChange={handleArticleCategoryChange}
            />
          </div>
          <div className="post__item">
            <span className="post__name">
              Slika:
              <span className="post__desc">
                Maksimalna veličina slike: 20mb Podržani formati: .png, .jpg,
                .webp
              </span>
            </span>
            <input
              type="file"
              accept="image/png, image/jpg, image/webp"
              className="post__btn"
              onChange={handleFileInputChange}
            />
          </div>
          <div className="post__item">
            <span className="post__name">Opis:</span>
            <textarea
              className="post__editor"
              name="description"
              value={data.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="edit__btn edit__btn--approve">
          Sacuvaj
        </button>
      </form>
    </Layout>
  );
};

export default ArticleForm;
