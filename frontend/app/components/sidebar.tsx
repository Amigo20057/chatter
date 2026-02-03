import { Link, useLocation, useNavigate } from "react-router";
import { HomeIcon, UserIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "~/store/store";
import { logoutUser } from "~/store/slices/user.slice";

interface IProps {
  setIsOpenModal: (value: boolean) => void;
}

export default function Sidebar({ setIsOpenModal }: IProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const navigationLinks = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Profile", href: "/profile", icon: UserIcon },
    { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/auth/login");
  };

  return (
    <aside className="w-[275px] h-screen sticky top-0 border-r border-[#2f3336] px-4 py-3 flex flex-col">
      <div className="mb-6 px-3 text-xl font-bold">Chatter</div>

      <nav className="flex flex-col gap-1 overflow-y-auto">
        {navigationLinks.map((link) => {
          const isActive = location.pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              to={link.href}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-full
                transition-colors
                hover:bg-[#181d20]
                ${
                  isActive
                    ? "font-bold text-white bg-[#181d20]"
                    : "text-[#e7e9ea]"
                }
              `}
            >
              <Icon className="w-6 h-6" />
              <span className="text-lg">{link.name}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setIsOpenModal(true)}
          className="flex items-center gap-4 px-4 py-3 rounded-full
                transition-colors justify-center font-semibold mt-5
                hover:bg-[#c5c5c5] bg-white text-black text-[18px]"
        >
          Post
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="
        mt-auto
        flex items-center gap-4 px-4 py-3 rounded-full
        transition-colors justify-center font-semibold
        hover:bg-[#181d20]
        border-[#2f3336] border
        text-red-500 text-[18px]
        "
      >
        Logout
      </button>
    </aside>
  );
}
