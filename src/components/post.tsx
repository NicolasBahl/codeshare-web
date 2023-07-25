"use client";

import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import "@/styles/post.css";
import ButtonWithIcon from "./Buttons/buttonWithIcon";
import VotesContainer from "./votesContainer";
import DividerPost from "./Dividers/dividerPost";
import Footer from "./Post/footer";
import CodePreview from "@/components/codePreview";

interface Post {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  code?: string;
}

const Post = ({ title, content, author, code }: Post) => {
  const onAuthorProfile = () => {
    throw new Error("Function not implemented.");
  };

  const handleUpVote = () => {
    throw new Error("Function not implemented.");
  };

  const handleDownVote = () => {
    throw new Error("Function not implemented.");
  };

  return (
    <>
      <div className="flex h-1/2 rounded-xl bg-neutral-50 p-2">
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
        <div className="relative ml-10 mt-5 flex flex-col items-start">
          <div className="ml-2">
            <h1 className="text-black-500 text-lg font-bold">{title}</h1>
            <div className="mt-2 overflow-y-auto text-sm text-neutral-500">
              <p>{content}</p>
              {code && (
                <div className="my-5">
                  <CodePreview language="javascript" code={code} />
                </div>
              )}
            </div>
            <DividerPost />
            <Footer author={author} onAuthorProfile={onAuthorProfile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
