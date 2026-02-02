import type { Route } from "./+types/home";
import { useState } from "react";
import { posts } from "~/constants/mock-posts";
import Card from "~/components/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chatter" },
    { name: "description", content: "Welcome to chatter!" },
  ];
}

export default function Home() {
  //add action function set filter posts - for you or following
  // const { posts: serverPosts } = useOutletContext<IMainContext>();

  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");

  const tabClass = (tab: "forYou" | "following") =>
    `w-1/2 flex justify-center items-center cursor-pointer
     hover:bg-[#181d20] transition-colors
     ${activeTab === tab ? "text-white border-b-2 border-blue-500" : "text-[#71767b]"}`;

  return (
    <div className="w-150 border-l border-r border-[#2f3336] min-h-screen">
      <div className="w-full h-[50px] flex border-b border-[#2f3336] sticky top-0 backdrop-blur-md bg-black/50 z-10">
        <div
          className={tabClass("forYou")}
          onClick={() => setActiveTab("forYou")}
        >
          For you
        </div>

        <div
          className={tabClass("following")}
          onClick={() => setActiveTab("following")}
        >
          Following
        </div>
      </div>
      {posts.map((post) => (
        <Card post={post} key={post.id} />
      ))}
    </div>
  );
}
