import { Search } from "./ui/search";
import { Trending } from "./ui/trending";
import { WhoToFollow } from "./ui/who-to-follow";

export default function Infobar() {
  return (
    <aside className="w-[350px] py-3 hidden lg:block">
      <div className="sticky top-0 bg-black z-10 pb-3">
        <Search />
        <Trending />
        <WhoToFollow />
      </div>
    </aside>
  );
}
