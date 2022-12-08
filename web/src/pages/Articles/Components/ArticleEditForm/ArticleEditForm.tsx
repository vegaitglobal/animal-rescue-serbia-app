import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { useGetArticleCategories } from '../../../../hooks/api/ArticleCategories/useGetArticleCategories';
import { useEditArticle } from '../../../../hooks/api/articles/useEditArticle';
import { useGetArticle } from '../../../../hooks/api/articles/useGetArticle';
import { Back } from '../../../../shared/Back';
import Layout from '../../../../shared/Layout';
import { selectStyles } from '../../../../styles/selectStyles';

interface IArticle {
  title?: string;
  type?: ITypeSelect;
  category?: ICategorySelect;
  file?: File | string | null;
  slug?: string;
  description?: string;
}
interface ITypeSelect {
  value: string;
  label: string;
}

interface ICategorySelect {
  value: string;
  label: string;
}

const typeOptions: ITypeSelect[] = [
  { label: 'Stranica', value: 'Page' },
  { label: 'Blog', value: 'Article' },
];

const ArticleEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate: editArticle } = useEditArticle({
    onSuccess: () => navigate('/stranice'),
  });

  const { data: categories, isLoading: categoriesLoading } =
    useGetArticleCategories();

  const [dropdownCategories, setDropdownCategories] = useState<
    ICategorySelect[]
  >([]);

  const [article, setArticle] = useState<IArticle>();

  const { data } = useGetArticle(id || '');

  useEffect(() => {
    let typeName = '';
    if (data?.type === 'Article') typeName = 'Blog';
    else typeName = 'Stranica';

    setArticle({
      title: data?.title,
      type: { label: typeName, value: data?.type || '' },
      category: {
        label: data?.category.name || '',
        value: data?.category.id || '',
      },
      description: data?.decription,
      file: data?.mediaContent?.filePath,
      slug: '',
    });
  }, [data]);

  useEffect(() => {
    categories?.map((category) =>
      setDropdownCategories((current) => [
        ...current,
        { label: category.name, value: category.id },
      ])
    );
  }, [categories]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
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
      setArticle({ ...article, file: event.target.files[0] });
  };

  const handleTypeSelectChange = (option: SingleValue<ITypeSelect>) => {
    if (option?.value)
      setArticle({
        ...article,
        type: { value: option.value, label: option.label },
      });
  };

  const handleArticleCategoryChange = (
    option: SingleValue<ICategorySelect>
  ) => {
    if (option?.value)
      setArticle({
        ...article,
        category: { value: option.value, label: option.label },
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(article);

    if (
      !article?.title ||
      !article?.category ||
      !article?.description ||
      !article?.type
    ) {
      alert('Molimo Vas, popunite sva polja i pokušajte ponovo.');
      return;
    }

    const articleEdit = new FormData();
    articleEdit.append('Title', article.title);
    articleEdit.append('Decription', article.description);
    articleEdit.append('Type', article.type.value);
    articleEdit.append('CategoryId', article.category.value);
    if (article.file) articleEdit.append('File', article.file);
    editArticle({ id: id || '', article: articleEdit });
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
              value={article?.title}
              onChange={handleInputChange}
              className="post__input"
            />
          </div>
          <div className="post__item">
            <span className="post__name">Tip:</span>
            <Select
              value={article?.type}
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
              value={article?.category}
              isLoading={categoriesLoading}
              styles={selectStyles}
              options={dropdownCategories}
              getOptionLabel={(category) => category.label}
              getOptionValue={(category) => category.value}
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
              value={article?.description}
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

export default ArticleEditForm;
