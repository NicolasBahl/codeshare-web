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
import apiService from "@/utils/ApiService";
import { useAuth } from "@/contexts/AuthProvider";
import React from "react";
import cn from "@/utils/cn";
import { useRouter } from "next/navigation";

interface PostProps {
  post: Post;
  compact?: boolean;
}

const Post = ({ post, compact = false }: PostProps) => {
  const { authToken } = useAuth();
  const [currentVote, setCurrentVote] = React.useState<number>(
    post.user_current_vote || 0
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
      <div className="flex h-1/2 rounded-xl bg-neutral-50 p-2">
        <div className="ml-5 mt-5 text-blue-800">
          <ButtonWithIcon
            onClick={handleUpVote}
            icon={FiArrowUp}
            iconStyle={cn("text-3xl", currentVote === 1 && "text-red-500")}
          />
          <VotesContainer votes={score} />
          <ButtonWithIcon
            onClick={handleDownVote}
            icon={FiArrowDown}
            iconStyle={cn("text-3xl", currentVote === -1 && "text-red-500")}
          />
        </div>
        <div className="relative ml-10 mt-5 flex flex-col items-start">
          <div className="ml-2">
            {compact ? (
              <Link href={`/questions/${post.id}`}>
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
