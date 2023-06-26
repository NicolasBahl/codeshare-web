'use client'

import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { BiMessage } from 'react-icons/bi';
import { useState } from 'react';
import '../css/post.css';


export default function Post() {

  const [votes, setVotes] = useState(0);

  const handleUpVote = () => {
    setVotes(votes + 1);
  };

  const handleDownVote = () => {
    setVotes(votes - 1);
  };

  const formatVotes = (votes : number) => {
    const absoluteVotes = Math.abs(votes);

    if (absoluteVotes >= 1000) {
      const formattedVotes = (absoluteVotes / 1000).toFixed(1);
      return `${formattedVotes}k`;
    }

    return votes.toString();
  };

  const handleNameClick = () => {
    console.log('profil du publieur cliqué');
  };

  const commentClick = () => {
    console.log('commentaires cliqué');
  };

  return (
  <div className="flex justify-center items-center h-screen">
    <div className="w-1/2 bg-neutral-50 rounded-xl flex p-2">
      <div className="ml-5 mt-5 text-blue-800">
        <button onClick={handleUpVote}>
          <FiArrowUp style={{ fontSize: '30px' }} />
        </button>
        <span>{votes >= 1 ? `+${formatVotes(votes)}` : votes === 0 ? "\u00A0\u00A0" + formatVotes(votes) : formatVotes(votes)}</span>
        <button onClick={handleDownVote}>
          <FiArrowDown style={{ fontSize: '30px' }} />
        </button>
      </div>
      <div className="flex flex-col items-start ml-10 mt-5 relative">
        <div className="ml-2">
          <h1 className="font-bold text-lg text-black-500">What does the fox say?</h1>
          <div className="text-neutral-500 text-sm mt-2 max-h-40 overflow-y-auto">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="mt-4 mx-10 my-2 bg-neutral-500 h-px"></div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center space-x-10">
              <p className="text-gray-500 text-sm pr-2">
                    Posted by <button className="text-blue-800" onClick={handleNameClick}>Mahamat</button>
              </p>
              <p className="text-gray-500 text-sm">
                12hr ago
              </p>
            </div>
            <button className="text-gray-500 text-sm mr-2 flex" onClick={commentClick}><BiMessage className="mr-1 mt-0.5" style={{ fontSize: '15px' }}/>50+ </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

