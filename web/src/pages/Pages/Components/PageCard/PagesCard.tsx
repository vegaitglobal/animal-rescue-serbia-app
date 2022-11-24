import { Pencil } from '../../../../shared/Icons';
import { PagesCardProps } from './PagesCard.data';

const BASE_URL = process.env.REACT_APP_API_URL;

const PagesCard = ({ photoUrl, type, title, description }: PagesCardProps) => {
  const formatedUrl = BASE_URL + '/' + photoUrl?.replaceAll('\\', '/');

  return (
    <div className="cards__card">
      <div
        className="cards__bg has-cover"
        style={{ backgroundImage: `url(${formatedUrl})` }}
      ></div>
      <div className="cards__content">
        <span className="cards__type">
          <strong>TIP:</strong> {type}
        </span>
        <h3 className="cards__title">{title}</h3>
        <p className="cards__text">{description}</p>
        <button type="button" className="cards__edit">
          <Pencil />
          Izmeni
        </button>
      </div>
    </div>
  );
};

export default PagesCard;
