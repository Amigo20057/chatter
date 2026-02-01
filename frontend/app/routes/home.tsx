import { useOutletContext } from "react-router";
import type { Route } from "./+types/home";
import type { IMainContext } from "~/types/global";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chatter" },
    { name: "description", content: "Welcome to chatter!" },
  ];
}

export default function Home() {
  const { posts } = useOutletContext<IMainContext>();
  console.log(posts);
  return <div></div>;
}
