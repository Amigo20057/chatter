import type { IPost } from "~/types/post";
import { timeAgo } from "~/utils/time-ago";

export default function Card({ post }: { post: IPost }) {
  return (
    <div className="w-full border-b border-[#2f3336] p-4 hover:bg-[#1a1a1a] transition-colors">
      <div className="flex gap-3">
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
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.557 0-3.015-.378-4.235-1.038L3 21l1.038-4.235C3.378 15.015 3 13.557 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {post?._count.comments || 0}
            </button>

            <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318C5.179 5.457 6.21 5 7.292 5c1.082 0 2.113.457 2.974 1.318L12 7.293l1.734-1.975C14.687 5.457 15.718 5 16.8 5c1.082 0 2.113.457 2.974 1.318 1.723 1.723 1.723 4.525 0 6.248l-9.708 9.708a.75.75 0 01-1.06 0L4.318 12.566c-1.723-1.723-1.723-4.525 0-6.248z"
                />
              </svg>
              {post._count.likes || 0}
            </button>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                />
              </svg>
              {post._count.postView || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
