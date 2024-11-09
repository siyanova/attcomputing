"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "../../../public/logo.png";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/components/schemas/auth";

type AuthProps = {
  email: string;
  password: string;
};

export default function AuthorizationPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error("Ошибка авторизации");
      }
  
      const responseData = await response.json();
  
      localStorage.setItem("jwtToken", responseData.token);
  
      router.push("/");
    } catch (e) {
      alert(`Ошибка: ${e}`);
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
            <Image src={logo} alt="logo" className="w-[160px] h-[130px]" />
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
          </div>
          <div className="flex flex-col gap-[15px]">
            <p className="text-[18px]">Пароль :</p>
            <div className="relative">
              <input
                {...register("password")}
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder={"\u2022 \u2022 \u2022 \u2022 \u2022 \u2022"}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg mx-[60px] border-2 bg-[#4880FF] text-white p-[10px] text-[20px mt-[30px]"
          >
            Войти
          </button>
        </div>
      </div>
    </form>
  );
}
