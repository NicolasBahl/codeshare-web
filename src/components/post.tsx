"use client";

import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import "@/styles/post.css";
import ButtonWithIcon from "./Buttons/buttonWithIcon";
import DividerPost from "./Dividers/dividerPost";
import CodePreview from "@/components/codePreview";
import { Post } from "@/types/post";
import Link from "next/link";
import apiService from "@/utils/ApiService";
import { useAuth } from "@/contexts/AuthProvider";
import React from "react";
import cn from "@/utils/cn";
import { useRouter } from "next/navigation";
import { BiMessage } from "react-icons/bi";
import LetterPicture from "@/components/LetterPicture";
import Comments from "./comments";

interface PostProps {
  post: Post;
  compact?: boolean;
}

const Post = ({ post, compact = false }: PostProps) => {
  const { authToken } = useAuth();
  const [currentVote, setCurrentVote] = React.useState<number>(
    post.user_current_vote || 0,
  );
  const router = useRouter();

  // Update the current vote and score when the post refresh
  React.useEffect(() => {
    setCurrentVote(post.user_current_vote || 0);
    setScore(post.score);
  }, [post]);

  const [score, setScore] = React.useState<number>(post.score);
  const onAuthorProfile = () => {
    router.push(`/profile/${post.user.username}`);
  };

  const handleUpVote = async () => {
    if (!authToken) return;
    if (currentVote == 1) {
      const res = await apiService.votePost(post.id, 0, authToken);
      setCurrentVote(0);
      setScore(res.data.score);
    } else {
      const res = await apiService.votePost(post.id, 1, authToken);
      setCurrentVote(1);
      setScore(res.data.score);
    }
  };

  const handleDownVote = async () => {
    if (!authToken) return;
    if (currentVote == -1) {
      const res = await apiService.votePost(post.id, 0, authToken);
      setCurrentVote(0);
      setScore(res.data.score);
    } else {
      const res = await apiService.votePost(post.id, -1, authToken);
      setCurrentVote(-1);
      setScore(res.data.score);
    }
  };

  return (
    <>
      <div className="flex h-1/2 rounded-xl bg-white p-2 py-5 shadow-[0px_10px_15px_5px_#f5f5f5]">
        <div className="ml-5 mt-5 flex flex-col items-center text-zinc-400">
          <ButtonWithIcon
            onClick={handleUpVote}
            icon={FiArrowUp}
            iconStyle={cn("text-3xl", currentVote === 1 && "text-primary")}
          />
          <VotesContainer
            votes={score}
            classColor={
              currentVote === 1
                ? "text-primary"
                : currentVote === -1
                ? "text-red-500"
                : ""
            }
          />
          <ButtonWithIcon
            onClick={handleDownVote}
            icon={FiArrowDown}
            iconStyle={cn("text-3xl", currentVote === -1 && "text-red-500")}
          />
        </div>
        <div className="relative ml-10 mt-5 flex flex-col items-start w-full">
          <div className="ml-2 w-full">
            {compact ? (
              <Link href={`/questions/${post.id}`}>
                <h1 className="text-black-500 text-lg font-bold">
                  {post.title}
                </h1>
              </Link>
            ) : (
              <div className="flex items-center gap-5">
                <h1 className="text-black-500 text-lg font-bold">
                  {post.title}
                </h1>
                <StackTag stack={post.stack.name} />
              </div>
            )}
            <div className="max-w-[95%]">
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
              {compact && (
                <>
                  <DividerPost />
                  <Footer
                    author={post.user.username}
                    onAuthorProfile={onAuthorProfile}
                    commentNumber={post._count?.comments || 0}
                  />
                </>
              )}
              {/* && post?.comments.length > 0 */}
              {!compact && (
                <div className="w-full">
                  <DividerPost />
                  <Comments postId={post.id} postAuthorId={post.user_id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Footer = (props: {
  author: string;
  onAuthorProfile: () => void;
  commentNumber: number;
}) => {
  const { author, onAuthorProfile } = props;
  return (
    <div className="py-4 flex justify-between">
      <div className="flex items-center gap-1">
        <LetterPicture
          username={author}
          height={100}
          width={100}
          fontSize={32}
          style={{
            height: "24px",
            width: "24px",
          }}
        />
        <p className="pr-2 text-sm text-gray-500">
          <span className="px-1">Posted by</span>
          <span
            className="cursor-pointer text-primary"
            onClick={onAuthorProfile}
          >
            {author}
          </span>
        </p>
        {/* <p className="text-gray-500 text-sm">{createdAt.toDateString()}</p> */}
      </div>
      <ButtonWithIcon
        onClick={() => {
          console.log("commentaires cliqué");
        }}
        icon={BiMessage}
        buttonStyle={
          "text-gray-500 text-sm flex gap-1 justify-center items-center"
        }
        buttonContent={props.commentNumber.toString()}
        iconStyle={"text-base"}
      />
    </div>
  );
};

const StackTag = ({ stack }: { stack: string }) => {
  return (
    <span className="bg-primary text-white text-xs px-4 py-1 rounded-sm font-bold">
      {stack}
    </span>
  );
};

const VotesContainer = (props: {
  votes: number;
  classColor: HTMLSpanElement["className"];
}) => {
  const { votes, classColor } = props;
  return <span className={`text-center ${classColor}`}>{votes}</span>;
};

export default Post;
