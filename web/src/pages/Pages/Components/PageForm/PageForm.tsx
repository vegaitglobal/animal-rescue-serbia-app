import { useState } from 'react';
import Select from 'react-select';
import { Back } from '../../../../shared/Back';
import Layout from '../../../../shared/Layout';
import { selectStyles } from '../../../../styles/selectStyles';

interface IPage {
  title: string;
  type: string; //  should be select
  category: string; //  should be select
  file: string; //  should be file
  slug: string;
  description: string;
}

const initialData: IPage = {
  title: '',
  type: '',
  category: '',
  file: '',
  slug: '',
  description: '',
};

const PageForm = () => {
  const [data, setData] = useState<IPage>(initialData);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <Layout>
      <div className="intro">
        <div className="intro__left">
          <Back text="Stranice" />
        </div>
      </div>
      <div className="edit">
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
            <Select styles={selectStyles} />
          </div>
          <div className="post__item">
            <span className="post__name">Kategorija:</span>
            <Select styles={selectStyles} />
          </div>
          <div className="post__item">
            <span className="post__name">
              Kategorija:
              <span className="post__desc">
                Maksimalna veličina slike: 20mb Podržani formati: .png, .jpg,
                .webp
              </span>
            </span>
            <button type="button" className="post__btn">
              Dodaj sliku
            </button>
          </div>
          <div className="post__item">
            <span className="post__name">Slug:</span>
            <input
              type="text"
              name="slug"
              value={data.slug}
              onChange={handleInputChange}
              className="post__input"
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
        <button type="button" className="edit__btn edit__btn--approve">
          Sacuvaj
        </button>
      </div>
    </Layout>
  );
};

export default PageForm;
