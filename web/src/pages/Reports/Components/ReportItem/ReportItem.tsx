import React from 'react';

const ReportItem = () => {
  return (
    <li className="panel__item panel__item--declined">
      <div>
        <span className="panel__address">
          <strong>Novi Sad</strong>, Novosadskog Sajma 2
        </span>
        <p className="panel__text">
          Lorem ipsum dolor sit amet consectetur adipiscing elit id, nam laoreet
          suscipit est primis augue parturient nunc convallis, curabitur
          vestibulum nisi turpis velit hendrerit eleifend. Sodales blandit
          rhoncus ullamcorper sociis sociosqu sagittis venenatis potenti, urna
        </p>
        <div className="panel__holder">
          <span className="panel__status panel__status--red">Odbijen</span>
          <button type="button" className="panel__edit">
            <svg
              width="16"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.069 2.914.38 11.602l-.375 3.562a.727.727 0 0 0 .813.813l3.562-.375 8.688-8.688-4-4Zm6.469-.594L13.663.445c-.563-.593-1.532-.593-2.125 0l-1.75 1.75 4 4 1.75-1.75c.593-.593.593-1.562 0-2.125Z"
                fill="#363535"
              />
            </svg>
            Izmeni
          </button>
        </div>
      </div>
    </li>
  );
};

export default ReportItem;
