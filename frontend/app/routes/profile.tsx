import { UserCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IUser } from "~/types/user";

export default function Profile() {
  const { userTag } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!userTag) return;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/profile/${userTag}`,
          { withCredentials: true },
        );

        if (!response.data) {
          setIsNotFound(true);
        } else {
          setUser(response.data);
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          setIsNotFound(true);
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userTag]);

  if (isLoading) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-400">
        Loading profile...
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-400">
        User not found
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-full max-w-[600px] border-x border-neutral-800 min-h-screen">
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-neutral-800 px-4 py-3">
        <h2 className="text-xl font-bold">{user.fullName}</h2>
        <p className="text-sm text-gray-500">{user.postsCount ?? 0} posts</p>
      </div>

      <div className="w-full h-48 bg-[#333639] relative"></div>

      <div className="relative px-4">
        <div className="absolute -top-16">
          <UserCircleIcon className="w-32 h-32 object-cover" />
        </div>

        <div className="flex justify-end mt-3">
          <button className="border border-gray-500 px-4 py-1.5 rounded-full font-semibold hover:bg-neutral-900 transition">
            Edit profile
          </button>
        </div>
      </div>

      <div className="px-4 mt-6">
        <h1 className="text-xl font-bold">{user.fullName}</h1>
        <p className="text-gray-500">@{user.userTag}</p>

        {user.description && (
          <p className="mt-3 text-sm whitespace-pre-line">{user.description}</p>
        )}

        <div className="flex gap-6 mt-3 text-sm">
          <span>
            <span className="font-bold text-white">
              {user.followingCount ?? 0}
            </span>{" "}
            <span className="text-gray-500">Following</span>
          </span>
          <span>
            <span className="font-bold text-white">
              {user.followersCount ?? 0}
            </span>{" "}
            <span className="text-gray-500">Followers</span>
          </span>
        </div>
      </div>

      <div className="mt-6 border-b border-neutral-800 flex">
        <button className="flex-1 py-3 font-semibold hover:bg-neutral-900 transition border-b-2 border-white">
          Posts
        </button>
      </div>

      <div>
        <div className="p-4 border-b border-neutral-800 text-gray-500">
          User posts will appear here
        </div>
      </div>
    </div>
  );
}
