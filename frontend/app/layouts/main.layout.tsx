import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { getPosts } from "~/store/slices/posts.slice";
import { profile } from "~/store/slices/user.slice";
import type { AppDispatch, RootState } from "~/store/store";
import type { IMainContext } from "~/types/global";

export default function MainLayout() {
  const appDispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.data);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const posts = useSelector((state: RootState) => state.posts.data);
  const postStatus = useSelector((state: RootState) => state.posts.status);

  useEffect(() => {
    if (userStatus === "idle") {
      appDispatch(profile());
    }
  }, [appDispatch, userStatus]);

  useEffect(() => {
    if (postStatus === "idle") {
      appDispatch(getPosts());
    }
  }, [appDispatch, postStatus]);

  if (userStatus === "loading" || postStatus === "loading") {
    return <div>Loading...</div>;
  }

  const context: IMainContext = {
    user: userStatus === "succeeded" ? user : undefined,
    posts: postStatus === "succeeded" ? posts : undefined,
  };

  console.log(context);

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white">
      <Outlet context={context} />
    </div>
  );
}
