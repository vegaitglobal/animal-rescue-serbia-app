import { Link } from 'react-router-dom';
import { API_URL } from '../../../../config';
import { Pencil } from '../../../../shared/Icons';
import { ArticleCardProps } from './ArticleCard.data';

const BASE_URL = API_URL;

const ArticleCard = ({
  id,
  photoUrl,
  type,
  title,
  description,
}: ArticleCardProps) => {
  const formatedUrl = BASE_URL + '/' + photoUrl?.replaceAll('\\', '/');
  const editLink = '/stranice/' + id;

  return (
    <div className="cards__card">
      {photoUrl ? <div
        className="cards__bg has-cover"
        style={{ backgroundImage: `url(${formatedUrl})` }}
      ></div> : <div
      className="cards__bg has-cover"
      style={{ background: 'gray' }}
    ></div>}
      <div className="cards__content">
        <span className="cards__type">
          <strong>TIP:</strong> {type}
        </span>
        <h3 className="cards__title">{title}</h3>
        <p className="cards__text">{description}</p>
        <Link type="button" className="cards__edit" to={editLink}>
          <Pencil />
          Izmeni
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
