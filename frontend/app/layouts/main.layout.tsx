import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import Infobar from "~/components/infobar";
import Sidebar from "~/components/sidebar";
import CreatePostModal from "~/components/ui/create-post.modal";
import LoaderScreen from "~/components/ui/loader-screen";
import { getPosts } from "~/store/slices/posts.slice";
import { profile } from "~/store/slices/user.slice";
import type { AppDispatch, RootState } from "~/store/store";
import type { IMainContext } from "~/types/global";

export default function MainLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.data);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  const posts = useSelector((state: RootState) => state.posts.posts);
  const postListStatus = useSelector(
    (state: RootState) => state.posts.listStatus,
  );

  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(profile());
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    if (postListStatus === "idle") {
      dispatch(getPosts());
    }
  }, [dispatch, postListStatus]);

  useEffect(() => {
    if (userStatus === "failed" && !isAuth) {
      navigate("/auth/login");
    }
  }, [userStatus, isAuth, navigate]);

  if (userStatus === "loading" || postListStatus === "loading") {
    return <LoaderScreen />;
  }

  const context: IMainContext = {
    user: userStatus === "succeeded" ? user : undefined,
    posts: postListStatus === "succeeded" ? posts : undefined,
  };

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
