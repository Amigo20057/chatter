import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import Infobar from "~/components/infobar";
import Sidebar from "~/components/sidebar";
import CreatePostModal from "~/components/ui/create-post.modal";
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
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

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

  console.log("Context:", context);

  return (
    <div className="w-full min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-[1280px] flex">
        <Sidebar setIsOpenModal={setIsOpenModal} />

        <main className="flex-1 min-h-screen">
          <Outlet context={context} />
        </main>
        <Infobar />
      </div>

      {isOpenModal && <CreatePostModal setIsOpenModal={setIsOpenModal} />}
    </div>
  );
}
