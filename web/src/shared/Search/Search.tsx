import React from 'react';
import { SearchIcon } from '../Icons';

type IProps = {
  value: string;
  handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<IProps> = ({ value, handleValueChange }) => {
  return (
    <div className="intro__right">
      <input
        type="text"
        placeholder="Pretrazi"
        className="search"
        value={value}
        onChange={handleValueChange}
      />
      <button type="submit" className="search-btn">
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;
