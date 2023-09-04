"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import ApiService from "@/utils/ApiService";
import Link from "next/link";
import { LuLoader2 } from "react-icons/lu";

interface SearchBarProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchBarStyle?: string;
}

const fetchSearch = async (query: string) => {
  const res = await ApiService.getResult(query);

  if (res.status !== 200) return;

  return res.data;
};

export const SearchBar = (props: SearchBarProps) => {
  const [value, setValue] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const debouncedValue = useDebounce<string>(value, 500);
  const { onChange, searchBarStyle } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedValue) return;

      // Triggers when "debouncedValue" changes
      const result = await fetchSearch(debouncedValue);

      // Update the state with the API result
      setUsers(result?.users || []);
      setPosts(result?.posts || []);
      setOpen(true);
      setIsTyping(false);
    };

    fetchData();
  }, [debouncedValue]);

  useEffect(() => {
    if (!value) {
      setOpen(false);
      setUsers([]);
      setPosts([]);
    } else {
      setIsTyping(true);
    }
  }, [value]);

  const handleOnFocus = () => {
    setOpen(true);
  };

  const handleOnBlur = () => {
    // timeout to prevent the search result from disappearing when clicking on the result
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <div className={searchBarStyle}>
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
        {/* add loading icon in right inside input */}
        {isTyping && (
          <div className="absolute right-3 top-3 items-center">
            <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
          </div>
        )}
        <input
          type="text"
          className="block w-full rounded-lg bg-gray-100 p-2 pl-10 text-gray-900"
          placeholder="Search for anything..."
          onChange={handleChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          value={value}
        />
      </div>
      {open && (
        <div className="absolute z-10 max-h-64 w-1/3 overflow-y-auto rounded-md bg-gray-100 text-black shadow-md">
          {users.length > 0 && (
            <div>
              <h2 className="px-4 py-2 font-semibold">Users:</h2>
              {users.map((user: any) => (
                <Link key={user.id} href={`/profile/${user.username}`}>
                  <p className="block border-b border-gray-300 px-4 py-2 hover:bg-gray-200">
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
                <Link key={post.id} href={`/questions/${post.id}`}>
                  <div className="border-b border-gray-300 px-4 py-2 hover:bg-gray-200">
                    <p>{post.title}</p>
                    <p className="text-sm text-gray-500">{post.content}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
