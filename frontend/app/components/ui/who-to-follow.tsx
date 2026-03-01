export function WhoToFollow() {
  return (
    <div className="bg-dark rounded-2xl border border-[#2f3336] mt-4 overflow-hidden">
      <h2 className="text-xl font-bold px-4 py-3 border-b border-[#2f3336]">
        Who to follow
      </h2>

      {[1, 2, 3].map((user) => (
        <div
          key={user}
          className="flex items-center justify-between px-4 py-3 hover:bg-[#16181c]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-600" />
            <div>
              <p className="font-semibold">User {user}</p>
              <p className="text-sm text-[#71767b]">@user{user}</p>
            </div>
          </div>

          <button className="bg-white text-black px-4 py-1 rounded-full font-semibold text-sm">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}
