import Form from "~/components/ui/form";
import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chatter — Register" },
    { name: "description", content: "Register your account to Chatter" },
  ];
}

export default function Register() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
      <h1 className="text-3xl font-bold tracking-tight">Створити акаунт</h1>
      <p className="text-gray-400 mt-1 mb-8">Ласкаво просимо до Chatter ✨</p>

      <Form type="register" />
    </div>
  );
}
