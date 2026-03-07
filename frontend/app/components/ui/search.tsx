import { useState } from "react";
import { useDebounce } from "~/hooks/useDebounce";

export function Search() {
  const [value, setValue] = useState("");
  const debounceText = useDebounce(value, 500);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
  );
}
