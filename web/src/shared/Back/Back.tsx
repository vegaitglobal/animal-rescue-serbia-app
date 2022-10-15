import { useNavigate } from 'react-router-dom';
import { BackProps } from './Back.data';

const Back = ({ text }: BackProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="intro__back-btn"
      onClick={() => navigate(-1)}
    >
      <svg
        width="11"
        height="20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m9.926 19.117.86-.816c.171-.215.171-.559 0-.73L3.007 9.75l7.777-7.777c.172-.172.172-.516 0-.73l-.86-.817a.495.495 0 0 0-.73 0L.172 9.406a.582.582 0 0 0 0 .73l9.023 8.981a.495.495 0 0 0 .73 0Z"
          fill="#000"
        />
      </svg>
      {text}
    </button>
  );
};

export default Back;
