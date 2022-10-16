import React from 'react';

type Props = {
  title: string;
  content?: string;
  handleCancel: () => unknown;
  handleApprove: () => unknown;
  children?: React.ReactNode;
};

const Modal: React.FC<Props> = ({
  title,
  content = '',
  handleApprove,
  handleCancel,
  children,
}) => {
  return (
    <div className="popup">
      <div className="popup__box">
        <h3 className="popup__title">{title}</h3>
        {content && <p className="popup__text">{content}</p>}
        {children}
        <div className="popup__buttons">
          <button
            type="button"
            className="popup__btn popup__btn--cancel"
            onClick={handleCancel}
          >
            Otkazi
          </button>
          <button
            type="button"
            className="popup__btn popup__btn--approve"
            onClick={handleApprove}
          >
            Potvrdi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
