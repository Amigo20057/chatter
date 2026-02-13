import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toggleLike } from "~/store/slices/posts.slice";
import type { AppDispatch } from "~/store/store";
import type { IPost } from "~/types/post";
import { timeAgo } from "~/utils/time-ago";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

export default function Card({ post }: { post: IPost }) {
  const [isLiked, setIsLiked] = useState(post?.isLiked);
  const [likesCount, setLikesCount] = useState(post?._count.likes);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLikePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);

    await dispatch(toggleLike(post.id));
  };

  const goToPost = () => {
    navigate(`/post/${post.author.userTag}/${post.id}`);
  };

  return (
    <div
      className="w-full border-b border-[#2f3336] p-4 hover:bg-[#1a1a1a] transition-colors"
      onClick={goToPost}
    >
      <div className="flex gap-3  cursor-pointer">
        <div className="w-12 h-12 bg-white rounded-full flex-shrink-0"></div>

        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-white">
              {post.author.fullName}
            </span>
            <span className="text-[#68696c]">@{post.author.userTag}</span>
            <span className="text-[#68696c]">
              · {timeAgo(new Date(post.createdAt))}
            </span>
          </div>

          <div className="mt-1 text-white text-base">{post.content}</div>

          {post.img && (
            <img
              src={post.img}
              alt="post image"
              className="mt-3 rounded-xl max-h-[500px] object-cover"
            />
          )}

          <div className="flex justify-between mt-3 max-w-[450px] text-[#68696c]">
            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
              <ChatBubbleOvalLeftIcon className="w-5 h-5" />
              {post?._count.comments || 0}
            </button>

            <button
              onClick={handleLikePost}
              className={`flex items-center gap-2 transition-colors ${
                isLiked ? "text-red-500" : "text-[#68696c] hover:text-red-500"
              }`}
            >
              {isLiked ? (
                <HeartSolidIcon className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              {likesCount}
            </button>

            <div className="flex items-center gap-2">
              <EyeIcon className="w-5 h-5" />
              {post?._count.postView || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
