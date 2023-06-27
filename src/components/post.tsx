"use client";

import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { BiMessage } from "react-icons/bi";
import "../css/post.css";
import ButtonWithIcon from "./Buttons/buttonWithIcon";
import VotesContainer from "./votesContainer";
import DividerPost from "./Dividers/dividerPost";
import Footer from "./Post/footer";

interface Post {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  onAuthorProfile: () => void;
  handleUpVote: () => void;
  handleDownVote: () => void;
}

const Post = (props: Post) => {
  const {
    title,
    content,
    author,
    createdAt,
    onAuthorProfile,
    handleDownVote,
    handleUpVote,
  } = props;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 bg-neutral-50 rounded-xl flex p-2">
        <div className="ml-5 mt-5 text-blue-800">
          <ButtonWithIcon
            onClick={handleUpVote}
            icon={FiArrowUp}
            iconStyle={"text-3xl"}
          />
          <VotesContainer votes={100} />
          <ButtonWithIcon
            onClick={handleDownVote}
            icon={FiArrowDown}
            iconStyle={"text-3xl"}
          />
        </div>
        <div className="flex flex-col items-start ml-10 mt-5 relative">
          <div className="ml-2">
            <h1 className="font-bold text-lg text-black-500">{title}</h1>
            <div className="text-neutral-500 text-sm mt-2 max-h-40 overflow-y-auto">
              <p>{content}</p>
            </div>
            <DividerPost />
            <Footer
              author={author}
              createdAt={createdAt}
              onAuthorProfile={onAuthorProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
