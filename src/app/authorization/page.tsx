'use client'
import Image from "next/image";
import { useState } from "react";
import { redirect } from 'next/navigation'
import logo from "../../../public/logo.png";
export default function AuthorizationPage() {
  const correntEmail: string = "user";
  const correntPassword: string = "123";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === correntEmail && password === correntPassword) {
        redirect('/authorization');
    } else {
      alert("ошибка");
    }
  };
  return (
    <form
      onSubmit={handleLogin}
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
              value={email}
              onChange={handleEmailChange}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="esteban_schiller@att.ru"
            />
          </div>
          <div className="flex flex-col gap-[15px]">
            <p className="text-[18px]">Пароль :</p>
            <div className="relative">
              <input
                value={password}
                onChange={handlePasswordChange}
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder={"\u2022 \u2022 \u2022 \u2022 \u2022 \u2022"}
              />
            </div>
          </div>
          <button
            type="submit"
            className="rounded-lg mx-[60px] border-2 bg-[#4880FF] text-white p-[10px] text-[20px mt-[30px]"
          >
            Войти
          </button>
        </div>
      </div>
    </form>
  );
}
