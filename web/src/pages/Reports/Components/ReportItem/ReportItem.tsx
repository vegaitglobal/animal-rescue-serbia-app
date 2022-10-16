import { Link } from 'react-router-dom';
import {
  IReportsResponse,
  ReportsStatus,
} from '../../../../services/api/reports/getReports';
import { Pencil } from '../../../../shared/Icons';
import classNames from 'classnames';

type Props = {
  singleReport: IReportsResponse;
};

const ReportItem: React.FC<Props> = ({ singleReport }) => {
  const editLink = '/prijave/' + singleReport.id;

  const statusText = () => {
    if (singleReport.status === ReportsStatus.Accepted) return 'prihvaćen';
    if (singleReport.status === ReportsStatus.Rejected) return 'odbijen';
    return 'u obradi';
  };

  return (
    <li
      className={classNames('panel__item', {
        'panel__item--declined': singleReport.status === ReportsStatus.Rejected,
        'panel__item--approved': singleReport.status === ReportsStatus.Accepted,
      })}
    >
      <div>
        <span className="panel__address">
          <strong>{singleReport.location}</strong>, {singleReport.address}
        </span>
        <p className="panel__text">{singleReport.description}</p>
        <div className="panel__holder">
          <span
            className={classNames('panel__status', {
              'panel__status--red':
                singleReport.status === ReportsStatus.Rejected,
              'panel__status--green':
                singleReport.status === ReportsStatus.Accepted,
            })}
          >
            {statusText()}
          </span>
          <Link to={editLink} type="button" className="panel__edit">
            <Pencil />
            Izmeni
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ReportItem;
