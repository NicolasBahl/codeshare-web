'use client'

import { FiArrowUp } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';
import '@/styles/post.css';
import Link from 'next/link';
import React, { useState } from 'react';


export default function Top() {

  const topUsers = [
    { path:"/", icon: RxAvatar, text: 'Rajan N', likeCount: 15500 },
    { path:"/", icon: RxAvatar, text: 'Siris M', likeCount: 12800 },
    { path:"/", icon: RxAvatar, text: 'Aakash D', likeCount: 2500 },
    { path:"/", icon: RxAvatar, text: 'Nischal K', likeCount: 2200 },
    { path:"/", icon: RxAvatar, text: 'Kishor K', likeCount: 1200 },
  ];

  const [votes] = useState(15);

  const [you] = useState({
    path: "/",
    icon: RxAvatar,
    text: 'You',
    likeCount: votes
  });

  const formatVotes = (votes: number) => {
    const absoluteVotes = Math.abs(votes);

    if (absoluteVotes >= 1000) {
      const formattedVotes = (absoluteVotes / 1000).toFixed(1);
      return `${formattedVotes}k`;
    }
    return votes.toString();
  };

  return (
    <div className="">
      <div className=" bg-neutral-50 flex flex-col shadow-xl mr-24 mt-36 ">
        <div className="flex flex-col items-start relative bg-neutral-50">
          <div className="flex-col flex w-full">
            <h1 className="p-4 font-bold text-gray-500">Top Users</h1>
            {topUsers.map((item, index) => (
              <div  key={index} className="flex p-2 items-center gap-12 justify-between">
                <div className="flex items-center">
                <item.icon className="text-gray-500" style={{ fontSize: '25px' }} />
                  <a href={item.path} className="p-4 text-blue-800">{item.text}</a>
                </div>
                <div className="flex items-center">
                  <span className='mr-2 text-gray-500'>{formatVotes(item.likeCount)}</span>
                  <FiArrowUp className="text-blue-800" style={{ fontSize: '30px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-500 h-px mt-4 mx-10 my-2"></div>
        <div className="flex p-2 items-center gap-12 justify-between">
          <div className="flex items-center">
            <RxAvatar className="text-gray-500" style={{ fontSize: '25px' }} />
            <Link href={you.path} className="p-4 text-blue-800">{you.text}</Link>
          </div>
          <div className="flex items-center">
            <span className='mr-2 text-gray-500'>{formatVotes(votes)}</span>
            <FiArrowUp className="text-blue-800" style={{ fontSize: '30px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}