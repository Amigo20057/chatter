import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  addViewToPost,
  createComment,
  getPost,
  removeComment,
  removePost,
  toggleLike,
} from "~/store/slices/posts.slice";
import type { AppDispatch, RootState } from "~/store/store";
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ArrowLeftIcon,
  UserCircleIcon,
  TrashIcon,
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
  const user = useSelector((state: RootState) => state.user.data);
  const hasViewed = useRef(false);
  const [firstName = "", lastName = ""] =
    post?.author.fullName?.split(" ") ?? [];
  const [commentText, setCommentText] = useState("");
  const content = useDebounce<string>(commentText, 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isMyPost, setIsMyPost] = useState(false);
  const [isMyComment, setIsMyComment] = useState(false);

  useEffect(() => {
    if (post) {
      setIsLiked(post.isLiked);
      setLikesCount(post._count.likes);
    }
  }, [post]);

  useEffect(() => {
    if (post && user) {
      setIsMyPost(post.author.userTag === user.userTag);
    }
  }, [post, user]);

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

  const handleLikePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);

    await dispatch(toggleLike(post.id));
  };

  const goToBack = () => {
    navigate(-1);
  };

  const goToProfile = () => {
    navigate(`/profile/${post.author.userTag}`);
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    try {
      setIsSubmitting(true);

      if (!postId) return;

      console.log(content);

      dispatch(createComment({ postId, content }));

      setCommentText("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async () => {
    if (!post) return;

    const confirmDelete = confirm("Delete this post?");
    if (!confirmDelete) return;

    try {
      await dispatch(removePost(post.id)).unwrap();
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const confirmDelete = confirm("Delete this comment?");
    if (!confirmDelete) return;

    try {
      await dispatch(removeComment(commentId)).unwrap();
    } catch (err) {
      console.error(err);
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
          <UserCircleIcon className="w-12 h-12 rounded-full mr-3 object-cover text-gray-500 bg-black " />

          <div className="flex-1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <span
                  className="font-semibold hover:underline cursor-pointer"
                  onClick={goToProfile}
                >
                  {firstName} {lastName}
                </span>

                <span className="text-gray-500">@{post.author.userTag}</span>
                <span className="text-gray-500">·</span>

                <span className="text-gray-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              {isMyPost && (
                <TrashIcon
                  onClick={handleDeletePost}
                  className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer transition"
                />
              )}
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
              {post._count.postView} Перглядів
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around p-3 border-b border-[#2f3336] text-gray-500">
        <button className="flex items-center space-x-2 hover:text-blue-500 transition">
          <ChatBubbleOvalLeftIcon className="w-5" />
          <span>{post._count.comments}</span>
        </button>

        <button
          disabled={postStatus !== "succeeded"}
          onClick={handleLikePost}
          className={`flex items-center gap-2 transition-colors ${
            isLiked ? "text-pink-500" : "text-[#68696c] hover:text-pink-500"
          }`}
        >
          {isLiked ? (
            <HeartSolidIcon className="w-5 text-pink-500" />
          ) : (
            <HeartIcon className="w-5" />
          )}
          <span>{likesCount}</span>
        </button>
      </div>

      <div className="flex p-4 border-b border-[#2f3336]">
        <UserCircleIcon className="w-10 h-10 rounded-full mr-3 object-cover text-gray-500 bg-black " />

        <div className="flex-1">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Опублікуйте свою відповідь"
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
              {isSubmitting ? "Опубліковування..." : "Опублікувати"}
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
              <UserCircleIcon className="w-10 h-10 rounded-full mr-3 object-cover text-gray-500 bg-black " />

              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">
                      {comment.author.fullName}
                    </span>

                    <span className="text-gray-500 text-sm">
                      @{comment.author.userTag}
                    </span>
                  </div>

                  {comment.author.userTag === user?.userTag && (
                    <TrashIcon
                      onClick={() => handleDeleteComment(comment.id)}
                      className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer transition"
                    />
                  )}
                </div>

                <p className="text-sm mt-1 break-words">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm">Немає коментарів</div>
        )}
      </div>
    </div>
  );
}
