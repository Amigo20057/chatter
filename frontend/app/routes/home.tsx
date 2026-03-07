import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "~/components/card";
import { getPosts } from "~/store/slices/posts.slice";
import type { AppDispatch, RootState } from "~/store/store";
import type { IPost } from "~/types/post";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const nextCursor = useSelector((state: RootState) => state.posts.nextCursor);
  const hasMore = useSelector((state: RootState) => state.posts.hasMore);
  const isFetchingMore = useSelector(
    (state: RootState) => state.posts.isFetchingMore,
  );
  const listStatus = useSelector((state: RootState) => state.posts.listStatus);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listStatus === "idle") {
      dispatch(getPosts());
    }
  }, [dispatch, listStatus]);

  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
          dispatch(getPosts({ cursor: nextCursor! }));
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(currentLoader);

    return () => {
      observer.unobserve(currentLoader);
    };
  }, [dispatch, hasMore, isFetchingMore, nextCursor]);

  if (listStatus === "loading" || listStatus === "idle") {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (listStatus === "succeeded" && !posts.length) {
    return <div className="p-6 text-center">No posts yet</div>;
  }

  return (
    <div className="w-150 border-r border-l border-[#2f3336] min-h-screen">
      {posts.map((post) => (
        <Card post={post as IPost} key={post.id} />
      ))}

      {hasMore && (
        <div ref={loaderRef} className="p-6 text-center text-gray-400">
          {isFetchingMore ? "Loading more..." : "Scroll to load more"}
        </div>
      )}
    </div>
  );
}
