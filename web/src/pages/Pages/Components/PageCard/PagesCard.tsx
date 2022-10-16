import { Pencil } from '../../../../shared/Icons';
import { PagesCardProps } from './PagesCard.data';

const PagesCard = ({ photoUrl, type, title, description }: PagesCardProps) => {
  return (
    <div className="cards__card">
      <div
        className="cards__bg has-cover"
        style={{ backgroundImage: `url(${photoUrl})` }}
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
