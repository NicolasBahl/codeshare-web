"use client";

import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import "@/styles/post.css";
import ButtonWithIcon from "./Buttons/buttonWithIcon";
import VotesContainer from "./votesContainer";
import DividerPost from "./Dividers/dividerPost";
import Footer from "./Post/footer";
import CodePreview from "@/components/codePreview";
import { Post } from "@/types/post";
import Link from "next/link";

interface PostProps {
  post: Post;
  compact?: boolean;
}

const Post = ({ post, compact = false }: PostProps) => {
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
          <VotesContainer votes={post.score} />
          <ButtonWithIcon
            onClick={handleDownVote}
            icon={FiArrowDown}
            iconStyle={"text-3xl"}
          />
        </div>
        <div className="relative ml-10 mt-5 flex flex-col items-start">
          <div className="ml-2">
            {compact ? (
              <Link href={`/questions/${post.id}`}>
                {" "}
                <h1 className="text-black-500 text-lg font-bold">
                  {post.title}
                </h1>
              </Link>
            ) : (
              <h1 className="text-black-500 text-lg font-bold">{post.title}</h1>
            )}
            <div className="mt-2 overflow-y-auto text-sm text-neutral-500">
              <p>{post.content}</p>
              {post.code && !compact && (
                <div className="my-5">
                  <CodePreview
                    language={post.stack.name.toLowerCase() || ""}
                    code={post.code}
                  />
                </div>
              )}
            </div>
            <DividerPost />
            <Footer
              author={post.user.username}
              onAuthorProfile={onAuthorProfile}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
