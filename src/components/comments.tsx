import React, { useState } from "react";
import "@/styles/post.css";
import apiService from "@/utils/ApiService";
import { useAuth } from "@/contexts/AuthProvider";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";
import LetterPicture from "@/components/LetterPicture";
import ButtonWithIcon from "@/components/Buttons/buttonWithIcon";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import cn from "@/utils/cn";
import { useRouter } from "next/navigation";

const Comments = ({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) => {
  const { data } = useSWR(`/posts/${postId}/comments`, (url) => fetcher(url));

  return (
    <div className="w-full mt-9">
      <ul>
        {data?.comments?.map((comment: any) => (
          <CommentItem key={comment.id} comment={comment} authorId={authorId} />
        ))}
      </ul>
    </div>
  );
};

const CommentItem = ({ comment, authorId }: any) => {
  const [currentVote, setCurrentVote] = useState<number>(0); // État du vote actuel
  const initialScore = typeof comment.votes === "number" ? comment.votes : 0; // Score initial du commentaire
  const [score, setScore] = useState<number>(initialScore);
  const router = useRouter();

  const handleUpVote = () => {
    if (currentVote !== 1) {
      setCurrentVote(1);
      setScore(score + 1);
    }
  };

  const handleDownVote = () => {
    if (currentVote !== -1) {
      setCurrentVote(-1);
      setScore(score - 1);
    }
  };

  const handleReply = () => {
    console.log("Répondre au commentaire");
  };

  const handleShare = () => {
    console.log("Partager le commentaire");
  };

  const handleReport = () => {
    console.log("Signaler le commentaire");
  };

  const onAuthorProfile = () => {
    router.push(`/profile/${comment?.author?.username}`);
  };

  return (
    <div className="px-4 py-4 my-4 bg-[#fcfcfc] ">
      <li key={comment.id}>
        <div className="flex ">
          <LetterPicture
            username={comment?.author?.username || "Inconnu"}
            height={100}
            width={100}
            fontSize={32}
            style={{
              height: "24px",
              width: "24px",
            }}
          />
          <button
            className="comment-content text-primary ml-2"
            onClick={onAuthorProfile}
          >
            {comment?.author?.username || "Inconnu"}
          </button>
          {comment?.author?.id === authorId && (
            <RxAvatar size={18} className="ml-1 mt-1" />
          )}
        </div>
        <div className="mt-5 flex">
          <div className="flex flex-col text-zinc-400 w-0">
            <ButtonWithIcon
              onClick={handleUpVote}
              icon={FiArrowUp}
              iconStyle={cn("text-xl", currentVote === 1 && "text-green-500")}
            />
            <div className="text-l ml-1">{score}</div>
            <ButtonWithIcon
              onClick={handleDownVote}
              icon={FiArrowDown}
              iconStyle={cn("text-xl", currentVote === -1 && "text-red-500")}
            />
          </div>
          <div className="text-neutral-500 ml-8">
            <div className="comment-content mt-0">{comment?.content}</div>
            <div className="flex items-center mt-5 text-sm">
              <button className="cursor-pointer " onClick={handleReply}>
                Reply
              </button>
              <button className="cursor-pointer ml-8" onClick={handleShare}>
                Share
              </button>
              <button className="cursor-pointer ml-8" onClick={handleReport}>
                Report
              </button>
            </div>
          </div>
        </div>

        {comment.childComments?.length > 0 && (
          <div className="pl-3">
            {comment.childComments.map((childComment: any) => (
              <CommentItem key={childComment.id} comment={childComment} />
            ))}
          </div>
        )}
      </li>
    </div>
  );
};
export default Comments;
