import { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "~/store/store";
import { updateUser } from "~/store/slices/user.slice";

export default function Settings() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.data);
  const [form, setForm] = useState<{
    fullName: string;
    description: string;
    dateOfBirth: string | undefined;
  }>({
    fullName: user?.fullName ?? "",
    description: user?.description ?? "",
    dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName ?? "",
        description: user.description ?? "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit:", form);
    if (form.dateOfBirth!.length === 0) form.dateOfBirth = undefined;
    dispatch(updateUser(form));
  };

  return (
    <div className="w-full max-w-[600px] border-x border-neutral-800 min-h-screen">
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
        <h2 className="text-xl font-bold">Edit profile</h2>
        <button
          onClick={handleSubmit}
          className="bg-white text-black px-4 py-1.5 rounded-full font-semibold hover:opacity-90 transition"
        >
          Save
        </button>
      </div>

      <div className="w-full h-48 bg-[#333639] relative group">
        <div className="absolute inset-0 bg-black/40 opacity-0 flex items-center justify-center text-sm">
          Change header photo
        </div>
      </div>

      <div className="relative px-4">
        <div className="absolute -top-16">
          <div className="relative group cursor-pointer">
            <UserCircleIcon className="w-32 h-32 text-gray-500 bg-black rounded-full border-4 border-black" />
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs">
              Change
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 mt-20 flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            maxLength={50}
            className="bg-black border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:border-gray-400 transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Bio</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={160}
            rows={3}
            className="bg-black border border-neutral-700 rounded-md px-3 py-2 resize-none focus:outline-none focus:border-gray-400 transition"
          />
          <span className="text-xs text-gray-500 mt-1 text-right">
            {form.description.length}/160
          </span>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Date of birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className="bg-black border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:border-gray-400 transition"
          />
        </div>

        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:opacity-90 transition mt-2"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
