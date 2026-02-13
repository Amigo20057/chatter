import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addViewToPost, getPost } from "~/store/slices/posts.slice";
import type { AppDispatch, RootState } from "~/store/store";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import LoaderScreen from "~/components/ui/loader-screen";

export default function PostPage() {
  const { userTag, postId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const post = useSelector((state: RootState) => state.posts.post);
  const postStatus = useSelector((state: RootState) => state.posts.postStatus);
  const hasViewed = useRef(false);

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

  return (
    <div className="p-4 border-l border-r border-[#2f3336] min-h-screen w-150 ">
      <div className="flex">
        <ArrowLeftIcon
          width={24}
          className="mr-5 cursor-pointer"
          onClick={goToBack}
        />
        <h1 className="text-[24px]">Post</h1>
      </div>
    </div>
  );
}
