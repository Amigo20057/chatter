import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  addViewToPost,
  createComment,
  getPost,
} from "~/store/slices/posts.slice";
import type { AppDispatch, RootState } from "~/store/store";
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ArrowLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import LoaderScreen from "~/components/ui/loader-screen";
import { useDebounce } from "~/hooks/useDebounce";

export default function PostPage() {
  const { userTag, postId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const post = useSelector((state: RootState) => state.posts.post);
  const postStatus = useSelector((state: RootState) => state.posts.postStatus);
  const hasViewed = useRef(false);
  const [firstName = "", lastName = ""] =
    post?.author.fullName?.split(" ") ?? [];
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const content = useDebounce<string>(commentText, 500);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setIsLiked(post.isLiked);
    }
  }, [post]);

  useEffect(() => {
    if (userTag && postId) {
      dispatch(getPost({ userTag, postId }));
    }
  }, [dispatch, userTag, postId]);

  useEffect(() => {
    if (!hasViewed.current && postId) {
      dispatch(addViewToPost(postId));
      hasViewed.current = true;
    }
  }, [dispatch, postId]);

  if (postStatus === "loading") {
    return (
      <div className="p-4">
        <LoaderScreen />
      </div>
    );
  }

  if (!post) {
    return <div className="p-4">Post not found</div>;
  }

  const goToBack = () => {
    navigate(-1);
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    try {
      setIsSubmitting(true);

      if (!postId) return;

      dispatch(createComment({ postId, content }));

      setCommentText("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-l border-r border-[#2f3336] min-h-screen w-[600px]">
      <div className="flex items-center p-4 border-b border-[#2f3336]">
        <ArrowLeftIcon
          width={24}
          className="mr-6 cursor-pointer"
          onClick={goToBack}
        />
        <h1 className="text-xl font-semibold">Post</h1>
      </div>

      <div className="p-4 border-b border-[#2f3336]">
        <div className="flex">
          {/* <img
            src={post.author.avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full mr-3 object-cover"
          /> */}

          <UserCircleIcon className="w-12 h-12 mr-3 object-cover" />

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold hover:underline cursor-pointer">
                {firstName} {lastName}
              </span>
              <span className="text-gray-500">@{post.author.userTag}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-3 text-[15px] whitespace-pre-wrap break-words break-all">
              {post.content}
            </div>

            <div className="flex justify-center w-full">
              {post.img && (
                <img
                  src={`${import.meta.env.VITE_API_URL}` + post.img}
                  alt="post image"
                  className="mt-3 rounded-xl max-h-[500px] object-cover"
                />
              )}
            </div>

            <div className="mt-4 text-gray-500 text-sm">
              {post._count.postView} Views
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around p-3 border-b border-[#2f3336] text-gray-500">
        <button className="flex items-center space-x-2 hover:text-blue-500 transition">
          <ChatBubbleOvalLeftIcon className="w-5" />
          <span>{post._count.comments}</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-pink-500 transition">
          {isLiked ? (
            <HeartSolidIcon className="w-5 text-pink-500" />
          ) : (
            <HeartIcon className="w-5" />
          )}
          <span>{post._count.likes}</span>
        </button>
      </div>

      <div className="flex p-4 border-b border-[#2f3336]">
        {/* <img
          src={"/avatar-placeholder.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-3 object-cover"
        /> */}

        <UserCircleIcon className="w-10 h-10 rounded-full mr-3 object-cover" />

        <div className="flex-1">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Post your reply"
            rows={3}
            className="w-full bg-transparent resize-none outline-none text-[15px] placeholder:text-gray-500"
          />

          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-500">
              {commentText.length > 0 && `${commentText.length} characters`}
            </span>

            <button
              onClick={handleSubmitComment}
              disabled={!commentText.trim() || isSubmitting}
              className={`
          px-4 py-1.5 rounded-full font-semibold text-sm
          transition
          ${
            commentText.trim() && !isSubmitting
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-blue-500/40 text-white/60 cursor-not-allowed"
          }
        `}
            >
              {isSubmitting ? "Replying..." : "Reply"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex mb-4 border-b border-[#2f3336] pb-3"
            >
              {/* <img
                src={"/avatar-placeholder.png"}
                className="w-10 h-10 rounded-full mr-3"
              /> */}

              <UserCircleIcon className="w-10 h-10 rounded-full mr-3 object-cover" />

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">
                    {comment.author.fullName}
                  </span>
                  <span className="text-gray-500 text-sm">
                    @{comment.author.userTag}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm">No comments yet</div>
        )}
      </div>
    </div>
  );
}
