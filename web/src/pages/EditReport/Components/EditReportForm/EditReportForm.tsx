import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../config';
import { useUpdateReport } from '../../../../hooks/api/reports/useUpdateReport';
import {
  IReportsResponse,
  ReportsStatus,
} from '../../../../services/api/reports/getReports';
import './style.scss';

type Props = {
  report: IReportsResponse;
};

const API_BASE_URL = API_URL;

const EditReportForm: React.FC<Props> = ({ report }) => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate('/prijave');
  };

  const [desc, setDesc] = useState<string>(
    report.description ? report.description : ''
  );

  const { mutate: updateSubmit } = useUpdateReport({
    onSuccess: handleSuccess,
  });

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDesc(event.target.value);
  };

  const handleClick = (status: ReportsStatus) => {
    updateSubmit({
      id: report.id,
      putData: {
        description: desc,
        adminNotes: '',
        status,
      },
    });
  };

  const mediaContentHTML = report.mediaContent.map((item) => {
    return (
      <a
        href={API_BASE_URL + '/' + item.relativeFilePath}
        target="_blank"
        rel="noreferrer"
        className="media"
      >
        {item.fileName}
      </a>
    );
  });

  return (
    <div className="edit">
      <form action="" className="edit__form">
        <div className="edit__item">
          <label className="edit__label">Ime i Prezime</label>
          <input
            type="text"
            className="edit__input"
            value={report.fullName}
            readOnly
          />
        </div>
        <div className="edit__item">
          <label className="edit__label">Broj telefona</label>
          <input
            type="text"
            className="edit__input"
            value={report.phoneNumber}
            readOnly
          />
        </div>
        <div className="edit__item">
          <label className="edit__label">lokacija prekrsaja</label>
          <input
            type="text"
            className="edit__input"
            value={report.location}
            readOnly
          />
        </div>
        <div className="edit__item">
          <label className="edit__label">Adresa Prekrsaja</label>
          <input
            type="text"
            className="edit__input"
            value={report.address}
            readOnly
          />
        </div>
        <div className="edit__item">
          <label className="edit__label">Tip prekrsaja</label>
          <input
            type="text"
            className="edit__input"
            value={report.violationCategory.name}
            readOnly
          />
        </div>
        <div className="edit__item">
          <label className="edit__label">Fotografija / video</label>
          <span>{mediaContentHTML}</span>
        </div>
        <div className="edit__item edit__item--full">
          <label className="edit__label">Opis prekrsaja</label>
          <textarea
            name="description"
            id=""
            className="edit__textarea"
            onChange={handleDescriptionChange}
            value={desc}
          />
        </div>
      </form>
      <button
        type="button"
        className="edit__btn edit__btn--approve"
        onClick={() => handleClick(ReportsStatus.Accepted)}
      >
        Odobri
      </button>
      <button
        type="button"
        className="edit__btn edit__btn--decline"
        onClick={() => handleClick(ReportsStatus.Rejected)}
      >
        Odbij
      </button>

      <button
        type="button"
        className="edit__btn edit__btn--ignore"
        onClick={() => handleClick(ReportsStatus.Processed)}
      >
        Označi kao procesuirano
      </button>
    </div>
  );
};

export default EditReportForm;
