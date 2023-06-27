"use client";

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchBarStyle?: string;
}

const SearchBar = (props: SearchBarProps) => {
  const { onChange, searchBarStyle } = props;
  return (
    <div className={searchBarStyle}>
      <div className="relative mr-3 ">
        <div className="absolute top-3 left-3 items-center">
          <svg
            className="w-5 h-5 text-gray-500"
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
          className="block p-2 pl-10 w-50  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3 "
          placeholder="Search Here..."
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
