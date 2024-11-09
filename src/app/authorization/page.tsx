"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/components/schemas/auth";
import Button from "@/components/Button";

type AuthProps = {
  email: string;
  password: string;
};

export default function AuthorizationPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      router.push("/");
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthProps>({
    resolver: zodResolver(formSchema),
  });

  const handleLogin = async (formData: AuthProps) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5050/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Ошибка авторизации");
      }

      const responseData = await response.json();

      localStorage.setItem("jwtToken", responseData.token);

      router.push("/");
    } catch (e) {
      setServerError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="bg-cover bg-center bg-no-repeat bg-[url('../../public/Shape.png')]"
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col gap-[30px] p-[50px] pb-[80px] rounded-[30px] border-2 bg-white">
          <div className="flex flex-row gap-[44px] items-center">
            <Image src={"/logo.png"} alt="logo" width={160} height={130} />
            <div className="flex flex-col">
              <p className="text-[32px] font-bold">Войти в аккаунт</p>
              <p className="text-[18px] text-[#202224]">
                Введите свой логин и пароль
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[15px]">
            <p className="text-[18px]">Email :</p>
            <input
              {...register("email")}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="esteban_schiller@att.ru"
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col gap-[15px]">
            <p className="text-[18px]">Пароль :</p>
            <input
              {...register("password")}
              type="password"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder={"\u2022 \u2022 \u2022 \u2022 \u2022 \u2022"}
            />
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          </div>
          <div className="w-full">
            <Button disabled={loading} text="Войти" className="w-full"/>
            {serverError && (
              <p className="text-red-500 text-sm w-fit pt-2 mx-auto">
                Неверная почта или пароль
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
