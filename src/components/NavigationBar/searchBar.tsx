"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import ApiService from '@/utils/ApiService';
import Link from 'next/link';

interface SearchBarProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchBarStyle?: string;
}

const fetchSearch = async (query: string) => {
  const res = await ApiService.getResult(query);
  if (res.status === 404) {

    return;
  }

  if (res.status !== 200) return;

  return res.data;
};

export const SearchBar = (props: SearchBarProps) => {
  const [value, setValue] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const debouncedValue = useDebounce<string>(value, 500);
  const { onChange, searchBarStyle } = props;
  const [apiResult, setApiResult] = useState<any | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Do fetch here...
      // Triggers when "debouncedValue" changes
      const result = await fetchSearch(debouncedValue);

      // Update the state with the API result
      setApiResult(result);
      setUsers(result?.users || []);
      setPosts(result?.posts || []);
    };

    fetchData();
  }, [debouncedValue]);

  const handleMouseLeave = () => {
    setApiResult(null);
  };

  return (
    <div
      className={searchBarStyle}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative mr-3 w-full">
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
          className="block w-full rounded-lg bg-gray-100 p-2 pl-10 text-gray-900"
          placeholder="Search Here..."
          onChange={handleChange}
          value={value}
        />
      </div>
      {apiResult && (
        <div className="bg-gray-100 rounded-md text-black absolute w-1/3 max-h-64 overflow-y-auto shadow-md z-10">
          {users.length > 0 && (
            <div>
              <h2 className="px-4 py-2 font-semibold">Users:</h2>
              {users.map((user: any) => (
                <Link key={user.id} href={`/profile/${user.username}`}>
                  <p className="block px-4 py-2 border-b border-gray-300 hover:bg-gray-200">
                    <p>{user.username}</p>
                  </p>
                </Link>
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <div>
              <h2 className="px-4 py-2 font-semibold">Posts:</h2>
              {posts.map((post: any) => (
                <div key={post.id} className="px-4 py-2 border-b border-gray-300">
                  <p>{post.title}</p>
                  <p>{post.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;