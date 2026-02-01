import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md px-4">
        <Outlet />
      </div>
    </div>
  );
}
