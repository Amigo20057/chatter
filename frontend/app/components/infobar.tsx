export default function Infobar() {
  return (
    <aside className="w-[350px] py-3 hidden lg:block">
      <div className="sticky top-0 bg-black z-10 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="
              w-full px-4 py-3 pl-12 rounded-full
              bg-dark border border-[#2f3336] text-white text-[15px]
              placeholder-[#71767b]
              focus:outline-none focus:ring-1 focus:ring-[#1d9bf0]
            "
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71767b]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <section className="mt-4 bg-dark rounded-2xl overflow-hidden p-4 border border-[#2f3336]">
        <h2 className="text-xl font-bold mb-2 text-white">
          Subscribe to Premium
        </h2>
        <p className="text-[#e7e9ea] text-[15px] mb-3 leading-5">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <button className="bg-[#1d9bf0] text-white px-4 py-2 rounded-full text-[15px] font-bold hover:bg-[#1a8cd8] transition-colors">
          Subscribe
        </button>
      </section>

      {/* Today's News */}
      <section className="mt-4 bg-dark rounded-2xl overflow-hidden border border-[#2f3336]">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-xl font-bold text-white">Today's News</h2>
          <button className="text-[#71767b] hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1d1f23] transition-colors">
            <svg
              className="w-[18px] h-[18px]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.36 5.64a1 1 0 0 0-1.41 0L12 10.59 7.05 5.64a1 1 0 1 0-1.41 1.41L10.59 12l-4.95 4.95a1 1 0 0 0 1.41 1.41L12 13.41l4.95 4.95a1 1 0 0 0 1.41-1.41L13.41 12l4.95-4.95a1 1 0 0 0 0-1.41z" />
            </svg>
          </button>
        </div>

        {[
          {
            title: "Saturday Fills Feeds with Feline Charm and Joy",
            category: "Other",
            posts: "73.5K posts",
          },
          {
            title: "Gas Explosions Kill Five in Iran Amid Strike Rumors",
            category: "News",
            posts: "105.8K posts",
          },
          {
            title:
              "Moltbook AI Network Explodes with 1.5 Million Agents Forming Communities and ...",
            category: "News",
            posts: "163K posts",
          },
        ].map((news, i) => (
          <div
            key={i}
            className="px-4 py-3 hover:bg-dark cursor-pointer transition-colors border-t border-[#2f3336]"
          >
            <h3 className="font-bold text-[15px] text-white mb-1 leading-5">
              {news.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-1">
                <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-[#16181c]" />
                <div className="w-5 h-5 rounded-full bg-pink-500 border-2 border-[#16181c]" />
                <div className="w-5 h-5 rounded-full bg-purple-500 border-2 border-[#16181c]" />
              </div>
              <p className="text-[13px] text-[#71767b]">
                2 days ago · {news.category} · {news.posts}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* What's happening */}
      <section className="mt-4 bg-dark rounded-2xl overflow-hidden border border-[#2f3336]">
        <h2 className="px-4 py-3 text-xl font-bold text-white">
          What's happening
        </h2>

        {[
          { label: "Trending in Ukraine", title: "Central Banks Common" },
          { label: "Trending in Ukraine", title: "Гарно" },
          { label: "Trending in Ukraine", title: "Дякую" },
          { label: "Trending in Ukraine", title: "Quacks" },
        ].map((trend, i) => (
          <div
            key={i}
            className="flex items-start justify-between px-4 py-3 hover:bg-[#1d1f23] cursor-pointer transition-colors"
          >
            <div className="flex-1">
              <p className="text-[13px] text-[#71767b] mb-0.5">{trend.label}</p>
              <p className="font-bold text-[15px] text-white">{trend.title}</p>
            </div>
            <button className="text-[#71767b] hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2f3336] flex-shrink-0 transition-colors">
              <svg
                className="w-[18px] h-[18px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
        ))}

        <div className="px-4 py-3 text-[#1d9bf0] hover:bg-[#1d1f23] cursor-pointer text-[15px] transition-colors">
          Show more
        </div>
      </section>
    </aside>
  );
}
