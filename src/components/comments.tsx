import React, { useRef, useState } from "react";
import "@/styles/post.css";
import apiService from "@/utils/ApiService";
import { useAuth } from "@/contexts/AuthProvider";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { RxAvatar } from "react-icons/rx";
import LetterPicture from "@/components/LetterPicture";
import ButtonWithIcon from "@/components/Buttons/buttonWithIcon";
import { FiArrowDown, FiArrowUp, FiSend } from "react-icons/fi";
import cn from "@/utils/cn";
import { useRouter } from "next/navigation";
import { FiMoreHorizontal } from "react-icons/fi";
import ConfirmationModal from "./ConfirmationModal";

const Comments = ({
  postId,
  postAuthorId,
}: {
  postId: string;
  postAuthorId: string;
}) => {
  const { data, mutate: refreshData } = useSWR(
    `/posts/${postId}/comments`,
    (url) => fetcher(url),
  );
  const { authToken, isAuthenticated } = useAuth();

  return (
    <div className="w-full mt-9">
      {isAuthenticated && (
        <CommentInput
          authToken={authToken as string}
          postId={postId}
          refreshData={refreshData}
        />
      )}
      <ul>
        {data?.comments?.map((comment: Comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
            postAuthorId={postAuthorId}
            refreshData={refreshData}
            isRoot={true}
          />
        ))}
      </ul>
    </div>
  );
};

const CommentItem = ({
  comment,
  postAuthorId,
  postId,
  refreshData,
  isRoot,
}: CommentItemProps) => {
  const [currentVote, setCurrentVote] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const router = useRouter();
  const [replyText, setReplyText] = useState<string>("");
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const { authToken, isAuthenticated, user } = useAuth();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const onAuthorProfile = () => {
    router.push(`/profile/${comment?.author?.username}`);
  };

  const submitReply = async () => {
    if (!authToken) return;
    let message = replyText;
    if (!isRoot) {
      message = `@${comment?.author?.username} ${message}`;
    }
    await apiService.replyComment(
      postId,
      message,
      authToken,
      isRoot ? (comment.id as string) : (comment.parentId as string),
    );
    setReplyText("");
    setIsReplying(false);
    refreshData().then(() => {});
  };

  const deleteComment = async () => {
    if (!authToken) return;
    await apiService.deleteComment(postId, comment.id, authToken);
    refreshData?.();
    router.push(`/questions/${postId}`);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      id={"comment-" + comment.id}
      className={cn(
        "px-4 py-4 my-4 bg-[#fcfcfc]",
        comment?.isAI
          ? ["bg-[#F8F9FD]", isRoot && "border-blue-400 border"]
          : "",
      )}
    >
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={toggleConfirmationModal}
        onConfirm={deleteComment}
        isPost={false}
      />
      <li key={comment.id}>
        <div className="flex">
          {comment?.isAI ? (
            <>
              <div className={`rounded-full bg-primary h-8 w-8`}>
                <img
                  src="/images/ai-avatar.png"
                  alt="ai"
                  className="h-8 w-8 rounded-full"
                />
              </div>
            </>
          ) : (
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
          )}
          <div
            className={cn(
              "comment-content text-blue-400  ml-2",
              !comment?.isAI && "cursor-pointer text-primary",
            )}
            onClick={comment?.isAI ? () => {} : onAuthorProfile}
          >
            {comment?.isAI ? "BuddyAI" : comment?.author?.username || "Inconnu"}
          </div>
          {comment?.author?.id === postAuthorId && (
            <RxAvatar size={18} className="ml-1 mt-1" />
          )}
          {comment?.isAI && (
            <div className="ml-2 bg-blue-400 px-2 font-bold rounded flex items-center h-5">
              <span className="text-xs text-white">AI</span>
            </div>
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
          <div className="text-neutral-500 ml-8 w-full">
            <div className="comment-content mt-0">{comment?.content}</div>
            {comment?.isAI ? (
              <div className="mt-2 text-xs text-neutral-500">
                This comment was generated by our AI. It may not be accurate.
              </div>
            ) : (
              <div className="flex items-center mt-5 text-sm">
                {isReplying ? (
                  <>
                    <textarea
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Reply to comment..."
                      rows={2}
                    />
                    <button
                      className="cursor-pointer ml-2"
                      onClick={submitReply}
                    >
                      <FiSend size={18} className="ml-1 mt-1" />
                    </button>
                  </>
                ) : (
                  <div
                    ref={ref}
                    className="flex justify-between items-center space-x-96"
                  >
                    <div className="flex  items-center space-x-96">
                      <button
                        className="cursor-pointer"
                        onClick={() =>
                          isAuthenticated
                            ? setIsReplying(true)
                            : router.push("/login")
                        }
                      >
                        Reply
                      </button>
                      {comment?.author.id === user?.id && (
                        <button
                          className="cursor-pointer"
                          onClick={toggleMoreMenu}
                        >
                          <FiMoreHorizontal size={21} />
                        </button>
                      )}
                    </div>
                    {isMoreMenuOpen && (
                      <div className="absolute right-0 bg-white border rounded shadow-md mr-0 p-5">
                        {/*
                        <button className="block w-full text-left px-5 py-2 hover:bg-gray-100">
                          Edit
                        </button>
                        */}
                        <button
                          className="block w-full text-left px-5 py-2 text-red-500 hover:bg-gray-100"
                          onClick={toggleConfirmationModal}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {comment.childComments?.length > 0 && (
          <div className="pl-3">
            {comment.childComments.map((childComment: any) => (
              <CommentItem
                key={childComment.id}
                comment={childComment}
                postAuthorId={postAuthorId}
                postId={postId}
                refreshData={refreshData}
              />
            ))}
          </div>
        )}
      </li>
    </div>
  );
};

interface CommentItemProps {
  comment: Comment;
  postId: string;
  postAuthorId: string;
  refreshData: () => Promise<void>;
  isRoot?: boolean;
}

const CommentInput = ({
  authToken,
  postId,
  refreshData,
}: {
  authToken: string;
  postId: string;
  refreshData: () => Promise<void>;
}) => {
  const [mainCommentText, setMainCommentText] = useState<string>("");
  const handleMainCommentSubmit = async () => {
    if (!authToken) return;
    const res = await apiService.commentPost(
      postId,
      mainCommentText,
      authToken,
    );
    setMainCommentText("");
    await refreshData();

    const newCommentElement = document.getElementById(`comment-${res.data.id}`);
    if (newCommentElement) {
      newCommentElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex items-center mt-5 text-sm">
      <textarea
        className="block p-2.5 w-full text-sm text-gray-900 bg-grayw-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={mainCommentText}
        onChange={(e) => setMainCommentText(e.target.value)}
        placeholder="Reply to the post..."
        rows={2}
      />
      <button
        className="mt-2 cursor-pointer ml-2 text-neutral-500"
        onClick={handleMainCommentSubmit}
      >
        <FiSend size={18} className="ml-1 mt-1" />
      </button>
    </div>
  );
};

export default Comments;
