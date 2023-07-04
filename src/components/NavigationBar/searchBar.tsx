"use client";

import React from "react";

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchBarStyle?: string;
}

const SearchBar = (props: SearchBarProps) => {
  const { onChange, searchBarStyle } = props;
  return (
    <div className={searchBarStyle}>
      <div className="relative mr-3 ">
        <div className="absolute left-3 top-3 items-center">
          <svg
            className="h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          className="w-50 block rounded-lg border  border-gray-300 bg-gray-50 p-2 pl-10 text-gray-900 "
          placeholder="Search Here..."
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
