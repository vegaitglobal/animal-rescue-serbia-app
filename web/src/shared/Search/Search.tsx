import React from 'react';

const Search = () => {
  return (
    <div className="intro__right">
      <input type="text" placeholder="Pretrazi" className="search" />
      <button type="submit" className="search-btn">
        <svg
          width="16"
          height="17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m15.781 13.844-3.125-3.125c-.156-.125-.344-.219-.531-.219h-.5A6.516 6.516 0 0 0 13 6.5C13 2.937 10.062 0 6.5 0 2.906 0 0 2.938 0 6.5 0 10.094 2.906 13 6.5 13c1.5 0 2.875-.5 4-1.375v.531c0 .188.063.375.219.531l3.094 3.094c.312.313.78.313 1.062 0l.875-.875c.313-.281.313-.75.031-1.062ZM6.5 10.5c-2.219 0-4-1.781-4-4 0-2.188 1.781-4 4-4 2.188 0 4 1.813 4 4 0 2.219-1.813 4-4 4Z"
            fill="#C8C8C8"
          />
        </svg>
      </button>
    </div>
  );
};

export default Search;
