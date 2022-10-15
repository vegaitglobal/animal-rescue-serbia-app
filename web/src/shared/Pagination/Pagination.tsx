import React from 'react';

const Pagination = () => {
  return (
    <div className="pagination">
      <ul className="pagination__holder">
        <li className="pagination__item pagination__item--disabled">
          <button type="button" className="pagination__btn">
            <svg
              width="9"
              height="14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.21 7.531a.736.736 0 0 1 0-1.031L6.274.406c.313-.281.782-.281 1.063 0l.719.719c.28.281.28.75 0 1.063L3.242 7l4.813 4.844c.28.312.28.781 0 1.062l-.72.719c-.28.281-.75.281-1.062 0L.211 7.531Z"
                fill="#363535"
              />
            </svg>
          </button>
        </li>
        <li className="pagination__item">
          <button
            type="button"
            className="pagination__btn pagination__btn--active"
          >
            1
          </button>
        </li>
        <li className="pagination__item">
          <button type="button" className="pagination__btn">
            2
          </button>
        </li>
        <li className="pagination__item">
          <button type="button" className="pagination__btn">
            3
          </button>
        </li>
        <li className="pagination__item">
          <button type="button" className="pagination__btn">
            ...
          </button>
        </li>
        <li className="pagination__item">
          <button type="button" className="pagination__btn">
            12
          </button>
        </li>
        <li className="pagination__item">
          <button type="button" className="pagination__btn">
            13
          </button>
        </li>
        <li className="pagination__item">
          <button type="button" className="pagination__btn">
            <svg
              width="10"
              height="14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.023 7.531a.736.736 0 0 0 0-1.031L2.961.406c-.313-.281-.781-.281-1.063 0l-.718.719c-.282.281-.282.75 0 1.063L5.992 7 1.18 11.844c-.282.312-.282.781 0 1.062l.718.719c.282.281.75.281 1.063 0l6.062-6.094Z"
                fill="#363535"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
