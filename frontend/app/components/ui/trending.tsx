export function Trending() {
  return (
    <div className="bg-dark rounded-2xl border border-[#2f3336] mt-4 overflow-hidden">
      <h2 className="text-xl font-bold px-4 py-3 border-b border-[#2f3336]">
        Trending
      </h2>

      {["React", "Next.js", "Crypto", "UI Design"].map((item, i) => (
        <div
          key={i}
          className="px-4 py-3 hover:bg-[#16181c] cursor-pointer transition"
        >
          <p className="text-sm text-[#71767b]">Trending in Tech</p>
          <p className="font-semibold">{item}</p>
          <p className="text-sm text-[#71767b]">12.5K posts</p>
        </div>
      ))}
    </div>
  );
}
