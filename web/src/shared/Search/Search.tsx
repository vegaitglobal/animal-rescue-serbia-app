import { SearchIcon } from '../Icons';

const Search = () => {
  return (
    <div className="intro__right">
      <input type="text" placeholder="Pretrazi" className="search" />
      <button type="submit" className="search-btn">
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;
