import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useState, type PropsWithChildren } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "~/store/slices/posts.slice";
import type { AppDispatch } from "~/store/store";

interface IProps {
  setIsOpenModal: (value: boolean) => void;
}

const MIN_LENGTH = 10;

export default function CreatePostModal({ setIsOpenModal }: IProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [content, setContent] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isValid = content.length >= MIN_LENGTH;

  const handleCreatePost = async () => {
    if (!isValid) {
      setError(`Post must contain at least ${MIN_LENGTH} characters`);
      return;
    }

    try {
      await dispatch(
        createPost({
          content,
          img: img ?? undefined,
        }),
      ).unwrap();

      setIsOpenModal(false);
    } catch (e) {
      setError("Failed to create post");
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#5b708366] flex justify-center items-start pt-20">
      <div className="w-[600px] bg-black rounded-2xl shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2f3336]">
          <button
            onClick={() => setIsOpenModal(false)}
            className="p-2 rounded-full hover:bg-[#1d1f23]"
          >
            <XMarkIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex gap-4 px-4 py-4">
          <div className="w-10 h-10 bg-white rounded-full flex-shrink-0" />

          <div className="w-full">
            <textarea
              placeholder="What’s happening?"
              className="
                w-full resize-none bg-transparent text-white text-xl
                placeholder-[#71767b] focus:outline-none
              "
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (error) setError(null);
              }}
              rows={4}
            />

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

            <div className="mt-1 text-right text-sm text-[#71767b]">
              {content.length}/{MIN_LENGTH}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-[#2f3336]">
          <div className="flex gap-3 text-blue-500">
            <Icon>
              <PhotoIcon className="w-5 h-5" />
            </Icon>
          </div>

          <button
            onClick={handleCreatePost}
            disabled={!isValid}
            className={`
              bg-[#1d9bf0] text-white px-5 py-1.5 rounded-full
              font-semibold
              ${
                !isValid
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#1a8cd8]"
              }
            `}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

function Icon({ children }: PropsWithChildren) {
  return (
    <button className="p-2 rounded-full hover:bg-[#1d1f23]">{children}</button>
  );
}
