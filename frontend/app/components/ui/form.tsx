import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { loginUser, registerUser } from "~/store/slices/user.slice";
import type { AppDispatch } from "~/store/store";
import type { IUser } from "~/types/user";

interface IProps {
  type: "register" | "login";
}

export default function Form({ type }: IProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({
    mode: "onBlur",
  });

  const onSubmit = async (data: IUser) => {
    let response;
    try {
      if (type === "register") {
        response = await dispatch(registerUser(data));
      } else {
        response = await dispatch(loginUser(data));
      }
      navigate("/");
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      console.log(`error submit data, ERROR: ${type}`, errorMessage);
    }
  };

  const inputClass =
    "w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {type === "register" && (
        <div className="space-y-5">
          <div>
            <input
              className={inputClass}
              placeholder="Ім’я та прізвище"
              {...register("fullName", {
                required: "Повне ім’я є обовʼязковим",
                minLength: {
                  value: 3,
                  message: "Мінімум 3 символи",
                },
                pattern: {
                  value: /^[a-zA-Z]+ [a-zA-Z]+$/,
                  message: "Введіть два слова, дозволені лише літери",
                },
              })}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <input
              className={inputClass}
              placeholder="Тег користувача"
              {...register("userTag", {
                required: "Тег користувача є обовʼязковим",
                minLength: {
                  value: 3,
                  message: "Мінімум 3 символи",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "Дозволені лише літери, цифри та _",
                },
              })}
            />
            {errors.userTag && (
              <p className="mt-1 text-sm text-red-400">
                {errors.userTag.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div>
        <input
          className={inputClass}
          placeholder="Електронна пошта"
          {...register("email", {
            required: "Електронна пошта є обовʼязковою",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некоректний формат електронної пошти",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          className={inputClass}
          placeholder="Пароль"
          {...register("password", {
            required: "Пароль є обовʼязковим",
            minLength: {
              value: 5,
              message: "Мінімум 5 символів",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "Пароль має містити цифри або літери",
            },
          })}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="
          w-full rounded-2xl py-3 font-semibold
          bg-linear-to-r from-blue-500 to-purple-500
          hover:opacity-90 transition
          disabled:opacity-50
        "
      >
        {type === "register" ? "Створити акаунт" : "Увійти"}
      </button>

      <p className="text-center text-sm text-gray-400">
        {type === "register" ? (
          <>
            <span>Вже маєш акаунт?</span>{" "}
            <Link to="/login" className="underline">
              Увійти
            </Link>
          </>
        ) : (
          <>
            <span>Ще не маєш акаунту?</span>{" "}
            <Link to="/register" className="underline">
              Зареєструватися
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
