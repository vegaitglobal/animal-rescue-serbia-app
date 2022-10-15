import { Back } from '../../shared/Back';
import Layout from '../../shared/Layout';

const EditReport = () => {
  return (
    <Layout>
      <div className="intro">
        <div className="intro__left">
          <Back text="Izmena prekršaja" />
        </div>
      </div>
      <div className="edit">
        <form action="" className="edit__form">
          <div className="edit__item">
            <label className="edit__label">Ime i Prezime</label>
            <input type="text" className="edit__input" value="Petar Pertovic" />
          </div>
          <div className="edit__item">
            <label className="edit__label">Broj telefona</label>
            <input type="text" className="edit__input" value="066 952 6533" />
          </div>
          <div className="edit__item">
            <label className="edit__label">lokacija prekrsaja</label>
            <input type="text" className="edit__input" value="Novi Sad" />
          </div>
          <div className="edit__item">
            <label className="edit__label">Adresa Prekrsaja</label>
            <input
              type="text"
              className="edit__input"
              value="Novosadskog Sajma 2"
            />
          </div>
          <div className="edit__item">
            <label className="edit__label">Tip prekrsaja</label>
            <input type="text" className="edit__input" value="Prekrsaj 1" />
          </div>
          <div className="edit__item">
            <label className="edit__label">Fotografija / video</label>
            <input type="text" className="edit__input" value="" />
          </div>
          <div className="edit__item edit__item--full">
            <label className="edit__label">Opis prekrsaja</label>
            <textarea name="" id="" className="edit__textarea">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, platea
              diam eu viverra curabitur semper, mollis ad leo sed condimentum
              mauris. Proin consequat penatibus vitae diam netus aliquet
              elementum eros ligula eget conubia et dignissim, nostra natoque
              senectus hac tincidunt justo purus habitasse felis iaculis blandit
              aptent. Rutrum ultricies risus arcu porta erat suscipit sociosqu
            </textarea>
          </div>
        </form>
        <button type="button" className="edit__btn edit__btn--approve">
          Odobri
        </button>
        <button type="button" className="edit__btn edit__btn--decline">
          Odbij
        </button>
      </div>
    </Layout>
  );
};

export default EditReport;
